import React, { useEffect, useState } from 'react';
import { Widget } from './Widget';
import { cn } from '@/lib/utils';

interface ClockWidgetProps {
  id?: string;
}

export const ClockWidget: React.FC<ClockWidgetProps> = ({ id }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Convert to Pacific Time
  const pacificTime = new Date(time.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  
  const hours = pacificTime.getHours();
  const minutes = pacificTime.getMinutes();
  const seconds = pacificTime.getSeconds();
  
  // Format hours for 12-hour clock
  const hours12 = hours % 12 || 12;
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  const formatTime = (value: number) => value.toString().padStart(2, '0');
  
  return (
    <Widget title="Clock" className="md:row-span-1" id={id}>
      <div className="flex flex-col items-center justify-center h-full py-4">
        <div className="text-4xl font-light tracking-tight mb-2">
          {formatTime(hours12)}:
          <span>{formatTime(minutes)}</span>
          <span className="text-muted-foreground">:{formatTime(seconds)}</span>
          <span className="text-sm ml-2">{amPm}</span>
          <span className="text-xs ml-2 text-muted-foreground">PST</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {pacificTime.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="mt-6 relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-border/30" />
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-px h-8 bg-primary origin-bottom"
            )}
            style={{ 
              transform: `translate(-50%, -100%) rotate(${hours * 30 + minutes * 0.5}deg)` 
            }}
          />
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-px h-10 bg-primary/80 origin-bottom"
            )}
            style={{ 
              transform: `translate(-50%, -100%) rotate(${minutes * 6}deg)` 
            }}
          />
          <div 
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-0.5 h-10 bg-primary/60 origin-bottom"
            )}
            style={{ 
              transform: `translate(-50%, -100%) rotate(${seconds * 6}deg)` 
            }}
          />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </Widget>
  );
};
