
import React from 'react';
import { Container } from '@/components/Layout';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-heading">About Me</h2>
          <p className="text-lg mb-6">
            I'm a passionate Frontend Developer with a keen eye for design and a love for creating 
            seamless, intuitive user experiences. With expertise in modern JavaScript frameworks 
            and a strong foundation in UI/UX principles, I bridge the gap between design and functionality.
          </p>
          <p className="text-lg mb-6">
            My approach combines technical precision with creative problem-solving, resulting in 
            digital products that are both beautiful and functional. I'm constantly exploring new 
            technologies and techniques to enhance my craft.
          </p>
          <p className="text-lg">
            When I'm not coding, you can find me exploring design trends, contributing to open-source 
            projects, or hiking in the great outdoors.
          </p>
        </div>
      </Container>
    </section>
  );
};
