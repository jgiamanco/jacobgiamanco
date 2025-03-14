
import React from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { useSkills } from '@/data/skills';

export const SkillsWidget = () => {
  const { skills, iconColor } = useSkills();

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
