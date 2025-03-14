
import React from 'react';
import { Container } from '@/components/Layout';
import { SkillsWidget } from '@/components/widgets/SkillsWidget';

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-20">
      <Container>
        <div className="mb-12">
          <h2 className="section-heading">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A showcase of my technical skills and proficiencies across various technologies and frameworks.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkillsWidget />
        </div>
      </Container>
    </section>
  );
};
