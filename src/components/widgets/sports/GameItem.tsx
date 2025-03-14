
import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { Game, SportType, getSportProgress } from '@/utils/sportsData';

interface GameItemProps {
  game: Game;
  currentSport: SportType;
}

export const GameItem: React.FC<GameItemProps> = ({ game, currentSport }) => {
  return (
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
            {getSportProgress(game, currentSport)}
          </div>
        </div>
      )}
    </div>
  );
};
