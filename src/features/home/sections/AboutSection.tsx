
import React from 'react';
import { Container } from '@/components/Layout';
import { Briefcase, Users, LineChart, Code, Bot, Award } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-secondary/50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image Column */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <img 
                  src="/lovable-uploads/d0591870-cc31-4b6d-be04-7e285801a66b.png" 
                  alt="Jacob Giamanco" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-md">
                <span className="font-medium">5+ Years Experience</span>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-medium mb-6 tracking-tight">About Me</h2>
            
            <p className="text-lg mb-8 leading-relaxed">
              Valued expert with 5+ years of experience driving significant improvements in technical product management, 
              frontend engineering, web development, and software design. Adept at prioritizing clear communication 
              and strong cross-team collaboration.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <SkillItem 
                icon={<Briefcase className="h-5 w-5" />} 
                title="Technical Product Management" 
                description="Managed and optimized content for over 60 products, resulting in significant cost savings."
              />
              
              <SkillItem 
                icon={<Code className="h-5 w-5" />} 
                title="Frontend Engineering" 
                description="Crafted intuitive web experiences using modern JavaScript frameworks and UI/UX principles."
              />
              
              <SkillItem 
                icon={<Bot className="h-5 w-5" />} 
                title="Automation Specialist" 
                description="Implemented automation scripts to streamline processes and improve efficiency."
              />
              
              <SkillItem 
                icon={<Users className="h-5 w-5" />} 
                title="Team Leadership" 
                description="Respected and influential team leader with a natural ability to exceed aggressive goals."
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

type SkillItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillItem = ({ icon, title, description }: SkillItemProps) => (
  <div className="flex gap-3 items-start">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-medium text-base">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);
