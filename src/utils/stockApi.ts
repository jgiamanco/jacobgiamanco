
import { useToast } from "@/hooks/use-toast";

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface HistoricalData {
  date: string;
  price: number;
}

export interface StockHistoryData {
  symbol: string;
  day: HistoricalData[];
  week: HistoricalData[];
  month: HistoricalData[];
}

// API key for Alpha Vantage (free tier with limitations)
const API_KEY = 'PXUF3RVIC7CBVHNT';

export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
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

export const fetchHistoricalData = async (symbol: string, basePrice: number): Promise<StockHistoryData> => {
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

export const generateHistoricalData = (symbol: string, basePrice: number): StockHistoryData => {
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

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};
