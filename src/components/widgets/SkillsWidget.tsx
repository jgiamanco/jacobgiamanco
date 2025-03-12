
import React from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 0-100
  color: string;
}

const skills: Skill[] = [
  { name: 'React', icon: '⚛️', proficiency: 90, color: 'bg-blue-500' },
  { name: 'TypeScript', icon: '𝐓𝐒', proficiency: 85, color: 'bg-blue-600' },
  { name: 'JavaScript', icon: '𝐉𝐒', proficiency: 95, color: 'bg-yellow-400' },
  { name: 'Python', icon: '🐍', proficiency: 75, color: 'bg-green-500' },
  { name: 'Node.js', icon: '🟢', proficiency: 80, color: 'bg-green-600' },
  { name: 'Next.js', icon: '𝐍', proficiency: 85, color: 'bg-black' },
];

export const SkillsWidget = () => {
  return (
    <Widget title="Technical Skills" className="md:col-span-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div 
            key={skill.name}
            className="flex flex-col p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all duration-300 bg-widget/50"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white", skill.color)}>
                <span>{skill.icon}</span>
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
