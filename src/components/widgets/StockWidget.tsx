
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
import { useToast } from '@/hooks/use-toast';

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

export const StockWidget = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<'day' | 'week' | 'month'>('day');
  const [historicalData, setHistoricalData] = useState<Record<string, StockHistoryData>>({});
  const { toast } = useToast();

  // API key for Alpha Vantage (free tier with limitations)
  const API_KEY = 'PXUF3RVIC7CBVHNT';
  
  // Default stock symbols to fetch
  const defaultSymbols = ['AAPL', 'MSFT', 'TSLA', 'AMZN'];

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    setIsLoading(true);
    try {
      const stockPromises = defaultSymbols.map(symbol => fetchStockData(symbol));
      const stocksData = await Promise.all(stockPromises);
      
      // Filter out any failed requests
      const validStocks = stocksData.filter(stock => stock !== null) as StockData[];
      setStocks(validStocks);
      
      // Fetch historical data for each stock
      const historyData: Record<string, StockHistoryData> = {};
      for (const stock of validStocks) {
        historyData[stock.symbol] = await fetchHistoricalData(stock.symbol, stock.price);
      }
      setHistoricalData(historyData);
      
    } catch (error) {
      console.error('Error fetching stocks:', error);
      toast({
        title: "Stock data error",
        description: "Could not fetch stock data",
        variant: "destructive",
      });
      
      // Use mock data as fallback
      useMockStockData();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStockData = async (symbol: string): Promise<StockData | null> => {
    try {
      // In a production app, you'd use the actual Alpha Vantage API
      // For demo purposes, we'll simulate the API response
      // This is because the free tier has very limited API calls
      
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Using mock data for demonstration
      const mockPrice = symbol === 'AAPL' ? 178.72 : 
                        symbol === 'MSFT' ? 396.51 : 
                        symbol === 'TSLA' ? 177.29 : 
                        symbol === 'AMZN' ? 182.81 : 
                        Math.floor(Math.random() * 500) + 50;
                        
      const randomChange = (Math.random() - 0.4) * 10;
      const randomChangePercent = (randomChange / mockPrice) * 100;
      
      return {
        symbol,
        price: mockPrice,
        change: randomChange,
        changePercent: randomChangePercent
      };
      
      // Real API call would look like this:
      // const response = await fetch(
      //   `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      // );
      // const data = await response.json();
      // if (data['Global Quote']) {
      //   const quote = data['Global Quote'];
      //   return {
      //     symbol,
      //     price: parseFloat(quote['05. price']),
      //     change: parseFloat(quote['09. change']),
      //     changePercent: parseFloat(quote['10. change percent'].replace('%', ''))
      //   };
      // }
      // return null;
      
    } catch (error) {
      console.error(`Error fetching stock data for ${symbol}:`, error);
      return null;
    }
  };

  const fetchHistoricalData = async (symbol: string, basePrice: number): Promise<StockHistoryData> => {
    try {
      // In a production app, you'd use the actual Alpha Vantage API
      // For demo purposes, we'll simulate the API response with generated data
      
      // Real API call would look like this:
      // const response = await fetch(
      //   `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${API_KEY}`
      // );
      // const data = await response.json();
      // Parse the data and return it in the correct format
      
      // Simulating API call for now
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate mock historical data
      return generateHistoricalData(symbol, basePrice);
    } catch (error) {
      console.error(`Error fetching historical data for ${symbol}:`, error);
      return generateHistoricalData(symbol, basePrice);
    }
  };

  const generateHistoricalData = (symbol: string, basePrice: number): StockHistoryData => {
    const dayData = Array.from({ length: 24 }, (_, i) => {
      const randomChange = (Math.random() - 0.5) * 2;
      return {
        date: `${i}:00`,
        price: basePrice + randomChange
      };
    });

    const weekData = Array.from({ length: 5 }, (_, i) => {
      const randomChange = (Math.random() - 0.5) * 5;
      return {
        date: `Day ${i+1}`,
        price: basePrice + randomChange
      };
    });

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

  const useMockStockData = () => {
    const mockStocks: StockData[] = [
      { symbol: 'AAPL', price: 178.72, change: 2.35, changePercent: 1.32 },
      { symbol: 'MSFT', price: 396.51, change: -0.68, changePercent: -0.17 },
      { symbol: 'TSLA', price: 177.29, change: 5.23, changePercent: 3.04 },
      { symbol: 'AMZN', price: 182.81, change: -1.45, changePercent: -0.78 },
    ];
    
    setStocks(mockStocks);
    
    const mockHistData: Record<string, StockHistoryData> = {};
    for (const stock of mockStocks) {
      mockHistData[stock.symbol] = generateHistoricalData(stock.symbol, stock.price);
    }
    setHistoricalData(mockHistData);
  };

  const handleAddStock = async () => {
    if (!newStockSymbol.trim()) return;
    
    setIsLoading(true);
    try {
      const newStock = await fetchStockData(newStockSymbol.toUpperCase());
      
      if (newStock) {
        // Add historical data for the new stock
        const histData = await fetchHistoricalData(newStock.symbol, newStock.price);
        setHistoricalData(prev => ({
          ...prev,
          [newStock.symbol]: histData
        }));
        
        // Add to the top of the list and remove the last one if we have more than 4
        const updatedStocks = [newStock, ...stocks];
        if (updatedStocks.length > 4) {
          updatedStocks.pop();
        }
        
        setStocks(updatedStocks);
        setNewStockSymbol('');
        
        toast({
          title: "Stock added",
          description: `${newStock.symbol} has been added to your watchlist`,
        });
      } else {
        toast({
          title: "Stock not found",
          description: `Could not find stock symbol: ${newStockSymbol.toUpperCase()}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error adding stock:', error);
      toast({
        title: "Error adding stock",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
  };

  const handleBackClick = () => {
    setSelectedStock(null);
  };

  const getHistoricalData = () => {
    if (!selectedStock || !historicalData[selectedStock]) return [];
    return historicalData[selectedStock][timeFrame];
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

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
                        const value = payload[0].value;
                        return (
                          <div className="bg-background p-2 border border-border rounded-md shadow-md">
                            <p className="text-xs">{`${payload[0].payload.date}`}</p>
                            <p className="text-xs font-medium">{`Price: $${typeof value === 'number' ? value.toFixed(2) : value}`}</p>
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
