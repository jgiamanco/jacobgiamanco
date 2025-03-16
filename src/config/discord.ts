export interface BotCommand {
  command: string;
  description: string;
  category: "general" | "admin" | "fun" | "game" | "stars";
  adminOnly?: boolean;
}

export const botCommands: BotCommand[] = [
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
  {
    command: "/add <a> <b>",
    description: "Adds two numbers",
    category: "fun",
  },
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
  {
    command: "/trivia",
    description: "Play a trivia game",
    category: "game",
  },
  {
    command: "/rps <choice>",
    description: "Play rock, paper, scissors",
    category: "game",
  },
  {
    command: "/guess",
    description: "Number guessing game",
    category: "game",
  },
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
