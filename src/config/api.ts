import { SportType } from "@/types";

export const API_KEYS = {
  MLB: import.meta.env.VITE_SPORTSDATA_MLB_API_KEY,
  NFL: import.meta.env.VITE_SPORTSDATA_NFL_API_KEY,
  NHL: import.meta.env.VITE_SPORTSDATA_NHL_API_KEY,
  NBA: import.meta.env.VITE_SPORTSDATA_NBA_API_KEY,
  FINNHUB: import.meta.env.VITE_FINNHUB_API_KEY,
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY,
  EMAILJS: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

// API Base URL - Environment aware
export const API_BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://portfolio-nest-proxy.vercel.app";

// API Endpoints
export const API_ENDPOINTS = {
  // Weather endpoint
  WEATHER: (location: string) =>
    `${API_BASE_URL}/api/weather?location=${location}`,

  // Stock endpoints
  STOCK_QUOTE: (symbol: string) =>
    `${API_BASE_URL}/api/stock/quote?symbol=${symbol}`,
  STOCK_HISTORY: (
    symbol: string,
    resolution: string,
    from: number,
    to: number
  ) =>
    `${API_BASE_URL}/api/stock/historical?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`,

  // Sports endpoints
  SPORTS: (sport: string) => `${API_BASE_URL}/api/sports/${sport}`,

  // Chat endpoints
  CHAT: `${API_BASE_URL}/api/chatbot/message`,
};

export const CACHE_DURATION = {
  STOCKS: 12 * 60 * 60 * 1000, // 12 hours
  SPORTS: 5 * 60 * 1000, // 5 minutes
};

export const FAVORITE_TEAMS: Record<SportType, string> = {
  mlb: "SD",
  nfl: "LAC",
  nhl: "SJS",
  nba: "LAL",
};
