
import { CircleDashed, BadgeCheck, CircleDot, Disc } from 'lucide-react';
import React from 'react';

export interface Team {
  name: string;
  abbreviation: string;
  isFavorite: boolean;
}

export interface Game {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  isLive: boolean;
  quarter?: string;
  timeLeft?: string;
  inning?: string;
  period?: string;
  down?: string;
}

export type SportType = 'NBA' | 'NFL' | 'MLB' | 'NHL';

export const sportIcons: Record<SportType, React.ReactNode> = {
  NBA: <CircleDashed className="h-4 w-4" />,
  NFL: <BadgeCheck className="h-4 w-4" />,
  MLB: <CircleDot className="h-4 w-4" />,
  NHL: <Disc className="h-4 w-4" />
};

// Mock data generator for each sport type
export const getMockDataForSport = (sport: SportType): Game[] => {
  switch (sport) {
    case 'NBA':
      return [
        { 
          id: 1, 
          homeTeam: { name: 'Los Angeles Lakers', abbreviation: 'LAL', isFavorite: true },
          awayTeam: { name: 'Boston Celtics', abbreviation: 'BOS', isFavorite: false },
          homeScore: 105, 
          awayScore: 102, 
          isLive: true,
          quarter: 'Q4',
          timeLeft: '2:45'
        },
        { 
          id: 2, 
          homeTeam: { name: 'Golden State Warriors', abbreviation: 'GSW', isFavorite: false },
          awayTeam: { name: 'Miami Heat', abbreviation: 'MIA', isFavorite: false },
          homeScore: 94, 
          awayScore: 88, 
          isLive: false 
        },
        { 
          id: 3, 
          homeTeam: { name: 'Phoenix Suns', abbreviation: 'PHX', isFavorite: false },
          awayTeam: { name: 'Dallas Mavericks', abbreviation: 'DAL', isFavorite: false },
          homeScore: 112, 
          awayScore: 109, 
          isLive: false 
        },
      ];
    case 'NFL':
      return [
        {
          id: 1,
          homeTeam: { name: 'Los Angeles Chargers', abbreviation: 'LAC', isFavorite: true },
          awayTeam: { name: 'Kansas City Chiefs', abbreviation: 'KC', isFavorite: false },
          homeScore: 24,
          awayScore: 27,
          isLive: true,
          quarter: 'Q3',
          timeLeft: '4:15',
          down: '2nd & 8'
        },
        {
          id: 2,
          homeTeam: { name: 'San Francisco 49ers', abbreviation: 'SF', isFavorite: false },
          awayTeam: { name: 'Seattle Seahawks', abbreviation: 'SEA', isFavorite: false },
          homeScore: 21,
          awayScore: 14,
          isLive: false
        }
      ];
    case 'MLB':
      return [
        {
          id: 1,
          homeTeam: { name: 'San Diego Padres', abbreviation: 'SD', isFavorite: true },
          awayTeam: { name: 'Los Angeles Dodgers', abbreviation: 'LA', isFavorite: false },
          homeScore: 3,
          awayScore: 2,
          isLive: true,
          inning: 'TOP 7'
        },
        {
          id: 2,
          homeTeam: { name: 'New York Yankees', abbreviation: 'NYY', isFavorite: false },
          awayTeam: { name: 'Boston Red Sox', abbreviation: 'BOS', isFavorite: false },
          homeScore: 5,
          awayScore: 4,
          isLive: false
        }
      ];
    case 'NHL':
      return [
        {
          id: 1,
          homeTeam: { name: 'San Jose Sharks', abbreviation: 'SJS', isFavorite: true },
          awayTeam: { name: 'Vegas Golden Knights', abbreviation: 'VGK', isFavorite: false },
          homeScore: 2,
          awayScore: 3,
          isLive: true,
          period: 'P2',
          timeLeft: '8:22'
        },
        {
          id: 2,
          homeTeam: { name: 'Colorado Avalanche', abbreviation: 'COL', isFavorite: false },
          awayTeam: { name: 'St. Louis Blues', abbreviation: 'STL', isFavorite: false },
          homeScore: 4,
          awayScore: 1,
          isLive: false
        }
      ];
    default:
      return [];
  }
};

export const getSportProgress = (game: Game, currentSport: SportType): string | null => {
  if (!game.isLive) return null;
  
  switch (currentSport) {
    case 'NBA':
      return `${game.quarter} · ${game.timeLeft} left`;
    case 'NFL':
      return `${game.quarter} · ${game.timeLeft} · ${game.down}`;
    case 'MLB':
      return game.inning;
    case 'NHL':
      return `${game.period} · ${game.timeLeft} left`;
    default:
      return null;
  }
};
