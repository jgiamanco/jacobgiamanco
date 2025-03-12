
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface WidgetProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  headerContent?: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({ 
  title, 
  className, 
  children, 
  isLoading = false,
  headerContent
}) => {
  return (
    <div className={cn("widget animate-scale-in", className)}>
      {(title || headerContent) && (
        <div className="widget-header">
          {title && <h3 className="widget-title uppercase text-xs tracking-wider text-muted-foreground">{title}</h3>}
          {headerContent}
        </div>
      )}
      <div className="widget-content relative">
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
