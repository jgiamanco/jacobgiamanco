
import React from 'react';
import { Hero } from '@/components/Hero';
import { ContactModal } from '@/components/ContactModal';
import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/features/home/HomePage';
import { useContactModal } from '@/hooks/useContactModal';

const Index = () => {
  const { isOpen, setIsOpen } = useContactModal();

  return (
    <MainLayout>
      <Hero />
      <HomePage />
      <ContactModal open={isOpen} onOpenChange={setIsOpen} />
    </MainLayout>
  );
};

export default Index;
