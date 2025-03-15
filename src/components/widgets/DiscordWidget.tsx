import React, { useState, useEffect } from "react";
import { Widget } from "./Widget";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  Hash,
  Bot,
  BotMessageSquare,
  GamepadIcon,
  StarIcon,
  Settings2,
  Brain,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/utils/logger";

interface DiscordMember {
  id: string;
  username: string;
  avatar: string;
  status: string;
  avatar_url: string;
  isBot?: boolean;
}

interface DiscordServer {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: DiscordMember[];
}

interface BotCommand {
  command: string;
  description: string;
  category: "general" | "admin" | "fun" | "game" | "stars";
  adminOnly?: boolean;
}

const botCommands: BotCommand[] = [
  // General Commands
  {
    command: "/help",
    description: "Displays all available commands",
    category: "general",
  },
  {
    command: "/Mithrandir <ai_prompt>",
    description: "Asks Mithrandir to respond to a query",
    category: "general",
  },
  {
    command: "/google <search_query>",
    description: "Searches Google for a specific term",
    category: "general",
  },
  {
    command: "/urban <term>",
    description: "Retrieves Urban Dictionary definition",
    category: "general",
  },
  {
    command: "/youtube <search_query>",
    description: "Retrieve a YouTube video",
    category: "general",
  },
  {
    command: "/hello",
    description: "Says hello to the user",
    category: "general",
  },
  {
    command: "/serverinfo",
    description: "Displays server information",
    category: "general",
  },
  {
    command: "/userinfo <member>",
    description: "Displays user information",
    category: "general",
  },
  {
    command: "/list",
    description: "Lists all saved triggers",
    category: "general",
  },

  // Admin Commands
  {
    command: "/set_admin_role <role>",
    description: "Sets the admin role",
    category: "admin",
    adminOnly: true,
  },
  {
    command: "/setwelcome <message>",
    description: "Sets custom welcome message",
    category: "admin",
    adminOnly: true,
  },
  {
    command: "/trigger <word> <response>",
    description: "Sets word trigger response",
    category: "admin",
    adminOnly: true,
  },
  {
    command: "/erase <word>",
    description: "Erases a trigger response",
    category: "admin",
    adminOnly: true,
  },

  // Fun Commands
  {
    command: "/repeat <message>",
    description: "Repeats your message",
    category: "fun",
  },
  { command: "/add <a> <b>", description: "Adds two numbers", category: "fun" },
  {
    command: "/subtract <a> <b>",
    description: "Subtracts numbers",
    category: "fun",
  },
  {
    command: "/multiply <a> <b>",
    description: "Multiplies numbers",
    category: "fun",
  },
  {
    command: "/divide <a> <b>",
    description: "Divides numbers",
    category: "fun",
  },

  // Game Commands
  {
    command: "/lotr_game",
    description: "LOTR quote guessing game",
    category: "game",
  },
  { command: "/trivia", description: "Play a trivia game", category: "game" },
  {
    command: "/rps <choice>",
    description: "Play rock, paper, scissors",
    category: "game",
  },
  { command: "/guess", description: "Number guessing game", category: "game" },
  {
    command: "/scramble",
    description: "Word unscramble game",
    category: "game",
  },

  // Stars System
  {
    command: "/checkstars",
    description: "Check user's stars",
    category: "stars",
  },
  {
    command: "/addstars <user> <stars>",
    description: "Add stars to user",
    category: "stars",
    adminOnly: true,
  },
  {
    command: "/leaderboard",
    description: "Stars leaderboard",
    category: "stars",
  },
];

export const DiscordWidget = () => {
  const [server, setServer] = useState<DiscordServer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState<BotCommand["category"]>("general");
  const { toast } = useToast();

  const serverId = "609488074413572155";

  useEffect(() => {
    const fetchDiscordData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://discord.com/api/guilds/${serverId}/widget.json`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(
              "Discord widget is not enabled for this server. Please enable it in server settings."
            );
          }
          throw new Error(
            `Failed to fetch Discord server data: ${response.statusText}`
          );
        }

        const data = await response.json();
        setServer(data);
      } catch (error) {
        logger.error("Error fetching Discord data:", error);
        toast({
          title: "Discord widget error",
          description:
            error instanceof Error
              ? error.message
              : "Could not fetch Discord server data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscordData();
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-400";
      case "dnd":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleJoinServer = () => {
    if (server?.instant_invite) {
      window.open(server.instant_invite, "_blank");
      toast({
        title: "Opening Discord invite",
        description: "Redirecting you to the Discord server invite",
      });
    } else {
      toast({
        title: "Invite unavailable",
        description: "Could not find a valid invite link",
        variant: "destructive",
      });
    }
  };

  const getCategoryIcon = (category: BotCommand["category"]) => {
    switch (category) {
      case "general":
        return <MessageSquare className="h-4 w-4" />;
      case "admin":
        return <Settings2 className="h-4 w-4" />;
      case "fun":
        return <Brain className="h-4 w-4" />;
      case "game":
        return <GamepadIcon className="h-4 w-4" />;
      case "stars":
        return <StarIcon className="h-4 w-4" />;
      default:
        return <BotMessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Widget
      title="Discord Community"
      isLoading={isLoading}
      className="md:col-span-2 md:row-span-2 h-full"
      headerContent={
        server && (
          <div className="flex items-center space-x-1">
            <div className={cn("w-2 h-2 rounded-full bg-green-500")} />
            <span className="text-xs text-muted-foreground">
              {server.presence_count} online
            </span>
          </div>
        )
      }
    >
      {server && (
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 pb-3 border-b border-border/50">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Hash className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{server.name}</h3>
              <p className="text-sm text-muted-foreground">
                Connect with developers and chat with Mithrandir
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <div className="mb-4 flex-shrink-0">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Online Members
                </h4>
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[120px] pr-2">
                {server.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={member.avatar_url}
                        alt={member.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <div
                        className={cn(
                          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-widget",
                          getStatusColor(member.status)
                        )}
                      />
                      {member.isBot && (
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5">
                          <Bot className="h-2.5 w-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="text-sm font-medium truncate">
                          {member.username}
                        </p>
                        {member.isBot && (
                          <span className="ml-1.5 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-sm font-medium">
                            BOT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">
                        {member.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                <BotMessageSquare className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium text-foreground">
                  Mithrandir Commands
                </h4>
              </div>

              <div className="flex space-x-2 mb-3 overflow-x-auto pb-2 flex-shrink-0">
                {["general", "admin", "fun", "game", "stars"].map(
                  (category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(category as BotCommand["category"])
                      }
                      className={cn(
                        "flex items-center space-x-1 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap",
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      )}
                    >
                      {getCategoryIcon(category as BotCommand["category"])}
                      <span className="capitalize">{category}</span>
                    </button>
                  )
                )}
              </div>

              <div className="flex-1 overflow-y-auto min-h-0 space-y-1.5 pr-2">
                {botCommands
                  .filter((cmd) => cmd.category === selectedCategory)
                  .map((cmd, index) => (
                    <div
                      key={index}
                      className="flex items-start text-xs p-2 rounded-lg hover:bg-secondary/30"
                    >
                      <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-primary whitespace-nowrap">
                        {cmd.command}
                      </code>
                      <span className="ml-2 text-muted-foreground">
                        {cmd.description}
                        {cmd.adminOnly && (
                          <span className="ml-1 text-xs text-destructive">
                            (Admin)
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleJoinServer}
            className="mt-4 w-full py-2 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors flex-shrink-0"
          >
            Join Server & Chat with Mithrandir
          </button>
        </div>
      )}
    </Widget>
  );
};
