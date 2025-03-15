export type SportType = "mlb" | "nfl" | "nhl" | "nba";

export interface Game {
  GameID: number;
  Status: string;
  DateTime: string;
  AwayTeam: string;
  HomeTeam: string;
  AwayTeamScore: number | string;
  HomeTeamScore: number | string;
  Quarter?: string;
  Period?: string;
  Inning?: string;
  TimeRemainingMinutes?: number;
  TimeRemainingSeconds?: number;
  Channel?: string;
  StadiumDetails?: string;
  Season?: number;
  Week?: number;
}

export interface RawGameData {
  GameID?: number;
  GameId?: number;
  gameId?: number;
  Status?: string;
  status?: string;
  DateTime?: string;
  GameDate?: string;
  Date?: string;
  dateTime?: string;
  AwayTeam?: string;
  VenueTeam?: string;
  VisitorTeam?: string;
  HomeTeam?: string;
  LocalTeam?: string;
  AwayTeamScore?: number;
  AwayTeamRuns?: number;
  AwayScore?: number;
  VenueTeamScore?: number;
  HomeTeamScore?: number;
  HomeTeamRuns?: number;
  HomeScore?: number;
  LocalTeamScore?: number;
  Quarter?: string;
  Period?: string;
  Inning?: string;
  TimeRemainingMinutes?: number;
  MinutesRemaining?: number;
  TimeRemainingSeconds?: number;
  SecondsRemaining?: number;
  Channel?: string;
  Broadcast?: string;
  StadiumDetails?: string;
  Venue?: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
  timestamp: number;
}

export interface StockHistoryData {
  day: Array<{ date: string; price: number }>;
  week: Array<{ date: string; price: number }>;
  month: Array<{ date: string; price: number }>;
  symbol?: string;
  timestamp?: number;
}
