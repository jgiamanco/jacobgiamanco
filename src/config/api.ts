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

export const API_ENDPOINTS = {
  SPORTS: {
    MLB: "https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate",
    NFL: "https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDate",
    NHL: "https://api.sportsdata.io/v3/nhl/scores/json/GamesByDate",
    NBA: "https://api.sportsdata.io/v3/nba/scores/json/GamesByDate",
  },
  STOCKS: {
    BASE: "https://finnhub.io/api/v1",
  },
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
