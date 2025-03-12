
import React from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen w-full bg-background text-foreground font-sans", className)}>
      {children}
    </div>
  );
};

export const Container: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-6", className)}>
      {children}
    </div>
  );
};
