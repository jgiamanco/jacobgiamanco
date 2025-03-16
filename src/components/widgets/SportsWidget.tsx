import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Game, SportType } from "@/types";
import { API_ENDPOINTS, CACHE_DURATION, FAVORITE_TEAMS } from "@/config/api";
import { cache } from "@/utils/cache";
import { ErrorBoundary } from "../ErrorBoundary";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logger } from "@/utils/logger";

interface SportsWidgetProps {
  sport?: SportType;
  defaultSport?: SportType;
}

const getCurrentDateFormatted = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const SportsWidget: React.FC<SportsWidgetProps> = ({
  sport = "mlb",
  defaultSport = "mlb",
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSport, setSelectedSport] = useState<SportType>(
    sport || defaultSport
  );
  const { toast } = useToast();

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentDate = getCurrentDateFormatted();
      const cacheKey = `sports_${selectedSport}_${currentDate}`;
      const cachedData = cache.get<Game[]>(cacheKey, CACHE_DURATION.SPORTS);

      if (cachedData) {
        setGames(cachedData);
        setIsLoading(false);
        return;
      }

      const response = await fetch(API_ENDPOINTS.SPORTS(selectedSport));

      if (!response.ok) {
        throw new Error(`Failed to fetch ${selectedSport.toUpperCase()} games`);
      }

      const data = await response.json();

      // Check if the data is in the expected format
      const gamesData = Array.isArray(data) ? data : data.games || [];

      // Ensure the data matches our Game interface
      const processedGames = gamesData.map((game: Game) => ({
        GameID: game.GameID || Date.now(),
        DateTime: game.DateTime || new Date().toISOString(),
        Status: game.Status || "Scheduled",
        AwayTeam: game.AwayTeam || "Away",
        HomeTeam: game.HomeTeam || "Home",
        AwayTeamScore: game.AwayTeamScore ?? "-",
        HomeTeamScore: game.HomeTeamScore ?? "-",
        Channel: game.Channel,
        StadiumDetails: game.StadiumDetails,
      }));

      cache.set(cacheKey, processedGames, CACHE_DURATION.SPORTS);
      setGames(processedGames);
    } catch (error) {
      logger.error("Error fetching games:", error);
      toast({
        title: "Error",
        description: "Failed to fetch sports data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedSport, toast]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedSport]);

  const handlePrevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : games.length - 1));
  }, [games.length]);

  const handleNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < games.length - 1 ? prev + 1 : 0));
  }, [games.length]);

  const formatGameTime = (dateTime: string, status: string | undefined) => {
    if (!status) return "Unknown";

    const statusLower = status.toLowerCase();
    if (statusLower === "inprogress" || statusLower === "in progress") {
      return "LIVE";
    }
    if (
      statusLower === "final" ||
      statusLower === "f/so" ||
      statusLower === "f/ot"
    ) {
      return status.toUpperCase();
    }
    const date = new Date(dateTime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => {
      const aHasFavorite =
        a.HomeTeam === FAVORITE_TEAMS[selectedSport] ||
        a.AwayTeam === FAVORITE_TEAMS[selectedSport];
      const bHasFavorite =
        b.HomeTeam === FAVORITE_TEAMS[selectedSport] ||
        b.AwayTeam === FAVORITE_TEAMS[selectedSport];

      if (aHasFavorite && !bHasFavorite) return -1;
      if (!aHasFavorite && bHasFavorite) return 1;
      return 0;
    });
  }, [games, selectedSport]);

  const handleSportChange = (newSport: SportType) => {
    setSelectedSport(newSport);
    setCurrentIndex(0);
  };

  return (
    <ErrorBoundary>
      <Widget title="Sports" isLoading={isLoading} className="relative">
        <Tabs
          value={selectedSport}
          onValueChange={(value) => handleSportChange(value as SportType)}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="mlb" className="flex-1">
              MLB
            </TabsTrigger>
            <TabsTrigger value="nba" className="flex-1">
              NBA
            </TabsTrigger>
            <TabsTrigger value="nfl" className="flex-1">
              NFL
            </TabsTrigger>
            <TabsTrigger value="nhl" className="flex-1">
              NHL
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative h-[calc(100%-2rem)]">
          <div className="flex items-center space-x-2 mb-2">
            <button
              onClick={handlePrevSlide}
              className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
              disabled={sortedGames.length <= 2}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex-1 text-center text-xs text-muted-foreground">
              {sortedGames.length > 0
                ? `${currentIndex + 1}-${Math.min(
                    currentIndex + 2,
                    sortedGames.length
                  )} of ${sortedGames.length}`
                : "No games available"}
            </div>
            <button
              onClick={handleNextSlide}
              className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
              disabled={sortedGames.length <= 2}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 h-full">
            {sortedGames.slice(currentIndex, currentIndex + 2).map((game) => (
              <div
                key={game.GameID}
                className="p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-primary">
                    {formatGameTime(
                      game.DateTime || new Date().toISOString(),
                      game.Status
                    )}
                  </span>
                  {game.Channel && (
                    <span className="text-xs text-muted-foreground">
                      {game.Channel}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm flex items-center gap-1">
                      {game.AwayTeam}
                      {game.AwayTeam === FAVORITE_TEAMS[selectedSport] && (
                        <span className="text-primary text-xs">★</span>
                      )}
                    </span>
                    <span className="text-base font-bold">
                      {game.AwayTeamScore ?? "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm flex items-center gap-1">
                      {game.HomeTeam}
                      {game.HomeTeam === FAVORITE_TEAMS[selectedSport] && (
                        <span className="text-primary text-xs">★</span>
                      )}
                    </span>
                    <span className="text-base font-bold">
                      {game.HomeTeamScore ?? "-"}
                    </span>
                  </div>
                </div>

                {game.Status &&
                  (game.Status.toLowerCase() === "inprogress" ||
                    game.Status.toLowerCase() === "in progress") && (
                    <div className="mt-1 text-xs text-primary">
                      {game.Status}
                    </div>
                  )}

                {game.StadiumDetails && (
                  <div className="mt-1 text-xs text-muted-foreground truncate">
                    {game.StadiumDetails}
                  </div>
                )}
              </div>
            ))}
          </div>

          {sortedGames.length > 0 && (
            <div className="mt-2 flex justify-center space-x-1">
              {Array.from({ length: Math.ceil(sortedGames.length / 2) }).map(
                (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      Math.floor(currentIndex / 2) === i
                        ? "bg-primary"
                        : "bg-secondary"
                    )}
                  />
                )
              )}
            </div>
          )}
          <div className="mt-2 text-[10px] text-muted-foreground text-center">
            Scores shown are sample data for demonstration purposes
          </div>
        </div>
      </Widget>
    </ErrorBoundary>
  );
};
