import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Game, RawGameData, SportType } from "@/types";
import {
  API_KEYS,
  API_ENDPOINTS,
  CACHE_DURATION,
  FAVORITE_TEAMS,
} from "@/config/api";
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

const isDev = import.meta.env.DEV;

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

  const getScore = useCallback(
    (
      score: number | undefined | null,
      isInProgress: boolean,
      isFinal: boolean
    ): number | string => {
      if (typeof score === "number") return score;
      if (!isInProgress && !isFinal) return "-";
      return 0;
    },
    []
  );

  const processGameData = useCallback(
    (game: RawGameData): Game => {
      const status = (game.Status || game.status || "Unknown").toLowerCase();
      const isInProgress = status === "inprogress" || status === "in progress";
      const isFinal =
        status === "final" || status === "f/so" || status === "f/ot";

      const awayScore = getScore(
        game.AwayTeamRuns ||
          game.AwayTeamScore ||
          game.AwayScore ||
          game.VenueTeamScore,
        isInProgress,
        isFinal
      );
      const homeScore = getScore(
        game.HomeTeamRuns ||
          game.HomeTeamScore ||
          game.HomeScore ||
          game.LocalTeamScore,
        isInProgress,
        isFinal
      );

      return {
        GameID: game.GameID || game.GameId || game.gameId || 0,
        Status: game.Status || game.status || "Unknown",
        DateTime:
          game.DateTime ||
          game.GameDate ||
          game.Date ||
          game.dateTime ||
          new Date().toISOString(),
        AwayTeam: game.AwayTeam || game.VenueTeam || game.VisitorTeam || "Away",
        HomeTeam: game.HomeTeam || game.LocalTeam || "Home",
        AwayTeamScore: awayScore,
        HomeTeamScore: homeScore,
        Quarter: game.Quarter || game.Period || game.Inning,
        TimeRemainingMinutes:
          game.TimeRemainingMinutes || game.MinutesRemaining,
        TimeRemainingSeconds:
          game.TimeRemainingSeconds || game.SecondsRemaining,
        Channel: game.Channel || game.Broadcast,
        StadiumDetails: game.StadiumDetails || game.Venue,
      };
    },
    [getScore]
  );

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    try {
      const currentDate = getCurrentDateFormatted();
      const cacheKey = `sports_${selectedSport}_${currentDate}`;
      const cachedData = cache.get<RawGameData[]>(
        cacheKey,
        CACHE_DURATION.SPORTS
      );

      if (cachedData) {
        const processedGames = cachedData.map(processGameData);
        setGames(processedGames);
        setIsLoading(false);
        return;
      }

      const API_KEY =
        API_KEYS[selectedSport.toUpperCase() as keyof typeof API_KEYS];
      if (!API_KEY) {
        throw new Error(`No API key found for ${selectedSport.toUpperCase()}`);
      }

      const endpoint =
        API_ENDPOINTS.SPORTS[
          selectedSport.toUpperCase() as keyof typeof API_ENDPOINTS.SPORTS
        ];
      const response = await fetch(`${endpoint}/${currentDate}?key=${API_KEY}`);

      if (!response.ok) {
        const errorText = await response.text();
        logger.error(`${selectedSport.toUpperCase()} API Error:`, {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(
          `Failed to fetch ${selectedSport.toUpperCase()} games (Status: ${
            response.status
          })`
        );
      }

      let gamesData = await response.json();
      gamesData = Array.isArray(gamesData) ? gamesData : [];

      cache.set(cacheKey, gamesData, CACHE_DURATION.SPORTS);
      const processedGames = gamesData.map(processGameData);
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
  }, [selectedSport, processGameData, toast]);

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

  const currentGame = useMemo(() => games[currentIndex], [games, currentIndex]);

  const formatPeriod = (game: Game, sport: SportType) => {
    const status = game.Status.toLowerCase();
    if (status !== "inprogress" && status !== "in progress") {
      return null;
    }

    const getFormattedTime = (minutes?: number, seconds?: number) =>
      `${minutes || 0}:${(seconds || 0).toString().padStart(2, "0")}`;

    const getInningDisplay = (inning: string) => {
      const num = parseInt(inning);
      const suffix =
        num === 1 ? "st" : num === 2 ? "nd" : num === 3 ? "rd" : "th";
      return `${num}${suffix} Inning`;
    };

    switch (sport) {
      case "nba":
      case "nfl":
        return game.Quarter
          ? `Q${game.Quarter} ${getFormattedTime(
              game.TimeRemainingMinutes,
              game.TimeRemainingSeconds
            )}`
          : null;

      case "mlb": {
        const inning = game.Quarter || game.Inning;
        return inning ? getInningDisplay(inning) : null;
      }

      case "nhl": {
        const period = game.Quarter || game.Period;
        if (!period) return null;
        return parseInt(period) > 3
          ? "OT"
          : `P${period} ${getFormattedTime(
              game.TimeRemainingMinutes,
              game.TimeRemainingSeconds
            )}`;
      }

      default:
        return null;
    }
  };

  const formatGameTime = (dateTime: string, status: string) => {
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
                    {formatGameTime(game.DateTime, game.Status)}
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
                      {game.AwayTeamScore}
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
                      {game.HomeTeamScore}
                    </span>
                  </div>
                </div>

                {(game.Status.toLowerCase() === "inprogress" ||
                  game.Status.toLowerCase() === "in progress") && (
                  <div className="mt-1 text-xs text-primary">
                    {formatPeriod(game, selectedSport) || game.Status}
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
