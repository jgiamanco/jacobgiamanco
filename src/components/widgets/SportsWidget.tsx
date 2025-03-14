
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Game, SportType, sportIcons } from '@/utils/sportsData';
import { fetchSportsData } from '@/utils/sportsApi';
import { SportTab } from './sports/SportTab';

export const SportsWidget = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSport, setCurrentSport] = useState<SportType>('NBA');
  const { toast } = useToast();

  useEffect(() => {
    const loadSportsData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSportsData(currentSport);
        setGames(data);
      } catch (error) {
        toast({
          title: "Sports data error",
          description: `Could not fetch ${currentSport} data`,
          variant: "destructive",
        });
        setGames([]); // Clear games on error
      } finally {
        setIsLoading(false);
      }
    };

    loadSportsData();
  }, [currentSport, toast]);

  return (
    <Widget title="Live Scores" isLoading={isLoading}>
      <Tabs defaultValue="NBA" onValueChange={(value) => setCurrentSport(value as SportType)} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          {Object.keys(sportIcons).map((sport) => (
            <TabsTrigger key={sport} value={sport} className="flex items-center gap-2">
              {sportIcons[sport as SportType]}
              <span className="hidden sm:inline">{sport}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(sportIcons).map((sport) => (
          <SportTab 
            key={sport}
            sport={sport as SportType} 
            games={games} 
            currentSport={currentSport} 
          />
        ))}
      </Tabs>
    </Widget>
  );
};
