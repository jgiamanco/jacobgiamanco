import React from "react";
import { Widget } from "../Widget";
import { StockData } from "@/utils/stockApi";
import { StockItem } from "./StockItem";
import { StockSearch } from "./StockSearch";

interface StockListProps {
  stocks: StockData[];
  isLoading: boolean;
  onAddStock: (symbol: string) => void;
  onStockClick: (symbol: string) => void;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const StockList: React.FC<StockListProps> = ({
  stocks,
  isLoading,
  onAddStock,
  onStockClick,
  headerContent,
  children,
}) => {
  return (
    <Widget
      title="Market Overview"
      isLoading={isLoading}
      headerContent={headerContent}
    >
      <div className="space-y-3">
        <StockSearch onAddStock={onAddStock} />

        {stocks.length === 0 && !isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            No stocks to display. Add a stock symbol to get started.
          </div>
        ) : (
          stocks.map((stock) => (
            <StockItem
              key={stock.symbol}
              stock={stock}
              onClick={() => onStockClick(stock.symbol)}
            />
          ))
        )}
      </div>
      {children}
    </Widget>
  );
};
