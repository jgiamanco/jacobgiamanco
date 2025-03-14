
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Game, SportType } from '@/utils/sportsData';
import { GameItem } from './GameItem';

interface SportTabProps {
  sport: SportType;
  games: Game[];
  currentSport: SportType;
}

export const SportTab: React.FC<SportTabProps> = ({ sport, games, currentSport }) => {
  return (
    <TabsContent key={sport} value={sport} className="mt-0 pt-2">
      <div className="space-y-2">
        {currentSport === sport && games.slice(0, 3).map((game) => (
          <GameItem 
            key={game.id} 
            game={game} 
            currentSport={currentSport} 
          />
        ))}
      </div>
    </TabsContent>
  );
};
