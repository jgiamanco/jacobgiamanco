
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { TrendingDown, TrendingUp, Search, ArrowLeft, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

interface HistoricalData {
  date: string;
  price: number;
}

interface StockHistoryData {
  symbol: string;
  day: HistoricalData[];
  week: HistoricalData[];
  month: HistoricalData[];
}

// Mock data - would be replaced with actual API call
const mockStocks: StockData[] = [
  { symbol: 'AAPL', price: 178.72, change: 2.35, changePercent: 1.32 },
  { symbol: 'MSFT', price: 396.51, change: -0.68, changePercent: -0.17 },
  { symbol: 'TSLA', price: 177.29, change: 5.23, changePercent: 3.04 },
  { symbol: 'AMZN', price: 182.81, change: -1.45, changePercent: -0.78 },
];

// Mock historical data
const generateHistoricalData = (symbol: string, basePrice: number): StockHistoryData => {
  // Generate data for the last 24 hours (24 data points)
  const dayData = Array.from({ length: 24 }, (_, i) => {
    const randomChange = (Math.random() - 0.5) * 2;
    return {
      date: `${i}:00`,
      price: basePrice + randomChange
    };
  });

  // Generate data for the last 5 days (5 data points)
  const weekData = Array.from({ length: 5 }, (_, i) => {
    const randomChange = (Math.random() - 0.5) * 5;
    return {
      date: `Day ${i+1}`,
      price: basePrice + randomChange
    };
  });

  // Generate data for the last month (30 data points)
  const monthData = Array.from({ length: 30 }, (_, i) => {
    const randomChange = (Math.random() - 0.5) * 10;
    return {
      date: `Day ${i+1}`,
      price: basePrice + randomChange
    };
  });

  return {
    symbol,
    day: dayData,
    week: weekData,
    month: monthData
  };
};

// Generate mock historical data for each stock
const mockHistoricalData: Record<string, StockHistoryData> = {
  'AAPL': generateHistoricalData('AAPL', 178.72),
  'MSFT': generateHistoricalData('MSFT', 396.51),
  'TSLA': generateHistoricalData('TSLA', 177.29),
  'AMZN': generateHistoricalData('AMZN', 182.81),
};

export const StockWidget = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');

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

  const handleAddStock = () => {
    if (!newStockSymbol.trim()) return;
    
    // Simulate adding a new stock
    const randomPrice = Math.floor(Math.random() * 500) + 50;
    const randomChange = (Math.random() - 0.4) * 10;
    const randomChangePercent = (randomChange / randomPrice) * 100;
    
    const newStock: StockData = {
      symbol: newStockSymbol.toUpperCase(),
      price: randomPrice,
      change: randomChange,
      changePercent: randomChangePercent
    };
    
    // Generate mock historical data for the new stock
    mockHistoricalData[newStock.symbol] = generateHistoricalData(newStock.symbol, randomPrice);
    
    // Add to the top of the list and remove the last one if we have more than 4
    const updatedStocks = [newStock, ...stocks];
    if (updatedStocks.length > 4) {
      updatedStocks.pop();
    }
    
    setStocks(updatedStocks);
    setNewStockSymbol('');
  };

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  const getHistoricalData = () => {
    if (!selectedStock || !mockHistoricalData[selectedStock]) return [];
    
    return mockHistoricalData[selectedStock][timeFrame];
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Detail view for selected stock
  if (selectedStock) {
    const stock = stocks.find(s => s.symbol === selectedStock);
    if (!stock) return null;
    
    const chartData = getHistoricalData();
    
    return (
      <Widget 
        title={`${stock.symbol} Stock History`} 
        isLoading={isLoading}
        headerContent={
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleBackClick}
            className="ml-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-medium">{formatPrice(stock.price)}</div>
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
          </div>
          
          <Tabs defaultValue="day" value={timeFrame} onValueChange={(v) => setTimeFrame(v as 'day' | 'week' | 'month')}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="day" className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                24h
              </TabsTrigger>
              <TabsTrigger value="week">5 Days</TabsTrigger>
              <TabsTrigger value="month">1 Month</TabsTrigger>
            </TabsList>
            
            <TabsContent value={timeFrame} className="h-[200px] pt-4">
              <ChartContainer 
                config={{
                  price: {
                    label: 'Price',
                    theme: {
                      light: stock.change >= 0 ? '#22c55e' : '#ef4444',
                      dark: stock.change >= 0 ? '#22c55e' : '#ef4444',
                    },
                  }
                }}
              >
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }}
                    tickMargin={5}
                  />
                  <YAxis 
                    width={50}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value.toFixed(0)}`}
                    tick={{ fontSize: 10 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background p-2 border border-border rounded-md shadow-md">
                            <p className="text-xs">{`${payload[0].payload.date}`}</p>
                            <p className="text-xs font-medium">{`Price: $${payload[0].value.toFixed(2)}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke={stock.change >= 0 ? '#22c55e' : '#ef4444'} 
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </div>
      </Widget>
    );
  }

  // List view of stocks
  return (
    <Widget title="Market Overview" isLoading={isLoading}>
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input 
            placeholder="Add stock symbol (e.g. GOOG)" 
            value={newStockSymbol}
            onChange={(e) => setNewStockSymbol(e.target.value)}
            className="text-xs"
          />
          <Button onClick={handleAddStock} size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {stocks.map((stock) => (
          <div 
            key={stock.symbol}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
            onClick={() => handleStockClick(stock.symbol)}
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
