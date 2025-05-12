import React from "react";
import { SkillsSection } from "./sections/SkillsSection";
import { WidgetsSection } from "./sections/WidgetsSection";
import { Footer } from "./sections/Footer";
import { Projects } from "@/components/Projects";

export const HomePage = () => {
  return (
    <>
      <WidgetsSection />
      <Projects />
      <SkillsSection />
      <Footer />
    </>
  );
};
