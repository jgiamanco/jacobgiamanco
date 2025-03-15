import React from "react";
import { Widget } from "../Widget";
import { StockData } from "@/types";
import { StockItem } from "./StockItem";
import { StockSearch } from "./StockSearch";

interface StockListProps {
  stocks: StockData[];
  isLoading: boolean;
  onAddStock: (symbol: string) => void;
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export const StockList: React.FC<StockListProps> = ({
  stocks,
  isLoading,
  onAddStock,
  headerContent,
  children,
}) => {
  return (
    <Widget title="Stocks" isLoading={isLoading} headerContent={headerContent}>
      <div className="flex flex-col gap-4">
        <StockSearch onAddStock={onAddStock} />
        <div className="space-y-2">
          {stocks
            .filter((stock) => stock.symbol)
            .map((stock) => (
              <StockItem
                key={`${stock.symbol}-${stock.timestamp}`}
                stock={stock}
              />
            ))}
        </div>
        {children}
      </div>
    </Widget>
  );
};
