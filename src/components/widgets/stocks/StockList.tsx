
import React from 'react';
import { Widget } from '../Widget';
import { StockData } from '@/utils/stockApi';
import { StockItem } from './StockItem';
import { StockSearch } from './StockSearch';

interface StockListProps {
  stocks: StockData[];
  isLoading: boolean;
  onAddStock: (symbol: string) => void;
  onStockClick: (symbol: string) => void;
}

export const StockList: React.FC<StockListProps> = ({ 
  stocks, 
  isLoading, 
  onAddStock, 
  onStockClick 
}) => {
  return (
    <Widget title="Market Overview" isLoading={isLoading}>
      <div className="space-y-3">
        <StockSearch onAddStock={onAddStock} />
        
        {stocks.map((stock) => (
          <StockItem 
            key={stock.symbol} 
            stock={stock} 
            onClick={() => onStockClick(stock.symbol)} 
          />
        ))}
      </div>
    </Widget>
  );
};
