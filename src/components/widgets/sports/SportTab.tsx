
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
    <TabsContent key={sport} value={sport} className="mt-0 pt-4">
      <div className="space-y-3">
        {currentSport === sport && games.map((game) => (
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
