
import React, { useEffect, useState } from 'react';
import { Container } from './Layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="font-medium text-lg tracking-tight">
            <span className="text-primary">Jacob</span> Giamanco
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-sm hover:text-primary transition-colors">Skills</a>
            <a href="#widgets" className="text-sm hover:text-primary transition-colors">Widgets</a>
          </nav>
          <Button size="sm" className="rounded-full" id="header-contact-button">Contact</Button>
        </div>
      </Container>
    </header>
  );
};
