
import React from 'react';
import { Container } from '@/components/Layout';
import { SkillsWidget } from '@/components/widgets/SkillsWidget';

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillsWidget />
        </div>
      </Container>
    </section>
  );
};
