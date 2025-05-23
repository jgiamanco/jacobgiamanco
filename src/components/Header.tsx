import React, { useEffect, useState } from "react";
import { Container } from "./Layout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - 50,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border/30 shadow-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={scrollToTop}
            className="font-medium text-lg tracking-tight cursor-pointer"
          >
            <span className="text-primary font-semibold">Jacob</span> Giamanco
          </Link>

          <div className="flex items-center space-x-8">
            <ThemeToggle />
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("widgets")}
                className="text-sm hover:text-primary transition-colors"
              >
                Widgets
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-sm hover:text-primary transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="text-sm hover:text-primary transition-colors"
              >
                Skills
              </button>
            </nav>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-md border border-border/50 hover:bg-accent/50"
              id="header-contact-button"
            >
              Contact
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
