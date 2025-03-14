
import React from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

interface Skill {
  name: string;
  iconClass: string;
  color: string;
  description: string;
}

export const SkillsWidget = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const iconColor = isDark ? '#f5f5f5' : '#2e2e2e';
  
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

  return (
    <Widget title="Technical Skills" className="md:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="flex flex-col p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:shadow-md transition-all duration-300 bg-widget/50"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={cn("w-10 h-10 rounded-md flex items-center justify-center text-white", skill.color)}>
                <i className={skill.iconClass} style={{ fontSize: '1.5rem', color: iconColor }}></i>
              </div>
              <h4 className="font-medium">{skill.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{skill.description}</p>
          </div>
        ))}
      </div>
    </Widget>
  );
};
