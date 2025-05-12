import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "react-project-library",
    title: "React Project Library",
    description:
      "Enterprise-grade React project showcase featuring production-ready applications (Pomodoro Timer, ReWeather Dashboard, Calculator, Todo App). Implemented live demos, interactive code inspection, and rebackend and Row Level Security, showcasing expertise in scalable architecture.",
    url: "https://react-project-library-delta.vercel.app",
    technologies: ["React", "TypeScript", "Vercel", "Row Level Security"],
    featured: true,
  },
  {
    id: "mithrandir",
    title: "Mithrandir",
    description:
      "Sophisticated Discord bot ecosystem with discord.py, OpenAI, and SQLite, implementing 35+ custom cosystems, demonstrating advanced bot development and AI integration.",
    url: "https://discord.com/invite/jbFrGxR7",
    technologies: ["Python", "discord.py", "OpenAI", "SQLite"],
    featured: true,
  },
  {
    id: "nimbus",
    title: "Nimbus",
    description:
      "High-performance weather visualization platform using TypeScript, Webpack, and Canvas animations, featuring real-time meteorological data and responsive design patterns.",
    url: "https://weatherlookup.vercel.app",
    technologies: ["TypeScript", "Webpack", "Canvas", "React"],
    featured: true,
  },
  {
    id: "roster",
    title: "Roster",
    description:
      "Modern NFL player analytics platform with React, TypeScript, and Node.js, featuring real-time filtering and Semantic UI and Tachyons.",
    url: "https://nfl-rosters.vercel.app",
    technologies: ["React", "TypeScript", "Node.js", "Semantic UI", "Tachyons"],
    featured: false,
  },
  {
    id: "crwn-clothing",
    title: "CRWN Clothing",
    description:
      "Scalable e-commerce platform with React, Firebase, and GraphQL, implementing Google OAuth, Stripe management with optimized performance.",
    url: "https://crwnclothingco.netlify.app",
    technologies: ["React", "Firebase", "GraphQL", "Stripe"],
    featured: false,
  },
  {
    id: "proxy",
    title: "Proxy",
    description:
      "Cutting-edge portfolio project utilizing NestJS for robust API management, serving as an efficient proxy. The project ensures seamless scalability and high performance, adeptly handling complex traffic demand.",
    url: "https://api-symphony-server.vercel.app",
    technologies: ["NestJS", "TypeScript", "API Management"],
    featured: false,
  },
];
