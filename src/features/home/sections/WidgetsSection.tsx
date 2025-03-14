
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
    <section id="widgets" className="py-6 pt-16 md:pt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First row - 3 small widgets */}
          <WeatherWidget />
          <ClockWidget />
          <ResumeWidget />
          
          {/* Full width AI Assistant */}
          <div className="md:col-span-3">
            <ChatWidget />
          </div>
          
          {/* Last row - widgets */}
          <DiscordWidget />
          <SportsWidget />
          <StockWidget />
        </div>
      </Container>
    </section>
  );
};
