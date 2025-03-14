
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface WidgetProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  headerContent?: React.ReactNode;
  interactive?: boolean;
}

export const Widget: React.FC<WidgetProps> = ({ 
  title, 
  className, 
  children, 
  isLoading = false,
  headerContent,
  interactive = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "widget animate-scale-in bg-primary/5", 
        interactive && "interactive-widget",
        isHovered && "ring-1 ring-primary/30 shadow-lg",
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      {(title || headerContent) && (
        <div className="widget-header">
          {title && <h3 className="widget-title uppercase text-xs tracking-wider text-muted-foreground">{title}</h3>}
          {headerContent}
        </div>
      )}
      <div className={cn("widget-content relative", isHovered && interactive && "bg-primary/10")}>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-xs z-10">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
