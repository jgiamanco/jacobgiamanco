import React, { useState } from "react";
import { Widget } from "../Widget";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingDown, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { StockData, StockHistoryData, formatPrice } from "@/utils/stockApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StockChart } from "./StockChart";

interface StockDetailProps {
  stock: StockData;
  historicalData: StockHistoryData;
  onBack: () => void;
  isLoading: boolean;
}

export const StockDetail: React.FC<StockDetailProps> = ({
  stock,
  historicalData,
  onBack,
  isLoading,
}) => {
  const [timeFrame, setTimeFrame] = useState<"day" | "week" | "month">("day");

  const getHistoricalData = () => {
    return historicalData[timeFrame];
  };

  return (
    <Widget
      title={`${stock.symbol} Stock History`}
      headerContent={
        <Button size="sm" variant="ghost" onClick={onBack} className="ml-auto">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-medium">
              {formatPrice(stock.price)}
            </div>
            <div
              className={cn(
                "flex items-center text-sm",
                stock.change >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stock.change > 0 ? "+" : ""}
              {stock.change.toFixed(2)} ({stock.changePercent > 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>

        <Tabs
          defaultValue="day"
          value={timeFrame}
          onValueChange={(v) => setTimeFrame(v as "day" | "week" | "month")}
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="day" className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              24h
            </TabsTrigger>
            <TabsTrigger value="week">5 Days</TabsTrigger>
            <TabsTrigger value="month">1 Month</TabsTrigger>
          </TabsList>

          <TabsContent value={timeFrame} className="h-[200px] pt-4">
            <StockChart
              data={getHistoricalData()}
              lineColor={stock.change >= 0 ? "#22c55e" : "#ef4444"}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Widget>
  );
};
