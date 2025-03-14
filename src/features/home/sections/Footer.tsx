import React from "react";
import { Container } from "@/components/Layout";

export const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-medium">
              © {new Date().getFullYear()} Jacob Giamanco
            </div>
            <div className="text-sm text-muted-foreground">
              Frontend Developer | Technical Product Manager
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/jacob-giamanco"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jgiamanco"
              target="_blank"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
