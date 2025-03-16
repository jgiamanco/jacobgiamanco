export type SportType = "mlb" | "nfl" | "nhl" | "nba";

export interface Game {
  GameID: number;
  DateTime: string;
  Status: string;
  AwayTeam: string;
  HomeTeam: string;
  AwayTeamScore: number | string;
  HomeTeamScore: number | string;
  Channel?: string;
  StadiumDetails?: string;
}

export interface RawGameData {
  gameID?: number;
  gameId?: number;
  status?: string;
  gameDate?: string;
  date?: string;
  dateTime?: string;
  awayTeam?: string;
  venueTeam?: string;
  visitorTeam?: string;
  homeTeam?: string;
  localTeam?: string;
  awayTeamScore?: number;
  awayTeamRuns?: number;
  awayScore?: number;
  venueTeamScore?: number;
  homeTeamScore?: number;
  homeTeamRuns?: number;
  homeScore?: number;
  localTeamScore?: number;
  quarter?: string;
  period?: string;
  inning?: string;
  timeRemainingMinutes?: number;
  minutesRemaining?: number;
  timeRemainingSeconds?: number;
  secondsRemaining?: number;
  channel?: string;
  broadcast?: string;
  stadiumDetails?: string;
  venue?: string;
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
