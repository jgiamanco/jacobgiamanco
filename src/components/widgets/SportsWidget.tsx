
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';

interface Game {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  isLive: boolean;
  quarter?: string;
  timeLeft?: string;
}

// Mock data - would be replaced with actual API call
const mockGames: Game[] = [
  { 
    id: 1, 
    homeTeam: 'LAL', 
    awayTeam: 'BOS', 
    homeScore: 105, 
    awayScore: 102, 
    isLive: true,
    quarter: 'Q4',
    timeLeft: '2:45'
  },
  { 
    id: 2, 
    homeTeam: 'GSW', 
    awayTeam: 'MIA', 
    homeScore: 94, 
    awayScore: 88, 
    isLive: false 
  },
  { 
    id: 3, 
    homeTeam: 'PHX', 
    awayTeam: 'DAL', 
    homeScore: 112, 
    awayScore: 109, 
    isLive: false 
  },
];

export const SportsWidget = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call in the future
        await new Promise(resolve => setTimeout(resolve, 1800));
        setGames(mockGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <Widget title="NBA Scores" isLoading={isLoading}>
      <div className="space-y-3">
        {games.map((game) => (
          <div 
            key={game.id}
            className={cn(
              "rounded-lg p-3 border border-border/50 transition-colors",
              game.isLive ? "bg-primary/5 border-primary/20" : "bg-widget/50"
            )}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start">
                <div className="font-medium">{game.homeTeam}</div>
                <div className="font-medium">{game.awayTeam}</div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="font-medium">{game.homeScore}</div>
                <div className="font-medium">{game.awayScore}</div>
              </div>
            </div>
            
            {game.isLive && (
              <div className="mt-2 flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-red-500 mr-1 animate-pulse"></span>
                  <span className="text-red-500 font-medium">LIVE</span>
                </div>
                <div className="text-muted-foreground">
                  {game.quarter} · {game.timeLeft} left
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Widget>
  );
};
