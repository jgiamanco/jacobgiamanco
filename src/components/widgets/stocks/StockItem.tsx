import React from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { StockData } from "@/types";

interface StockItemProps {
  stock: StockData;
}

export const StockItem: React.FC<StockItemProps> = ({ stock }) => {
  if (!stock.symbol) {
    return null; // Don't render if there's no symbol
  }

  const isPositive = stock.change >= 0;

  return (
    <div className="w-full flex items-center justify-between p-3 rounded-lg">
      <div className="flex flex-col">
        <div className="text-lg font-medium">{stock.symbol}</div>
        <div className="text-sm text-muted-foreground">
          ${stock.price.toFixed(2)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-green-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <div
          className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}
        >
          {stock.changePercent.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};
