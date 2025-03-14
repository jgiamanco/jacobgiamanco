
import React from 'react';
import { SkillsSection } from './sections/SkillsSection';
import { WidgetsSection } from './sections/WidgetsSection';
import { Footer } from './sections/Footer';

export const HomePage = () => {
  return (
    <>
      <SkillsSection />
      <WidgetsSection />
      <Footer />
    </>
  );
};
