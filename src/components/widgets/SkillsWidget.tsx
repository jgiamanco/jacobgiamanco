import React from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { Code, FileCode, Terminal, Database, Braces, Layout, Laptop, Server } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  proficiency: number; // 0-100
  color: string;
}

interface SkillsWidgetProps {
  id?: string;
}

const skills: Skill[] = [
  { 
    name: 'React', 
    icon: <Layout className="h-5 w-5" />, 
    proficiency: 90, 
    color: 'bg-blue-500' 
  },
  { 
    name: 'TypeScript', 
    icon: <FileCode className="h-5 w-5" />, 
    proficiency: 85, 
    color: 'bg-blue-600' 
  },
  { 
    name: 'JavaScript', 
    icon: <Braces className="h-5 w-5" />, 
    proficiency: 95, 
    color: 'bg-yellow-400' 
  },
  { 
    name: 'Python', 
    icon: <Code className="h-5 w-5" />, 
    proficiency: 75, 
    color: 'bg-green-500' 
  },
  { 
    name: 'Node.js', 
    icon: <Server className="h-5 w-5" />, 
    proficiency: 80, 
    color: 'bg-green-600' 
  },
  { 
    name: 'Next.js', 
    icon: <Laptop className="h-5 w-5" />, 
    proficiency: 85, 
    color: 'bg-black dark:bg-gray-800' 
  },
];

export const SkillsWidget: React.FC<SkillsWidgetProps> = ({ id }) => {
  return (
    <Widget title="Technical Skills" className="md:col-span-2" id={id}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="flex flex-col p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 bg-widget/50"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white", skill.color)}>
                {skill.icon}
              </div>
              <h4 className="font-medium">{skill.name}</h4>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground mt-1">{skill.proficiency}%</span>
          </div>
        ))}
      </div>
    </Widget>
  );
};
