
import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { Cloud, CloudRain, CloudSnow, Sun, Loader2 } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy';
  location: string;
  feelsLike: number;
  humidity: number;
}

// Mock data - would be replaced with actual API call
const mockWeatherData: WeatherData = {
  temperature: 72,
  condition: 'sunny',
  location: 'San Francisco, CA',
  feelsLike: 74,
  humidity: 45
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call in the future
        await new Promise(resolve => setTimeout(resolve, 1500));
        setWeather(mockWeatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-12 w-12 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-12 w-12 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="h-12 w-12 text-blue-200" />;
      default:
        return <Sun className="h-12 w-12 text-yellow-500" />;
    }
  };

  return (
    <Widget title="Weather" isLoading={isLoading}>
      {weather && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-light">{weather.temperature}°F</div>
              <div className="text-sm text-muted-foreground">{weather.location}</div>
            </div>
            <div className="flex items-center justify-center p-2">
              {getWeatherIcon(weather.condition)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground">Feels like</span>
              <span>{weather.feelsLike}°F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground">Humidity</span>
              <span>{weather.humidity}%</span>
            </div>
          </div>
        </div>
      )}
    </Widget>
  );
};
