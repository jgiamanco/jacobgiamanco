
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from './Layout';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-green-900/70 to-teal-950/80 dark:from-emerald-950/90 dark:via-green-950/70 dark:to-teal-950/80 animate-gradient-x"
        />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-3/4 h-3/4 rounded-full bg-emerald-600 opacity-[0.03] blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-3/4 h-3/4 rounded-full bg-green-400 opacity-[0.03] blur-3xl" />
      </div>
      
      <Container>
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Frontend Developer
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
            Crafting beautiful digital <span className="text-primary">experiences</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            I'm a frontend developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on creating accessible, human-centered products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full">
              View Portfolio
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" id="contact-button">
              Contact Me
            </Button>
          </div>
        </div>
      </Container>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-hover-bounce">
        <a href="#skills" className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};
