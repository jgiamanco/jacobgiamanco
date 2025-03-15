import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "./Layout";
import { useIsMobile, useIsLargeScreen } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const isLargeScreen = useIsLargeScreen();

  return (
    <section className="relative min-h-[100svh] w-full py-4 sm:py-6 md:py-8 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-3/4 h-3/4 rounded-full bg-primary opacity-[0.02] blur-3xl" />
        <div className="absolute left-0 bottom-0 translate-y-1/4 -translate-x-1/4 w-3/4 h-3/4 rounded-full bg-accent opacity-[0.02] blur-3xl" />
      </div>

      <Container
        className={`flex flex-col h-full justify-center w-full ${
          isLargeScreen ? "max-w-[1600px]" : ""
        }`}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 md:gap-10 lg:gap-16">
          <div
            className={`w-full md:w-2/3 animate-fade-in order-2 md:order-1 ${
              isLargeScreen ? "lg:text-lg" : ""
            }`}
          >
            <div className="inline-block mb-3 sm:mb-4 px-3 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-medium">
              <div className="flex items-center gap-1.5">
                <Code
                  className={`h-3.5 w-3.5 ${
                    isLargeScreen ? "lg:h-4 lg:w-4" : ""
                  }`}
                />
                <span>Frontend Developer & Product Manager</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3">
              <h1
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${
                  isLargeScreen ? "xl:text-6xl" : ""
                } font-medium tracking-tight mb-2 md:mb-3`}
              >
                Crafting beautiful digital{" "}
                <span className="text-primary">experiences</span>
              </h1>
              <p
                className={`text-sm sm:text-base md:text-lg ${
                  isLargeScreen ? "xl:text-xl" : ""
                } text-muted-foreground mb-3 sm:mb-4 md:mb-5 max-w-2xl leading-relaxed`}
              >
                Valued expert with 5+ years of experience driving significant
                improvements in technical product management, frontend
                engineering, and software design. Adept at prioritizing clear
                communication and strong cross-team collaboration.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Button
                size={isMobile ? "default" : "lg"}
                className={`rounded-md ${
                  isLargeScreen ? "text-lg h-auto" : ""
                }`}
                id="contact-button"
              >
                Contact Me
              </Button>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/jacob-giamanco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Button
                    size={isMobile ? "icon" : "icon"}
                    variant="outline"
                    className={`rounded-md h-9 sm:h-10 md:h-11 w-9 sm:w-10 md:w-11 ${
                      isLargeScreen ? "lg:h-12 lg:w-12" : ""
                    } flex items-center justify-center`}
                  >
                    <Linkedin
                      className={`h-4 sm:h-5 w-4 sm:w-5 ${
                        isLargeScreen ? "lg:h-6 lg:w-6" : ""
                      }`}
                    />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </a>
                <a
                  href="https://github.com/jgiamanco"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Button
                    size={isMobile ? "icon" : "icon"}
                    variant="outline"
                    className={`rounded-md h-9 sm:h-10 md:h-11 w-9 sm:w-10 md:w-11 ${
                      isLargeScreen ? "lg:h-12 lg:w-12" : ""
                    } flex items-center justify-center`}
                  >
                    <Github
                      className={`h-4 sm:h-5 w-4 sm:w-5 ${
                        isLargeScreen ? "lg:h-6 lg:w-6" : ""
                      }`}
                    />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 ${
                isLargeScreen ? "lg:gap-5" : ""
              }`}
            >
              <SkillItem
                icon={
                  <Code
                    className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      isLargeScreen ? "lg:h-6 lg:w-6" : ""
                    }`}
                  />
                }
                title="Frontend Engineering"
                description="Crafted intuitive web experiences using modern JavaScript frameworks and UI/UX principles."
                isLargeScreen={isLargeScreen}
              />

              <SkillItem
                icon={
                  <Briefcase
                    className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      isLargeScreen ? "lg:h-6 lg:w-6" : ""
                    }`}
                  />
                }
                title="Technical Product Management"
                description="Managed and optimized content for over 60 products, resulting in significant cost savings."
                isLargeScreen={isLargeScreen}
              />

              <SkillItem
                icon={
                  <Bot
                    className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      isLargeScreen ? "lg:h-6 lg:w-6" : ""
                    }`}
                  />
                }
                title="Automation Specialist"
                description="Implemented automation scripts to streamline processes and improve efficiency."
                isLargeScreen={isLargeScreen}
              />

              <SkillItem
                icon={
                  <Users
                    className={`h-4 sm:h-5 w-4 sm:w-5 ${
                      isLargeScreen ? "lg:h-6 lg:w-6" : ""
                    }`}
                  />
                }
                title="Team Leadership"
                description="Respected and influential team leader with a natural ability to exceed aggressive goals."
                isLargeScreen={isLargeScreen}
              />
            </div>
          </div>

          <div className="w-full sm:w-2/3 md:w-1/3 flex justify-center md:justify-end self-center order-1 md:order-2 mb-4 md:mb-0 mt-16 sm:mt-20 md:mt-0">
            <div className="relative transform transition-all duration-300 hover:scale-105">
              <div
                className={`w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 ${
                  isLargeScreen ? "xl:w-64 xl:h-64" : ""
                } rounded-2xl overflow-hidden border-4 border-primary/20 shadow-xl`}
              >
                <img
                  src="/lovable-uploads/d0591870-cc31-4b6d-be04-7e285801a66b.png"
                  alt="Jacob Giamanco"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              <div
                className={`absolute -bottom-3 -right-3 bg-primary text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg shadow-md text-xs sm:text-sm ${
                  isLargeScreen ? "lg:text-base lg:px-4 lg:py-2" : ""
                } font-medium`}
              >
                <span>5+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-4 sm:bottom-6 -translate-x-1/2 animate-hover-bounce hidden md:flex flex-col items-center">
        <a
          href="#skills"
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll to skills section"
        >
          <span
            className={`text-xs sm:text-sm mb-2 ${
              isLargeScreen ? "lg:text-base" : ""
            }`}
          >
            Scroll Down
          </span>
          <ArrowDown
            className={`h-4 sm:h-5 w-4 sm:w-5 ${
              isLargeScreen ? "lg:h-6 lg:w-6" : ""
            }`}
          />
        </a>
      </div>
    </section>
  );
};

type SkillItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLargeScreen?: boolean;
};

const SkillItem = ({
  icon,
  title,
  description,
  isLargeScreen,
}: SkillItemProps) => (
  <div className="flex gap-2 sm:gap-3 items-start p-2 sm:p-3 rounded-lg transition-all duration-300 hover:bg-secondary/30">
    <div
      className={`flex-shrink-0 w-8 sm:w-10 h-8 sm:h-10 ${
        isLargeScreen ? "lg:w-12 lg:h-12" : ""
      } rounded-full bg-primary/10 flex items-center justify-center text-primary`}
    >
      {icon}
    </div>
    <div>
      <h3
        className={`font-medium text-sm sm:text-base ${
          isLargeScreen ? "lg:text-lg" : ""
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-xs sm:text-sm ${
          isLargeScreen ? "lg:text-base" : ""
        } text-muted-foreground`}
      >
        {description}
      </p>
    </div>
  </div>
);
