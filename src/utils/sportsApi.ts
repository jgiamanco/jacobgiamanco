
import { Game, SportType, getMockDataForSport } from './sportsData';
import { useToast } from '@/hooks/use-toast';

// This would be replaced with actual API integration
export const fetchSportsData = async (sport: SportType): Promise<Game[]> => {
  // Simulating API call with timeout
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // In a real implementation, you would make an API call here
    // Example: const response = await fetch(`https://api.sportsdata.io/v3/${sport.toLowerCase()}/scores/json/Games/2023?key=YOUR_API_KEY`);
    // const data = await response.json();
    
    // For now, using mock data
    const mockResponse = getMockDataForSport(sport);
    
    // Sort games to put favorites first
    const sortedGames = [...mockResponse].sort((a, b) => {
      if (a.homeTeam.isFavorite && !b.homeTeam.isFavorite) return -1;
      if (a.awayTeam.isFavorite && !b.awayTeam.isFavorite) return -1;
      if (!a.homeTeam.isFavorite && !a.awayTeam.isFavorite && 
          (b.homeTeam.isFavorite || b.awayTeam.isFavorite)) return 1;
      return 0;
    });
    
    return sortedGames;
  } catch (error) {
    console.error(`Error fetching ${sport} games:`, error);
    throw new Error(`Could not fetch ${sport} data`);
  }
};
