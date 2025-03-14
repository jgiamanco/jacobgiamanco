
import { useTheme } from '@/components/ThemeProvider';

export interface Skill {
  name: string;
  iconClass: string;
  color: string;
  description: string;
}

export const useSkills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const skills: Skill[] = [
    { 
      name: 'React', 
      iconClass: 'devicon-react-plain', 
      color: 'bg-blue-500',
      description: 'Component-based UI development' 
    },
    { 
      name: 'TypeScript', 
      iconClass: 'devicon-typescript-plain', 
      color: 'bg-blue-600',
      description: 'Static typing for JavaScript' 
    },
    { 
      name: 'JavaScript', 
      iconClass: 'devicon-javascript-plain', 
      color: 'bg-yellow-400',
      description: 'Dynamic web programming' 
    },
    { 
      name: 'Python', 
      iconClass: 'devicon-python-plain', 
      color: 'bg-green-500',
      description: 'Versatile programming language' 
    },
    { 
      name: 'Node.js', 
      iconClass: 'devicon-nodejs-plain', 
      color: 'bg-green-600',
      description: 'JavaScript runtime environment' 
    },
    { 
      name: 'Next.js', 
      iconClass: 'devicon-nextjs-plain', 
      color: isDark ? 'bg-gray-800' : 'bg-black',
      description: 'React framework for production' 
    },
    { 
      name: 'SQL', 
      iconClass: 'devicon-mysql-plain', 
      color: 'bg-blue-400',
      description: 'Database query language' 
    },
    { 
      name: 'Express', 
      iconClass: 'devicon-express-plain', 
      color: 'bg-gray-600',
      description: 'Web application framework for Node.js' 
    },
    { 
      name: 'Django', 
      iconClass: 'devicon-django-plain', 
      color: 'bg-green-700',
      description: 'Python web framework' 
    },
  ];

  return { skills, iconColor: isDark ? '#f5f5f5' : '#2e2e2e' };
};
