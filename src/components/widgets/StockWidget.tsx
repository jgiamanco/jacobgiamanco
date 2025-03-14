import React, { useEffect, useState } from "react";
import { StockList } from "./stocks/StockList";
import { StockDetail } from "./stocks/StockDetail";
import {
  StockData,
  StockHistoryData,
  fetchStockData,
  fetchHistoricalData,
} from "@/utils/stockApi";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { devError } from "@/utils/logger";

export const StockWidget = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<
    Record<string, StockHistoryData>
  >({});
  const { toast } = useToast();

  // Default stock symbols to fetch
  const defaultSymbols = ["AAPL", "MSFT", "TSLA", "AMZN"];

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 12 * 60 * 60 * 1000); // 12 hours
    return () => clearInterval(interval);
  }, []);

  const fetchStocks = async (forceRefresh: boolean = false) => {
    setIsLoading(true);
    try {
      // Fetch stocks one at a time to avoid hitting API limits
      const validStocks: StockData[] = [];
      for (const symbol of defaultSymbols) {
        try {
          const stockData = await fetchStockData(symbol);
          if (stockData) {
            validStocks.push(stockData);

            // Fetch historical data immediately for this stock
            const histData = await fetchHistoricalData(stockData.symbol);
            setHistoricalData((prev) => ({
              ...prev,
              [stockData.symbol]: histData,
            }));
          }

          // Add a small delay between requests to respect API limits
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          devError(`Error fetching data for ${symbol}:`, error);
        }
      }

      if (validStocks.length === 0) {
        throw new Error("Could not fetch any stock data");
      }

      setStocks(validStocks);
    } catch (error) {
      devError("Error fetching stocks:", error);
      toast({
        title: "Stock data error",
        description: "Could not fetch stock data. Using mock data as fallback.",
        variant: "destructive",
      });

      // Use mock data as fallback
      setMockStockData();
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchStocks(true);
  };

  const setMockStockData = () => {
    const mockStocks: StockData[] = [
      {
        symbol: "AAPL",
        price: 178.72,
        change: 2.35,
        changePercent: 1.32,
        timestamp: Date.now(),
      },
      {
        symbol: "MSFT",
        price: 396.51,
        change: -0.68,
        changePercent: -0.17,
        timestamp: Date.now(),
      },
      {
        symbol: "TSLA",
        price: 177.29,
        change: 5.23,
        changePercent: 3.04,
        timestamp: Date.now(),
      },
      {
        symbol: "AMZN",
        price: 182.81,
        change: -1.45,
        changePercent: -0.78,
        timestamp: Date.now(),
      },
    ];

    setStocks(mockStocks);

    const mockHistData: Record<string, StockHistoryData> = {};
    for (const stock of mockStocks) {
      const histData: StockHistoryData = {
        symbol: stock.symbol,
        day: Array.from({ length: 24 }, (_, i) => ({
          date: `${i}:00`,
          price: stock.price + (Math.random() - 0.5) * 2,
        })),
        week: Array.from({ length: 5 }, (_, i) => ({
          date: `Day ${i + 1}`,
          price: stock.price + (Math.random() - 0.5) * 5,
        })),
        month: Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i + 1}`,
          price: stock.price + (Math.random() - 0.5) * 10,
        })),
        timestamp: Date.now(),
      };
      mockHistData[stock.symbol] = histData;
    }
    setHistoricalData(mockHistData);
  };

  const handleAddStock = async (newSymbol: string) => {
    setIsLoading(true);
    try {
      // Add a delay if we've recently made a request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newStock = await fetchStockData(newSymbol);

      if (newStock) {
        // Add a delay before fetching historical data
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Add historical data for the new stock
        const histData = await fetchHistoricalData(newStock.symbol);
        setHistoricalData((prev) => ({
          ...prev,
          [newStock.symbol]: histData,
        }));

        // Add to the top of the list and remove the last one if we have more than 4
        const updatedStocks = [newStock, ...stocks];
        if (updatedStocks.length > 4) {
          updatedStocks.pop();
        }

        setStocks(updatedStocks);

        toast({
          title: "Stock added",
          description: `${newStock.symbol} has been added to your watchlist`,
        });
      } else {
        toast({
          title: "Stock not found",
          description: `Could not find stock symbol: ${newSymbol}. Please check the symbol and try again.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      devError("Error adding stock:", error);
      toast({
        title: "Error adding stock",
        description:
          "API rate limit may have been reached. Please try again in a minute.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  if (selectedStock) {
    const stock = stocks.find((s) => s.symbol === selectedStock);
    if (!stock) return null;

    return (
      <StockDetail
        stock={stock}
        historicalData={historicalData[stock.symbol]}
        onBackClick={handleBackClick}
      />
    );
  }

  return (
    <StockList
      stocks={stocks}
      isLoading={isLoading}
      onAddStock={handleAddStock}
      onStockClick={handleStockClick}
      headerContent={
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="ml-auto"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      }
    >
      <div className="mt-2 text-[10px] text-muted-foreground text-center">
        Stock prices are updated every 12 hours
      </div>
    </StockList>
  );
};
