
import React from 'react';
import { Container } from '@/components/Layout';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { ClockWidget } from '@/components/widgets/ClockWidget';
import { SkillsWidget } from '@/components/widgets/SkillsWidget';
import { ResumeWidget } from '@/components/widgets/ResumeWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { ChatWidget } from '@/components/widgets/ChatWidget';
import { SportsWidget } from '@/components/widgets/SportsWidget';
import { DiscordWidget } from '@/components/widgets/DiscordWidget';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { WidgetsSection } from './sections/WidgetsSection';
import { Footer } from './sections/Footer';

export const HomePage = () => {
  return (
    <>
      <SkillsSection />
      <WidgetsSection />
      <AboutSection />
      <Footer />
    </>
  );
};
