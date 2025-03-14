
import React from 'react';
import { Container } from '@/components/Layout';

export const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-medium">© {new Date().getFullYear()} Jacob Giamanco</div>
            <div className="text-sm text-muted-foreground">Frontend Developer</div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dribbble</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
