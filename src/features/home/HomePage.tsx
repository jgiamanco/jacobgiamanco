
import React from 'react';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { WidgetsSection } from './sections/WidgetsSection';
import { Footer } from './sections/Footer';

export const HomePage = () => {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <WidgetsSection />
      <Footer />
    </>
  );
};
