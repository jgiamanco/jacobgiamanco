
import React from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faJs,
  faPython,
  faNodeJs,
  faNode,
  faDev
} from '@fortawesome/free-brands-svg-icons';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const skills: Skill[] = [
  { 
    name: 'React', 
    icon: <FontAwesomeIcon icon={faReact} />, 
    color: 'bg-blue-500',
    description: 'Component-based UI development' 
  },
  { 
    name: 'TypeScript', 
    icon: <FontAwesomeIcon icon={faDev} />, 
    color: 'bg-blue-600',
    description: 'Static typing for JavaScript' 
  },
  { 
    name: 'JavaScript', 
    icon: <FontAwesomeIcon icon={faJs} />, 
    color: 'bg-yellow-400',
    description: 'Dynamic web programming' 
  },
  { 
    name: 'Python', 
    icon: <FontAwesomeIcon icon={faPython} />, 
    color: 'bg-green-500',
    description: 'Versatile programming language' 
  },
  { 
    name: 'Node.js', 
    icon: <FontAwesomeIcon icon={faNodeJs} />, 
    color: 'bg-green-600',
    description: 'JavaScript runtime environment' 
  },
  { 
    name: 'Next.js', 
    icon: <FontAwesomeIcon icon={faNode} />, 
    color: 'bg-black dark:bg-gray-800',
    description: 'React framework for production' 
  },
  { 
    name: 'SQL', 
    icon: <FontAwesomeIcon icon={faDatabase} />, 
    color: 'bg-blue-400',
    description: 'Database query language' 
  },
  { 
    name: 'Express', 
    icon: <FontAwesomeIcon icon={faNode} />, 
    color: 'bg-gray-600',
    description: 'Web application framework for Node.js' 
  },
  { 
    name: 'Django', 
    icon: <FontAwesomeIcon icon={faPython} />, 
    color: 'bg-green-700',
    description: 'Python web framework' 
  },
];

export const SkillsWidget = () => {
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
                {skill.icon}
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
