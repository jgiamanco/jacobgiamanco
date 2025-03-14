import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./Layout";
import {
  ArrowDown,
  Code,
  Github,
  Linkedin,
  Briefcase,
  Users,
  Bot,
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative h-screen py-6 md:py-8 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-3/4 h-3/4 rounded-full bg-primary opacity-[0.02] blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-3/4 h-3/4 rounded-full bg-accent opacity-[0.02] blur-3xl" />
      </div>

      <Container className="flex flex-col h-full justify-center">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
          <div className="w-full md:w-2/3 animate-fade-in">
            <div className="inline-block mb-4 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Code className="h-3.5 w-3.5" />
                <span>Frontend Developer & Product Manager</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-2 md:mb-3">
                Crafting beautiful digital{" "}
                <span className="text-primary">experiences</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-5 max-w-2xl leading-relaxed">
                Valued expert with 5+ years of experience driving significant
                improvements in technical product management, frontend
                engineering, and software design. Adept at prioritizing clear
                communication and strong cross-team collaboration.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <Button size="lg" className="rounded-md" id="contact-button">
                Contact Me
              </Button>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/jacob-giamanco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md h-11 w-11 flex items-center justify-center"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </a>
                <a
                  href="https://github.com/jgiamanco"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-md h-11 w-11 flex items-center justify-center"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <SkillItem
                icon={<Briefcase className="h-5 w-5" />}
                title="Technical Product Management"
                description="Managed and optimized content for over 60 products, resulting in significant cost savings."
              />

              <SkillItem
                icon={<Code className="h-5 w-5" />}
                title="Frontend Engineering"
                description="Crafted intuitive web experiences using modern JavaScript frameworks and UI/UX principles."
              />

              <SkillItem
                icon={<Bot className="h-5 w-5" />}
                title="Automation Specialist"
                description="Implemented automation scripts to streamline processes and improve efficiency."
              />

              <SkillItem
                icon={<Users className="h-5 w-5" />}
                title="Team Leadership"
                description="Respected and influential team leader with a natural ability to exceed aggressive goals."
              />
            </div>
          </div>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end self-center">
            <div className="relative transform transition-all duration-300 hover:scale-105 mt-4 md:mt-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl">
                <img
                  src="/lovable-uploads/d0591870-cc31-4b6d-be04-7e285801a66b.png"
                  alt="Jacob Giamanco"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary text-white px-3 py-1.5 rounded-lg shadow-md text-sm font-medium">
                <span>5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-hover-bounce hidden md:flex flex-col items-center">
        <a
          href="#skills"
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

type SkillItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const SkillItem = ({ icon, title, description }: SkillItemProps) => (
  <div className="flex gap-3 items-start p-3 rounded-lg transition-all duration-300 hover:bg-secondary/30">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-base">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
