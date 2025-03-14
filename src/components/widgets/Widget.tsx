
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, GripVertical } from 'lucide-react';

interface WidgetProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  headerContent?: React.ReactNode;
  interactive?: boolean;
  id?: string;
}

export const Widget: React.FC<WidgetProps> = ({ 
  title, 
  className, 
  children, 
  isLoading = false,
  headerContent,
  interactive = true,
  id
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "widget animate-scale-in h-full", 
        interactive && "interactive-widget",
        isHovered && "ring-1 ring-primary/30 shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={id}
    >
      {(title || headerContent) && (
        <div className="widget-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="react-grid-draghandle cursor-move">
              <GripVertical className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </div>
            {title && <h3 className="widget-title uppercase text-xs tracking-wider text-muted-foreground">{title}</h3>}
          </div>
          {headerContent}
        </div>
      )}
      <div className={cn("widget-content relative h-full", isHovered && "bg-secondary/20")}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-xs">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
