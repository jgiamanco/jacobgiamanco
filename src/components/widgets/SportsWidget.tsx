import React, { useState, useEffect } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Game {
  GameID: number;
  Status: string;
  DateTime: string;
  AwayTeam: string;
  HomeTeam: string;
  AwayTeamScore: number | string;
  HomeTeamScore: number | string;
  Quarter?: string;
  Period?: string;
  Inning?: string;
  TimeRemainingMinutes?: number;
  TimeRemainingSeconds?: number;
  Channel?: string;
  StadiumDetails?: string;
  Season?: number;
  Week?: number;
}

interface RawGameData {
  GameID?: number;
  GameId?: number;
  gameId?: number;
  Status?: string;
  status?: string;
  DateTime?: string;
  GameDate?: string;
  Date?: string;
  dateTime?: string;
  AwayTeam?: string;
  VenueTeam?: string;
  VisitorTeam?: string;
  HomeTeam?: string;
  LocalTeam?: string;
  AwayTeamScore?: number;
  AwayTeamRuns?: number;
  AwayScore?: number;
  VenueTeamScore?: number;
  HomeTeamScore?: number;
  HomeTeamRuns?: number;
  HomeScore?: number;
  LocalTeamScore?: number;
  Quarter?: string;
  Period?: string;
  Inning?: string;
  TimeRemainingMinutes?: number;
  MinutesRemaining?: number;
  TimeRemainingSeconds?: number;
  SecondsRemaining?: number;
  Channel?: string;
  Broadcast?: string;
  StadiumDetails?: string;
  Venue?: string;
}

type SportType = "mlb" | "nfl" | "nhl" | "nba";

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

const FAVORITE_TEAMS: Record<SportType, string> = {
  mlb: "SD",
  nfl: "LAC",
  nhl: "SJS",
  nba: "LAL",
};

const isDev = import.meta.env.DEV;

const devLog = (...args: unknown[]) => {
  if (isDev) {
    console.log(...args);
  }
};

const devError = (...args: unknown[]) => {
  if (isDev) {
    console.error(...args);
  }
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

  const getApiKey = (sport: SportType): string => {
    switch (sport) {
      case "mlb":
        return import.meta.env.VITE_SPORTSDATA_MLB_API_KEY;
      case "nfl":
        return import.meta.env.VITE_SPORTSDATA_NFL_API_KEY;
      case "nhl":
        return import.meta.env.VITE_SPORTSDATA_NHL_API_KEY;
      case "nba":
        return import.meta.env.VITE_SPORTSDATA_NBA_API_KEY;
      default:
        return "";
    }
  };

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const currentDate = getCurrentDateFormatted();
      let endpoint = "";
      const API_KEY = getApiKey(selectedSport);

      if (!API_KEY) {
        throw new Error(`No API key found for ${selectedSport.toUpperCase()}`);
      }

      switch (selectedSport) {
        case "mlb":
          endpoint = `https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${currentDate}`;
          break;
        case "nfl":
          endpoint = `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDate/${currentDate}`;
          break;
        case "nhl":
          endpoint = `https://api.sportsdata.io/v3/nhl/scores/json/GamesByDate/${currentDate}`;
          break;
        case "nba":
          endpoint = `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${currentDate}`;
          break;
      }

      devLog(`Fetching ${selectedSport.toUpperCase()} games from:`, endpoint);
      const response = await fetch(`${endpoint}?key=${API_KEY}`);

      if (!response.ok) {
        const errorText = await response.text();
        devError(`${selectedSport.toUpperCase()} API Error:`, {
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
      devLog(`${selectedSport.toUpperCase()} games data:`, gamesData);

      // Ensure we have an array of games and normalize the data structure
      gamesData = Array.isArray(gamesData) ? gamesData : [];

      // Map the data to a common format if needed
      gamesData = gamesData.map((game: RawGameData) => {
        const status = (game.Status || game.status || "Unknown").toLowerCase();
        const isInProgress =
          status === "inprogress" || status === "in progress";
        const isFinal =
          status === "final" || status === "f/so" || status === "f/ot";

        // Debug log the raw game data
        devLog("Raw game data:", {
          status,
          isFinal,
          awayScore:
            game.AwayTeamRuns ||
            game.AwayTeamScore ||
            game.AwayScore ||
            game.VenueTeamScore,
          homeScore:
            game.HomeTeamRuns ||
            game.HomeTeamScore ||
            game.HomeScore ||
            game.LocalTeamScore,
        });

        // Helper function to safely get score
        const getScore = (
          score: number | undefined | null
        ): number | string => {
          // If we have a valid score, return it
          if (typeof score === "number") {
            return score;
          }

          // For upcoming games, show "-"
          if (!isInProgress && !isFinal) {
            return "-";
          }

          // For in-progress or final games, show 0 if no score
          return 0;
        };

        const awayScore = getScore(
          game.AwayTeamRuns ||
            game.AwayTeamScore ||
            game.AwayScore ||
            game.VenueTeamScore
        );
        const homeScore = getScore(
          game.HomeTeamRuns ||
            game.HomeTeamScore ||
            game.HomeScore ||
            game.LocalTeamScore
        );

        // Debug log the processed scores
        devLog("Processed scores:", {
          status,
          isFinal,
          awayScore,
          homeScore,
        });

        return {
          GameID: game.GameID || game.GameId || game.gameId || 0,
          Status: game.Status || game.status || "Unknown",
          DateTime:
            game.DateTime ||
            game.GameDate ||
            game.Date ||
            game.dateTime ||
            new Date().toISOString(),
          AwayTeam:
            game.AwayTeam || game.VenueTeam || game.VisitorTeam || "Away",
          HomeTeam: game.HomeTeam || game.LocalTeam || "Home",
          AwayTeamScore: awayScore,
          HomeTeamScore: homeScore,
          Quarter: game.Quarter || game.Period || game.Inning,
          TimeRemainingMinutes:
            game.TimeRemainingMinutes || game.MinutesRemaining || 0,
          TimeRemainingSeconds:
            game.TimeRemainingSeconds || game.SecondsRemaining || 0,
          Channel: game.Channel || game.Broadcast,
          StadiumDetails: game.StadiumDetails || game.Venue,
        };
      });

      // Sort games by status and favorite team
      gamesData.sort((a: Game, b: Game) => {
        const statusA = a.Status.toLowerCase();
        const statusB = b.Status.toLowerCase();
        const favoriteTeam = FAVORITE_TEAMS[selectedSport];

        // Check if either game involves the favorite team
        const aHasFavorite =
          a.HomeTeam === favoriteTeam || a.AwayTeam === favoriteTeam;
        const bHasFavorite =
          b.HomeTeam === favoriteTeam || b.AwayTeam === favoriteTeam;

        // Favorite team's games come first
        if (aHasFavorite && !bHasFavorite) return -1;
        if (!aHasFavorite && bHasFavorite) return 1;

        // Then live games
        if (statusA === "inprogress" || statusA === "in progress") return -1;
        if (statusB === "inprogress" || statusB === "in progress") return 1;

        // Final games last
        if (statusA.startsWith("f") && !statusB.startsWith("f")) return 1;
        if (statusB.startsWith("f") && !statusA.startsWith("f")) return -1;

        // Then sort by scheduled time
        return new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime();
      });

      setGames(gamesData);
    } catch (error) {
      devError("Error fetching games:", error);
      toast({
        title: `${selectedSport.toUpperCase()} data error`,
        description:
          error instanceof Error ? error.message : "Failed to fetch games",
        variant: "destructive",
      });
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 30000);
    return () => clearInterval(interval);
  }, [selectedSport]);

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

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 2 : games.length - 2));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 2 < games.length ? prev + 2 : 0));
  };

  const visibleGames = games.slice(currentIndex, currentIndex + 2);

  return (
    <Widget
      title="Live Sports"
      isLoading={isLoading}
      className="col-span-1"
      headerContent={
        <div className="flex items-center space-x-2">
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value as SportType)}
            className="text-xs bg-transparent border-none focus:outline-none text-muted-foreground"
          >
            <option value="mlb">MLB</option>
            <option value="nfl">NFL</option>
            <option value="nhl">NHL</option>
            <option value="nba">NBA</option>
          </select>
        </div>
      }
    >
      <div className="relative h-[calc(100%-2rem)]">
        <div className="flex items-center space-x-2 mb-2">
          <button
            onClick={handlePrevious}
            className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
            disabled={games.length <= 2}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex-1 text-center text-xs text-muted-foreground">
            {games.length > 0
              ? `${currentIndex + 1}-${Math.min(
                  currentIndex + 2,
                  games.length
                )} of ${games.length}`
              : "No games available"}
          </div>
          <button
            onClick={handleNext}
            className="p-1 rounded-full hover:bg-secondary/80 transition-colors"
            disabled={games.length <= 2}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2 h-full">
          {visibleGames.map((game) => (
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

        {games.length > 0 && (
          <div className="mt-2 flex justify-center space-x-1">
            {Array.from({ length: Math.ceil(games.length / 2) }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  Math.floor(currentIndex / 2) === i
                    ? "bg-primary"
                    : "bg-secondary"
                )}
              />
            ))}
          </div>
        )}
        <div className="mt-2 text-[10px] text-muted-foreground text-center">
          Scores shown are sample data for demonstration purposes
        </div>
      </div>
    </Widget>
  );
};
