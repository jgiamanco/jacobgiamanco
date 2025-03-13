
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
  SearchIcon 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

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

  // OpenWeather API key - this is a free tier key and can be exposed in the client
  const API_KEY = 'f78fea3f6b31487ba67225551231206';
  
  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const fetchWeather = async (locationQuery: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(locationQuery)}&aqi=no`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      
      const data = await response.json();
      
      setWeather({
        temperature: data.current.temp_f,
        condition: data.current.condition.text.toLowerCase(),
        location: `${data.location.name}, ${data.location.region}`,
        feelsLike: data.current.feelslike_f,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        windSpeed: data.current.wind_mph
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
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
      className={theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}
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
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Feels like</span>
              <span>{Math.round(weather.feelsLike)}°F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Humidity</span>
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Wind</span>
              <span>{weather.windSpeed} mph</span>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
};
