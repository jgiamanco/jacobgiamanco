import React, { useEffect, useState, useCallback } from "react";
import { Widget } from "./Widget";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  Sun,
  Loader2,
  Thermometer,
  CloudFog,
  CloudLightning,
  Wind,
  SearchIcon,
  Droplets,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation, defaultLocation } from "@/contexts/LocationContext";
import { logger } from "@/utils/logger";
import { API_ENDPOINTS } from "@/config/api";

interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
  coordinates?: {
    lat: number;
    lon: number;
  };
  timezone?: number;
}

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inputLocation, setInputLocation] = useState("");
  const { toast } = useToast();
  const { location, setLocation } = useLocation();

  const formatLocationQuery = (query: string): string => {
    const parts = query
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    // If we have 2 or 3 parts and the second part is a US state code
    if (parts.length >= 2 && parts[1].length === 2) {
      const [city, state] = parts;
      // Add US as country code if not provided
      const country = parts[2] || "US";
      return `${city},${state},${country}`;
    }

    // For international cities or single city names
    const city = parts[0];
    const country = parts[parts.length - 1];

    // If country code is provided (assumed to be the last part)
    if (parts.length > 1 && country.length === 2) {
      return `${city},${country}`;
    }

    // If only city is provided
    return city;
  };

  const fetchWeather = useCallback(
    async (locationQuery: string) => {
      setIsLoading(true);
      try {
        const formattedQuery = formatLocationQuery(locationQuery);
        const response = await fetch(API_ENDPOINTS.WEATHER(formattedQuery));

        if (!response.ok) {
          throw new Error(
            `Location "${locationQuery}" not found. Please try a different location.`
          );
        }

        const data: WeatherData = await response.json();
        const cityName = data.location.split(",")[0];

        // Update location with both name and coordinates from the weather response
        setLocation({
          name: cityName,
          lat: data.coordinates?.lat ?? defaultLocation.lat,
          lon: data.coordinates?.lon ?? defaultLocation.lon,
          timezone: data.timezone ?? defaultLocation.timezone,
        });

        setWeather(data);
      } catch (error) {
        logger.error("Error fetching weather:", error);
        toast({
          title: "Weather data error",
          description:
            error instanceof Error
              ? error.message
              : "Could not fetch weather data for this location",
          variant: "destructive",
        });

        // Fallback to default data on error
        setWeather({
          temperature: 72,
          condition: "sunny",
          location: locationQuery,
          feelsLike: 74,
          humidity: 45,
          description: "Sunny",
          windSpeed: 5,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast, setLocation]
  );

  useEffect(() => {
    if (location.name) {
      fetchWeather(location.name);
    }
  }, [location.name]);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLocation.trim()) {
      fetchWeather(inputLocation.trim());
      setInputLocation("");
    }
  };

  const getWeatherIcon = (condition: string) => {
    // Map weather conditions to appropriate icons
    if (condition.includes("sunny") || condition.includes("clear")) {
      return <Sun className="h-12 w-12 text-yellow-500" />;
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return <Cloud className="h-12 w-12 text-gray-400" />;
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return <CloudRain className="h-12 w-12 text-blue-400" />;
    } else if (
      condition.includes("snow") ||
      condition.includes("sleet") ||
      condition.includes("ice")
    ) {
      return <CloudSnow className="h-12 w-12 text-blue-200" />;
    } else if (condition.includes("fog") || condition.includes("mist")) {
      return <CloudFog className="h-12 w-12 text-gray-300" />;
    } else if (
      condition.includes("thunder") ||
      condition.includes("lightning")
    ) {
      return <CloudLightning className="h-12 w-12 text-purple-400" />;
    } else if (condition.includes("wind")) {
      return <Wind className="h-12 w-12 text-gray-500" />;
    } else {
      // Default fallback
      return <Thermometer className="h-12 w-12 text-red-400" />;
    }
  };

  return (
    <Widget title="Weather" isLoading={isLoading}>
      <form onSubmit={handleLocationSubmit} className="flex gap-2 mb-4">
        <Input
          value={inputLocation}
          onChange={(e) => setInputLocation(e.target.value)}
          placeholder="Change location..."
          className="text-sm"
          disabled={isLoading}
        />
        <Button type="submit" size="sm" variant="outline" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SearchIcon className="h-4 w-4" />
          )}
        </Button>
      </form>

      {weather && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-light">
                {Math.round(weather.temperature)}°F
              </div>
              <div className="text-sm text-muted-foreground">
                {weather.location}
              </div>
              <div className="text-xs italic text-muted-foreground mt-1">
                {weather.description}
              </div>
            </div>
            <div className="flex items-center justify-center p-2">
              {getWeatherIcon(weather.condition)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 bg-secondary/30 rounded-lg p-3 border border-border/50">
            <div className="flex flex-col items-center">
              <Thermometer className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Feels like</span>
              <span className="font-medium">
                {Math.round(weather.feelsLike)}°F
              </span>
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
