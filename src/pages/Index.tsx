
import React from 'react';
import { Layout, Container } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { ClockWidget } from '@/components/widgets/ClockWidget';
import { SkillsWidget } from '@/components/widgets/SkillsWidget';
import { ResumeWidget } from '@/components/widgets/ResumeWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { ChatWidget } from '@/components/widgets/ChatWidget';
import { SportsWidget } from '@/components/widgets/SportsWidget';

const Index = () => {
  return (
    <Layout>
      <Header />
      <Hero />
      
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
            <SkillsWidget />
            <ResumeWidget />
            <StockWidget />
            <ChatWidget />
          </div>
        </Container>
      </section>
      
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
      
      <footer className="py-10 border-t border-border">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="font-medium">© 2023 John Doe</div>
              <div className="text-sm text-muted-foreground">Frontend Developer</div>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Dribbble</a>
            </div>
          </div>
        </Container>
      </footer>
    </Layout>
  );
};

export default Index;
