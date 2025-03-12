
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("min-h-screen w-full bg-background text-foreground font-sans overflow-x-hidden", className)}>
      {/* Parallax background layers */}
      <div 
        className="parallax-layer opacity-20"
        style={{ 
          transform: `translateY(${scrollPosition * 0.2}px)`,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="2" cy="2" r="1" fill="%23155E45" fill-opacity="0.2"/%3E%3C/svg%3E")',
          backgroundSize: '20px 20px',
        }}
      />
      <div 
        className="parallax-layer opacity-15"
        style={{ 
          transform: `translateY(${scrollPosition * 0.1}px)`,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 20 L20 0 L40 20 L20 40 Z" fill="%23155E45" fill-opacity="0.1"/%3E%3C/svg%3E")',
          backgroundSize: '40px 40px',
        }}
      />
      <div 
        className="parallax-layer opacity-10"
        style={{ 
          transform: `translateY(${scrollPosition * 0.05}px)`,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="20" height="20" x="20" y="20" fill="%23155E45" fill-opacity="0.1"/%3E%3C/svg%3E")',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative">
        {children}
      </div>
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
