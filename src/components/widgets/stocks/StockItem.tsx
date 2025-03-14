
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { StockData } from '@/utils/stockApi';

interface StockItemProps {
  stock: StockData;
  onClick: () => void;
}

export const StockItem: React.FC<StockItemProps> = ({ stock, onClick }) => {
  return (
    <div 
      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
      onClick={onClick}
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
  );
};
