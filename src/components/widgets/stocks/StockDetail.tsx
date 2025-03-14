
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingDown, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StockData, StockHistoryData, formatPrice } from '@/utils/stockApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StockChart } from './StockChart';

interface StockDetailProps {
  stock: StockData;
  historicalData: StockHistoryData;
  onBackClick: () => void;
}

export const StockDetail: React.FC<StockDetailProps> = ({ 
  stock, 
  historicalData, 
  onBackClick 
}) => {
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');

  const getHistoricalData = () => {
    return historicalData[timeFrame];
  };

  return (
    <div className="space-y-3 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-medium">{formatPrice(stock.price)}</div>
          <div 
            className={cn(
              "flex items-center text-sm",
              stock.change >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {stock.change >= 0 ? 
              <TrendingUp className="h-4 w-4 mr-1" /> : 
              <TrendingDown className="h-4 w-4 mr-1" />
            }
            {stock.change > 0 ? '+' : ''}
            {stock.change.toFixed(2)} ({stock.changePercent > 0 ? '+' : ''}
            {stock.changePercent.toFixed(2)}%)
          </div>
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onBackClick}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
      
      <Tabs defaultValue="day" value={timeFrame} onValueChange={(v) => setTimeFrame(v as 'day' | 'week' | 'month')} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="day" className="flex items-center gap-1 text-xs py-1 px-2">
            <Clock className="h-3 w-3" />
            24h
          </TabsTrigger>
          <TabsTrigger value="week" className="text-xs py-1 px-2">5 Days</TabsTrigger>
          <TabsTrigger value="month" className="text-xs py-1 px-2">1 Month</TabsTrigger>
        </TabsList>
        
        <TabsContent value={timeFrame} className="flex-1 min-h-[120px]">
          <StockChart 
            data={getHistoricalData()} 
            lineColor={stock.change >= 0 ? '#22c55e' : '#ef4444'} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
