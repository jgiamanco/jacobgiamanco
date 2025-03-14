
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Sun, 
  Loader2, 
  Thermometer, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  Wind, 
  SearchIcon,
  Droplets
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('San Diego, CA');
  const [inputLocation, setInputLocation] = useState('');
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // We'll use OpenWeatherMap API, which has a free tier
  const API_KEY = 'da0f9c8d90bde7e619c3ec47766a42f4';
  
  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (locationQuery: string) => {
    setIsLoading(true);
    try {
      // Using OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locationQuery)}&units=imperial&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].main.toLowerCase(),
        location: `${data.name}, ${data.sys.country}`,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
      toast({
        title: "Weather data error",
        description: "Could not fetch weather data for this location",
        variant: "destructive",
      });
      
      // Fallback to default data on error
      setWeather({
        temperature: 72,
        condition: 'sunny',
        location: locationQuery,
        feelsLike: 74,
        humidity: 45,
        description: 'Sunny',
        windSpeed: 5
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLocation.trim()) {
      setLocation(inputLocation.trim());
      setInputLocation('');
    }
  };

  const getWeatherIcon = (condition: string) => {
    // Map weather conditions to appropriate icons
    if (condition.includes('sunny') || condition.includes('clear')) {
      return <Sun className="h-12 w-12 text-yellow-500" />;
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
      return <Cloud className="h-12 w-12 text-gray-400" />;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return <CloudRain className="h-12 w-12 text-blue-400" />;
    } else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('ice')) {
      return <CloudSnow className="h-12 w-12 text-blue-200" />;
    } else if (condition.includes('fog') || condition.includes('mist')) {
      return <CloudFog className="h-12 w-12 text-gray-300" />;
    } else if (condition.includes('thunder') || condition.includes('lightning')) {
      return <CloudLightning className="h-12 w-12 text-purple-400" />;
    } else if (condition.includes('wind')) {
      return <Wind className="h-12 w-12 text-gray-500" />;
    } else {
      // Default fallback
      return <Thermometer className="h-12 w-12 text-red-400" />;
    }
  };

  return (
    <Widget 
      title="Weather" 
      isLoading={isLoading}
    >
      <form onSubmit={handleLocationSubmit} className="flex gap-2 mb-4">
        <Input
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Change location..."
          className="text-sm"
        />
        <Button type="submit" size="sm" variant="outline">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>
      
      {weather && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-light">{Math.round(weather.temperature)}°F</div>
              <div className="text-sm text-muted-foreground">{weather.location}</div>
              <div className="text-xs italic text-muted-foreground mt-1">{weather.description}</div>
            </div>
            <div className="flex items-center justify-center p-2">
              {getWeatherIcon(weather.condition)}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mt-4 bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex flex-col items-center">
              <Thermometer className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Feels like</span>
              <span className="font-medium">{Math.round(weather.feelsLike)}°F</span>
            </div>
            <div className="flex flex-col items-center">
              <Droplets className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Humidity</span>
              <span className="font-medium">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Wind className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Wind</span>
              <span className="font-medium">{weather.windSpeed} mph</span>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
};
