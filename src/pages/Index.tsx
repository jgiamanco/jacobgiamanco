
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Container } from '@/components/Layout';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ContactModal } from '@/components/ContactModal';
import { WeatherWidget } from '@/components/widgets/WeatherWidget';
import { ClockWidget } from '@/components/widgets/ClockWidget';
import { SkillsWidget } from '@/components/widgets/SkillsWidget';
import { ResumeWidget } from '@/components/widgets/ResumeWidget';
import { StockWidget } from '@/components/widgets/StockWidget';
import { ChatWidget } from '@/components/widgets/ChatWidget';
import { SportsWidget } from '@/components/widgets/SportsWidget';
import { DiscordWidget } from '@/components/widgets/DiscordWidget';
import { Toaster } from '@/components/ui/toaster';
import { useWidgetContext } from '@/contexts/WidgetContext';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import GridLayout from 'react-grid-layout';
import { useMediaQuery } from '@/hooks/use-media-query';

const Index = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { layouts, updateLayouts, resetLayouts } = useWidgetContext();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [gridWidth, setGridWidth] = useState(1200);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const contactButtons = document.querySelectorAll('#contact-button, #header-contact-button');
    contactButtons.forEach(button => {
      button.addEventListener('click', () => setContactModalOpen(true));
    });
    
    return () => {
      contactButtons.forEach(button => {
        button.removeEventListener('click', () => setContactModalOpen(true));
      });
    };
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (gridContainerRef.current) {
        setGridWidth(gridContainerRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial width calculation
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleLayoutChange = (newLayout: any) => {
    updateLayouts(newLayout);
  };

  const widgetComponents: Record<string, React.ReactNode> = {
    weather: <WeatherWidget id="weather" />,
    clock: <ClockWidget id="clock" />,
    sports: <SportsWidget id="sports" />,
    resume: <ResumeWidget id="resume" />,
    stocks: <StockWidget id="stocks" />,
    chat: <ChatWidget id="chat" />,
    discord: <DiscordWidget id="discord" />
    // Removed skills widget
  };

  return (
    <Layout className="bg-background text-foreground">
      <Header />
      <Hero />
      
      <section id="skills" className="py-20">
        <Container>
          <div className="mb-12">
            <h2 className="section-heading">Technical Skills</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A showcase of my technical skills and proficiencies across various technologies and frameworks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SkillsWidget id="skills-section" />
          </div>
        </Container>
      </section>
      
      <section id="widgets" className="py-20">
        <Container>
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="section-heading mb-2">Interactive Widgets</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Explore these interactive widgets showcasing both my technical skills and design sensibilities.
                Try dragging and rearranging them!
              </p>
            </div>
            <Button onClick={resetLayouts} variant="outline" size="sm" className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset Layout
            </Button>
          </div>
          
          <div className="mb-12" ref={gridContainerRef}>
            {!isMobile ? (
              <GridLayout
                className="layout"
                layout={layouts}
                cols={3}
                rowHeight={150}
                width={gridWidth}
                margin={[16, 16]}
                onLayoutChange={handleLayoutChange}
                draggableHandle=".react-grid-draghandle"
                isBounded={true}
                compactType="vertical"
                preventCollision={false}
                isResizable={false}
                isDraggable={true}
                containerPadding={[0, 0]}
              >
                {layouts.map((layout) => (
                  <div key={layout.i} className="widget-wrapper">
                    {widgetComponents[layout.i]}
                  </div>
                ))}
              </GridLayout>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {layouts.map((layout) => (
                  <div key={layout.i} className="widget-wrapper">
                    {widgetComponents[layout.i]}
                  </div>
                ))}
              </div>
            )}
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
              <div className="font-medium">© {new Date().getFullYear()} Jacob Giamanco</div>
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
      
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      <Toaster />
    </Layout>
  );
};

export default Index;
