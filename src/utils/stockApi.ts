import { useToast } from "@/hooks/use-toast";
import { devLog, devError, devWarn } from "./logger";

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
}

export interface HistoricalData {
  date: string;
  price: number;
}

export interface StockHistoryData {
  day: Array<{ date: string; price: number }>;
  week: Array<{ date: string; price: number }>;
  month: Array<{ date: string; price: number }>;
  symbol?: string;
  timestamp?: number;
}

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const CACHE_EXPIRY = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

interface CachedData<T> {
  data: T;
  timestamp: number;
}

const getCachedData = <T>(key: string): T | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp }: CachedData<T> = JSON.parse(cached);
      const now = Date.now();
      if (now - timestamp <= CACHE_EXPIRY) {
        devLog(`Using cached data for ${key}`);
        return data;
      }
      // Remove expired cache
      localStorage.removeItem(key);
    }
    return null;
  } catch (error) {
    devError("Error reading from cache:", error);
    return null;
  }
};

const setCachedData = <T>(key: string, data: T): void => {
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    devError("Error writing to cache:", error);
  }
};

interface FinnhubQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  t: number; // Timestamp
}

interface FinnhubCandle {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v: number[]; // Volume
}

export const fetchStockData = async (
  symbol: string
): Promise<StockData | null> => {
  try {
    // Check cache first
    const cacheKey = `stock_${symbol}`;
    const cachedData = getCachedData<StockData>(cacheKey);
    if (cachedData) {
      devLog(`Using cached data for ${symbol}`);
      return cachedData;
    }

    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    devLog(`Fetching stock data for ${symbol}`);

    const response = await fetch(url);
    const data: FinnhubQuote = await response.json();

    devLog(`Response for ${symbol}:`, data);

    if (data.c) {
      const stockData: StockData = {
        symbol,
        price: data.c,
        change: data.d,
        changePercent: data.dp,
        timestamp: data.t * 1000, // Convert to milliseconds
      };

      // Cache the new data
      setCachedData(cacheKey, stockData);
      return stockData;
    } else {
      devWarn(`No quote data found for ${symbol}`, data);
      return null;
    }
  } catch (error) {
    devError(`Error fetching stock data for ${symbol}:`, error);
    return null;
  }
};

export const fetchHistoricalData = async (
  symbol: string
): Promise<StockHistoryData> => {
  try {
    // Check cache first
    const cacheKey = `history_${symbol}`;
    const cachedData = getCachedData<StockHistoryData>(cacheKey);
    if (cachedData) {
      devLog(`Using cached historical data for ${symbol}`);
      return cachedData;
    }

    // Calculate timestamps in seconds (Finnhub uses Unix timestamps)
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    const oneWeekAgo = now - 7 * 24 * 60 * 60;
    const oneMonthAgo = now - 30 * 24 * 60 * 60;

    devLog(
      `Fetching historical data for ${symbol} from ${new Date(
        oneDayAgo * 1000
      ).toISOString()} to ${new Date(now * 1000).toISOString()}`
    );

    // Fetch intraday data for the day view
    const intradayResponse = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=5&from=${oneDayAgo}&to=${now}&token=${API_KEY}`
    );
    const intradayData: FinnhubCandle = await intradayResponse.json();

    // Fetch daily data for week and month views
    const dailyResponse = await fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${oneMonthAgo}&to=${now}&token=${API_KEY}`
    );
    const dailyData: FinnhubCandle = await dailyResponse.json();

    const dayData: HistoricalData[] = [];
    const weekData: HistoricalData[] = [];
    const monthData: HistoricalData[] = [];

    // Process intraday data
    if (intradayData.c && intradayData.t) {
      intradayData.c.forEach((price, index) => {
        dayData.push({
          date: new Date(intradayData.t[index] * 1000).toLocaleTimeString(
            "en-US",
            { hour: "numeric" }
          ),
          price,
        });
      });
    }

    // Process daily data
    if (dailyData.c && dailyData.t) {
      dailyData.c.forEach((price, index) => {
        const date = new Date(dailyData.t[index] * 1000);
        const dateStr = date.toLocaleDateString("en-US", { day: "numeric" });

        // Add to month data
        monthData.push({
          date: dateStr,
          price,
        });

        // Add to week data if within last 5 days
        if (index >= dailyData.c.length - 5) {
          weekData.push({
            date: date.toLocaleDateString("en-US", { weekday: "short" }),
            price,
          });
        }
      });
    }

    const historyData: StockHistoryData = {
      symbol,
      day: dayData.reverse().map(({ date, price }) => ({ date, price })),
      week: weekData.reverse().map(({ date, price }) => ({ date, price })),
      month: monthData.reverse().map(({ date, price }) => ({ date, price })),
      timestamp: Date.now(),
    };

    // Cache the new data
    setCachedData(cacheKey, historyData);
    return historyData;
  } catch (error) {
    devError(`Error fetching historical data for ${symbol}:`, error);
    // Return empty data structure if API fails
    return {
      symbol,
      day: [],
      week: [],
      month: [],
      timestamp: Date.now(),
    };
  }
};

export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};
