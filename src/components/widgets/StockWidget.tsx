import React, { useState, useEffect, useCallback } from "react";
import { StockList } from "./stocks/StockList";
import { StockData } from "@/types";
import { API_ENDPOINTS, CACHE_DURATION } from "@/config/api";
import { cache } from "@/utils/cache";
import { ErrorBoundary } from "../ErrorBoundary";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logger } from "@/utils/logger";

export const StockWidget: React.FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchStockData = useCallback(async (symbol: string) => {
    const upperSymbol = symbol.toUpperCase().trim();
    try {
      // Validate US stock symbol format (typically 1-5 characters, letters only)
      if (!upperSymbol || !/^[A-Z]{1,5}$/.test(upperSymbol)) {
        throw new Error(
          "Invalid US stock symbol. Please use 1-5 letters only."
        );
      }

      const cacheKey = `stock_${upperSymbol}`;
      const cachedData = cache.get<StockData>(cacheKey, CACHE_DURATION.STOCKS);

      if (cachedData) {
        return cachedData;
      }

      const response = await fetch(API_ENDPOINTS.STOCK_QUOTE(upperSymbol));

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data for ${upperSymbol}`);
      }

      const stockData = await response.json();
      cache.set(cacheKey, stockData, CACHE_DURATION.STOCKS);
      return stockData;
    } catch (error) {
      logger.error(`Error fetching stock data for ${upperSymbol}:`, error);
      throw error;
    }
  }, []);

  const fetchStocks = useCallback(async () => {
    setIsLoading(true);
    try {
      // Popular US tech stocks
      const symbols = ["AAPL", "MSFT", "PYPL"];
      const stockData = await Promise.all(
        symbols.map((symbol) => fetchStockData(symbol))
      );
      setStocks(stockData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch stock data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchStockData, toast]);

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, CACHE_DURATION.STOCKS);
    return () => clearInterval(interval);
  }, [fetchStocks]);

  const handleAddStock = useCallback(
    async (newSymbol: string) => {
      try {
        const stockData = await fetchStockData(newSymbol);
        setStocks((prev) => {
          const newStocks = [stockData, ...prev.slice(0, 2)]; // Keep only 3 items
          return newStocks;
        });
        toast({
          title: "Success",
          description: `Added ${newSymbol} to your watchlist.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to add ${newSymbol}. Please check the symbol and try again.`,
          variant: "destructive",
        });
      }
    },
    [fetchStockData, toast]
  );

  return (
    <ErrorBoundary>
      <StockList
        stocks={stocks}
        isLoading={isLoading}
        onAddStock={handleAddStock}
        headerContent={
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchStocks}
            disabled={isLoading}
            className="h-8 w-8"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        }
      >
        <div className="mt-2 text-[10px] text-muted-foreground text-center">
          Stock prices are updated every 12 hours
        </div>
      </StockList>
    </ErrorBoundary>
  );
};
