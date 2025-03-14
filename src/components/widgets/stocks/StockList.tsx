
import React from 'react';
import { StockData } from '@/utils/stockApi';
import { StockItem } from './StockItem';
import { StockSearch } from './StockSearch';

interface StockListProps {
  stocks: StockData[];
  onAddStock: (symbol: string) => void;
  onStockClick: (symbol: string) => void;
}

export const StockList: React.FC<StockListProps> = ({ 
  stocks, 
  onAddStock, 
  onStockClick 
}) => {
  return (
    <div className="space-y-3 h-full flex flex-col">
      <StockSearch onAddStock={onAddStock} />
      
      <div className="flex-1">
        {stocks.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No stocks to display. Add a stock symbol to get started.
          </div>
        ) : (
          <div className="space-y-1">
            {stocks.map((stock) => (
              <StockItem 
                key={stock.symbol} 
                stock={stock} 
                onClick={() => onStockClick(stock.symbol)} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
