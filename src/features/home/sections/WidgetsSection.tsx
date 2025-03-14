
import React from 'react';
import { Container } from '@/components/Layout';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { ClockWidget } from '@/components/widgets/ClockWidget';
import { ResumeWidget } from '@/components/widgets/ResumeWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { ChatWidget } from '@/components/widgets/ChatWidget';
import { SportsWidget } from '@/components/widgets/SportsWidget';
import { DiscordWidget } from '@/components/widgets/DiscordWidget';

export const WidgetsSection = () => {
  return (
    <section id="widgets" className="py-20">
      <Container>
        <div className="mb-12">
          <h2 className="section-heading">Interactive Widgets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore these interactive widgets showcasing both my technical skills and design sensibilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WeatherWidget />
          <ClockWidget />
          <SportsWidget />
          <ResumeWidget />
          <StockWidget />
          <ChatWidget />
          <DiscordWidget />
        </div>
      </Container>
    </section>
  );
};
