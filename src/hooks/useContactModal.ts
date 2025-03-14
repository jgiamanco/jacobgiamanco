
import { useState, useEffect } from 'react';

export const useContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleContactButtonClick = () => setIsOpen(true);
    
    const contactButtons = document.querySelectorAll('#contact-button, #header-contact-button');
    
    contactButtons.forEach(button => {
      button.addEventListener('click', handleContactButtonClick);
    });
    
    return () => {
      contactButtons.forEach(button => {
        button.removeEventListener('click', handleContactButtonClick);
      });
    };
  }, []);

  return {
    isOpen,
    setIsOpen
  };
};
