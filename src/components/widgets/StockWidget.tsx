
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock data - would be replaced with actual API call
const mockStocks: StockData[] = [
  { symbol: 'AAPL', price: 178.72, change: 2.35, changePercent: 1.32 },
  { symbol: 'MSFT', price: 396.51, change: -0.68, changePercent: -0.17 },
  { symbol: 'TSLA', price: 177.29, change: 5.23, changePercent: 3.04 },
  { symbol: 'AMZN', price: 182.81, change: -1.45, changePercent: -0.78 },
];

export const StockWidget = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call in the future
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStocks(mockStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  return (
    <Widget title="Market Overview" isLoading={isLoading}>
      <div className="space-y-2">
        {stocks.map((stock) => (
          <div 
            key={stock.symbol}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="font-medium">{stock.symbol}</div>
            <div className="text-right">
              <div>${stock.price.toFixed(2)}</div>
              <div 
                className={cn(
                  "flex items-center text-xs",
                  stock.change >= 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {stock.change >= 0 ? 
                  <TrendingUp className="h-3 w-3 mr-1" /> : 
                  <TrendingDown className="h-3 w-3 mr-1" />
                }
                {stock.change > 0 ? '+' : ''}
                {stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}
                {stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};
