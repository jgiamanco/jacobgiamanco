import { useTheme } from "@/components/ThemeProvider";

export interface Skill {
  name: string;
  iconClass: string;
  color: string;
  description: string;
}

export const useSkills = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const skills: Skill[] = [
    {
      name: "React",
      iconClass: "devicon-react-original-wordmark",
      color: "bg-primary",
      description: "Component-based UI development",
    },
    {
      name: "TypeScript",
      iconClass: "devicon-typescript-plain",
      color: "bg-primary",
      description: "Static typing for JavaScript",
    },
    {
      name: "JavaScript",
      iconClass: "devicon-javascript-plain",
      color: "bg-primary",
      description: "Dynamic web programming",
    },
    {
      name: "Python",
      iconClass: "devicon-python-plain",
      color: "bg-primary",
      description: "Versatile programming language",
    },
    {
      name: "Node.js",
      iconClass: "devicon-nodejs-plain-wordmark",
      color: "bg-primary",
      description: "JavaScript runtime environment",
    },
    {
      name: "Next.js",
      iconClass: "devicon-nextjs-plain",
      color: "bg-primary",
      description: "React framework for production",
    },
    {
      name: "SQL",
      iconClass: "devicon-azuresqldatabase-plain",
      color: "bg-primary",
      description: "Database query language",
    },
    {
      name: "Express",
      iconClass: "devicon-express-original",
      color: "bg-primary",
      description: "Web application framework for Node.js",
    },
    {
      name: "Django",
      iconClass: "devicon-django-plain",
      color: "bg-primary",
      description: "Python web framework",
    },
  ];

  return { skills, iconColor: "#f5f5f5" };
};
