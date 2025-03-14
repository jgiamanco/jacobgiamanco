
import React from 'react';
import { Hero } from '@/components/Hero';
import { ContactModal } from '@/components/ContactModal';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/features/home/HomePage';
import { useContactModal } from '@/hooks/useContactModal';

const Index = () => {
  const { isOpen, setIsOpen } = useContactModal();

  React.useEffect(() => {
    // Event listener for contact buttons
    const contactButtons = document.querySelectorAll('#contact-button, #header-contact-button');
    contactButtons.forEach(button => {
      button.addEventListener('click', () => setIsOpen(true));
    });

    return () => {
      contactButtons.forEach(button => {
        button.removeEventListener('click', () => setIsOpen(true));
      });
    };
  }, [setIsOpen]);

  return (
    <MainLayout>
      <Hero />
      <HomePage />
      <ContactModal open={isOpen} onOpenChange={setIsOpen} />
    </MainLayout>
  );
};

export default Index;
