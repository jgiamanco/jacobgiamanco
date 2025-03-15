import React, { useEffect, useState } from "react";
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
import { useLocation } from "@/contexts/LocationContext";

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
  const [inputLocation, setInputLocation] = useState("");
  const { toast } = useToast();
  const { location, setLocation } = useLocation();

  // Using environment variable for API key
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      toast({
        title: "Configuration Error",
        description:
          "OpenWeather API key is not configured. Please ensure your .env file exists",
        variant: "destructive",
      });
      return;
    }
    fetchWeather(location.name);
  }, [location.name, API_KEY, toast]);

  const fetchWeather = async (locationQuery: string) => {
    setIsLoading(true);
    try {
      // First try the exact query
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          locationQuery
        )}&units=imperial&appid=${API_KEY}`
      );

      // If that fails, try different formats
      if (!response.ok) {
        const parts = locationQuery.split(",").map((part) => part.trim());

        // Try different combinations of the location parts
        const queries = [
          locationQuery, // Full query (e.g., "San Diego, CA, US")
          parts.slice(0, 2).join(","), // City, State/Country (e.g., "San Diego, CA")
          parts[0], // Just city (e.g., "San Diego")
        ];

        for (const query of queries) {
          response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
              query
            )}&units=imperial&appid=${API_KEY}`
          );

          if (response.ok) break;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Location "${locationQuery}" not found. Please try a different location.`
          );
        }
      }

      const data = await response.json();
      console.log("Weather data received for:", data.name); // Debug log

      // Update location context with coordinates and timezone
      setLocation({
        lat: data.coord.lat,
        lon: data.coord.lon,
        name: data.name,
        timezone: data.timezone, // timezone offset in seconds
      });

      setWeather({
        temperature: data.main.temp,
        condition: data.weather[0].main.toLowerCase(),
        location: `${data.name}, ${data.sys.country}`,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
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
  };

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
