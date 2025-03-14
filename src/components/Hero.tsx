
import React from 'react';
import { Button } from '@/components/ui/button';
import { Container } from './Layout';
import { ArrowDown, Code, Github, Linkedin } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-3/4 h-3/4 rounded-full bg-primary opacity-[0.02] blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-3/4 h-3/4 rounded-full bg-accent opacity-[0.02] blur-3xl" />
      </div>
      
      <Container>
        <div className="max-w-3xl animate-fade-in">
          <div className="inline-block mb-6 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <div className="flex items-center gap-1.5">
              <Code className="h-3.5 w-3.5" />
              <span>Frontend Developer</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
            Crafting beautiful digital <span className="text-primary">experiences</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            I'm a frontend developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on creating accessible, human-centered products.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-md" id="contact-button">
              Contact Me
            </Button>
            <div className="flex gap-2">
              <a href="https://www.linkedin.com/in/jacob-giamanco" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-md h-11 w-11 flex items-center justify-center">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </a>
              <a href="https://github.com/jgiamanco" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="rounded-md h-11 w-11 flex items-center justify-center">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
            </div>
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
