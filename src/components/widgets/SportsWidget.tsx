
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { Star, Basketball, Football, Baseball, HockeyPuck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Team {
  name: string;
  abbreviation: string;
  isFavorite: boolean;
}

interface Game {
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

type SportType = 'NBA' | 'NFL' | 'MLB' | 'NHL';

// Mock data for different sports
const mockGames: Record<SportType, Game[]> = {
  NBA: [
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
  ],
  NFL: [
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
  ],
  MLB: [
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
  ],
  NHL: [
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
  ]
};

const sportIcons = {
  NBA: <Basketball className="h-4 w-4" />,
  NFL: <Football className="h-4 w-4" />,
  MLB: <Baseball className="h-4 w-4" />,
  NHL: <HockeyPuck className="h-4 w-4" />
};

export const SportsWidget = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSport, setCurrentSport] = useState<SportType>('NBA');

  useEffect(() => {
    // Simulate API call
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call in the future
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sort games to put favorites first
        const sortedGames = [...mockGames[currentSport]].sort((a, b) => {
          if (a.homeTeam.isFavorite && !b.homeTeam.isFavorite) return -1;
          if (a.awayTeam.isFavorite && !b.awayTeam.isFavorite) return -1;
          if (!a.homeTeam.isFavorite && !a.awayTeam.isFavorite && 
              (b.homeTeam.isFavorite || b.awayTeam.isFavorite)) return 1;
          return 0;
        });
        
        setGames(sortedGames);
      } catch (error) {
        console.error(`Error fetching ${currentSport} games:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, [currentSport]);

  const getSportProgress = (game: Game) => {
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

  return (
    <Widget title="Live Scores" isLoading={isLoading}>
      <Tabs defaultValue="NBA" onValueChange={(value) => setCurrentSport(value as SportType)} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          {Object.keys(mockGames).map((sport) => (
            <TabsTrigger key={sport} value={sport} className="flex items-center gap-2">
              {sportIcons[sport as SportType]}
              <span className="hidden sm:inline">{sport}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(mockGames).map((sport) => (
          <TabsContent key={sport} value={sport} className="mt-0 pt-4">
            <div className="space-y-3">
              {currentSport === sport && games.map((game) => (
                <div 
                  key={game.id}
                  className={cn(
                    "rounded-lg p-3 border border-border/50 transition-colors",
                    game.isLive ? "bg-primary/5 border-primary/20" : "bg-widget/50",
                    (game.homeTeam.isFavorite || game.awayTeam.isFavorite) && "border-amber-300/50 bg-amber-50/10"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col items-start">
                      <div className="font-medium flex items-center gap-1">
                        {game.homeTeam.isFavorite && (
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        )}
                        <span>{game.homeTeam.abbreviation}</span>
                      </div>
                      <div className="font-medium flex items-center gap-1">
                        {game.awayTeam.isFavorite && (
                          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                        )}
                        <span>{game.awayTeam.abbreviation}</span>
                      </div>
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
                        {getSportProgress(game)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Widget>
  );
};
