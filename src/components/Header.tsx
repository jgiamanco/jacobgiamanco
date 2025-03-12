
import React, { useEffect, useState } from 'react';
import { Container } from './Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg tracking-tight">
            <span className="text-primary font-semibold">Jacob</span> Giamanco
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-sm hover:text-primary transition-colors">Skills</a>
            <a href="#widgets" className="text-sm hover:text-primary transition-colors">Widgets</a>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button size="sm" variant="ghost" className="rounded-md border border-border/50 hover:bg-accent/50" id="header-contact-button">Contact</Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
