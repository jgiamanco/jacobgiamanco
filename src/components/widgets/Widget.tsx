
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, GripVertical, Minimize2, Maximize2, Square } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useWidgetContext, WidgetSize } from '@/contexts/WidgetContext';

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
  const { updateWidgetSize } = useWidgetContext();
  
  const handleResize = (size: WidgetSize) => {
    if (id) {
      updateWidgetSize(id, size);
    }
  };
  
  return (
    <div 
      className={cn(
        "widget animate-scale-in h-full flex flex-col", 
        interactive && "interactive-widget",
        isHovered && "ring-1 ring-primary/30 shadow-lg",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={id}
    >
      {(title || headerContent) && (
        <div className="widget-header flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="react-grid-draghandle cursor-move">
              <GripVertical className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
            </div>
            {title && <h3 className="widget-title uppercase text-xs tracking-wider text-muted-foreground">{title}</h3>}
          </div>
          <div className="flex items-center gap-1">
            {id && interactive && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleResize('small')}>
                    <Minimize2 className="mr-2 h-4 w-4" />
                    <span>Small (1×2)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleResize('medium')}>
                    <Square className="mr-2 h-4 w-4" />
                    <span>Medium (2×2)</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleResize('large')}>
                    <Maximize2 className="mr-2 h-4 w-4" />
                    <span>Large (3×4)</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {headerContent}
          </div>
        </div>
      )}
      <div className={cn("widget-content relative flex-1 overflow-auto", isHovered && "bg-secondary/20")}>
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
