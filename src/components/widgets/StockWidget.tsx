import React, { useEffect, useState } from 'react';
import { StockList } from './stocks/StockList';
import { StockDetail } from './stocks/StockDetail';
import { 
  StockData, 
  StockHistoryData, 
  fetchStockData, 
  fetchHistoricalData 
} from '@/utils/stockApi';
import { useToast } from '@/hooks/use-toast';
import { Widget } from './Widget';

interface StockWidgetProps {
  id?: string;
}

export const StockWidget: React.FC<StockWidgetProps> = ({ id }) => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [historicalData, setHistoricalData] = useState<Record<string, StockHistoryData>>({});
  const { toast } = useToast();

  // Default stock symbols to fetch
  const defaultSymbols = ['AAPL', 'MSFT', 'TSLA', 'AMZN'];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const stockPromises = defaultSymbols.map(symbol => fetchStockData(symbol));
      const stocksData = await Promise.all(stockPromises);
      
      // Filter out any failed requests
      const validStocks = stocksData.filter(stock => stock !== null) as StockData[];
      setStocks(validStocks);
      
      // Fetch historical data for each stock
      const histData: Record<string, StockHistoryData> = {};
      for (const stock of validStocks) {
        histData[stock.symbol] = await fetchHistoricalData(stock.symbol, stock.price);
      }
      setHistoricalData(histData);
      
    } catch (error) {
      console.error('Error fetching stocks:', error);
      toast({
        title: "Stock data error",
        description: "Could not fetch stock data",
        variant: "destructive",
      });
      
      // Use mock data as fallback
      useMockStockData();
    } finally {
      setIsLoading(false);
    }
  };

  const useMockStockData = () => {
    const mockStocks: StockData[] = [
      { symbol: 'AAPL', price: 178.72, change: 2.35, changePercent: 1.32 },
      { symbol: 'MSFT', price: 396.51, change: -0.68, changePercent: -0.17 },
      { symbol: 'TSLA', price: 177.29, change: 5.23, changePercent: 3.04 },
      { symbol: 'AMZN', price: 182.81, change: -1.45, changePercent: -0.78 },
    ];
    
    setStocks(mockStocks);
    
    const mockHistData: Record<string, StockHistoryData> = {};
    for (const stock of mockStocks) {
      const histData = {
        symbol: stock.symbol,
        day: Array.from({ length: 24 }, (_, i) => ({
          date: `${i}:00`,
          price: stock.price + (Math.random() - 0.5) * 2
        })),
        week: Array.from({ length: 5 }, (_, i) => ({
          date: `Day ${i+1}`,
          price: stock.price + (Math.random() - 0.5) * 5
        })),
        month: Array.from({ length: 30 }, (_, i) => ({
          date: `Day ${i+1}`,
          price: stock.price + (Math.random() - 0.5) * 10
        }))
      };
      mockHistData[stock.symbol] = histData;
    }
    setHistoricalData(mockHistData);
  };

  const handleAddStock = async (newSymbol: string) => {
    setIsLoading(true);
    try {
      const newStock = await fetchStockData(newSymbol);
      
      if (newStock) {
        // Add historical data for the new stock
        const histData = await fetchHistoricalData(newStock.symbol, newStock.price);
        setHistoricalData(prev => ({
          ...prev,
          [newStock.symbol]: histData
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
          description: `Could not find stock symbol: ${newSymbol}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast({
        title: "Error adding stock",
        description: "Please try again later",
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
    const stock = stocks.find(s => s.symbol === selectedStock);
    if (!stock) return null;
    
    return (
      <Widget title={`${stock.symbol} Details`} id={id}>
        <StockDetail 
          stock={stock} 
          historicalData={historicalData[stock.symbol]} 
          onBackClick={handleBackClick} 
        />
      </Widget>
    );
  }

  return (
    <Widget title="Stocks" id={id}>
      <StockList 
        stocks={stocks} 
        isLoading={isLoading} 
        onAddStock={handleAddStock} 
        onStockClick={handleStockClick} 
      />
    </Widget>
  );
};
