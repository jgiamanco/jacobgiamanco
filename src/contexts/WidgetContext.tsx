
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';

export interface WidgetPosition {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
}

// Define default widget positions with consistent sizing constraints
const defaultWidgetLayouts: Layout[] = [
  { i: 'weather', x: 0, y: 0, w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  { i: 'clock', x: 1, y: 0, w: 1, h: 2, minW: 1, minH: 1, maxW: 1, maxH: 2 },
  { i: 'sports', x: 2, y: 0, w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  { i: 'resume', x: 1, y: 2, w: 1, h: 2, minW: 1, minH: 1, maxW: 1, maxH: 2 },
  { i: 'stocks', x: 0, y: 4, w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  { i: 'chat', x: 1, y: 4, w: 2, h: 2, minW: 2, minH: 2, maxW: 2, maxH: 2 },
  { i: 'discord', x: 0, y: 6, w: 1, h: 2, minW: 1, minH: 2, maxW: 1, maxH: 2 },
  // Removed the skills widget from the widget grid
];

interface WidgetContextType {
  layouts: Layout[];
  updateLayouts: (newLayouts: Layout[]) => void;
  resetLayouts: () => void;
}

const WidgetContext = createContext<WidgetContextType>({
  layouts: defaultWidgetLayouts,
  updateLayouts: () => {},
  resetLayouts: () => {},
});

export const useWidgetContext = () => useContext(WidgetContext);

export const WidgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layouts, setLayouts] = useState<Layout[]>(() => {
    // Try to load layouts from localStorage
    const savedLayouts = localStorage.getItem('widget-layouts');
    return savedLayouts ? JSON.parse(savedLayouts) : defaultWidgetLayouts;
  });

  useEffect(() => {
    // Save layouts to localStorage whenever they change
    localStorage.setItem('widget-layouts', JSON.stringify(layouts));
  }, [layouts]);

  const updateLayouts = (newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  };

  const resetLayouts = () => {
    setLayouts(defaultWidgetLayouts);
    localStorage.removeItem('widget-layouts');
  };

  return (
    <WidgetContext.Provider value={{ layouts, updateLayouts, resetLayouts }}>
      {children}
    </WidgetContext.Provider>
  );
};
