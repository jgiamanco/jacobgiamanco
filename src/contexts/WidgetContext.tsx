
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

export type WidgetSize = 'small' | 'medium' | 'large';

export const WIDGET_SIZE_CONFIGS = {
  small: { w: 1, h: 2 },
  medium: { w: 2, h: 2 },
  large: { w: 3, h: 4 }
};

interface WidgetContextType {
  layouts: Layout[];
  updateLayouts: (newLayouts: Layout[]) => void;
  resetLayouts: () => void;
  updateWidgetSize: (widgetId: string, size: WidgetSize) => void;
}

// Define default widget positions with consistent sizing constraints
const defaultWidgetLayouts: Layout[] = [
  { i: 'weather', x: 0, y: 0, w: 1, h: 2, minW: 1, minH: 2, maxW: 3, maxH: 4 },
  { i: 'clock', x: 1, y: 0, w: 1, h: 2, minW: 1, minH: 1, maxW: 3, maxH: 4 },
  { i: 'sports', x: 2, y: 0, w: 1, h: 2, minW: 1, minH: 2, maxW: 3, maxH: 4 },
  { i: 'resume', x: 1, y: 2, w: 1, h: 2, minW: 1, minH: 1, maxW: 3, maxH: 4 },
  { i: 'stocks', x: 0, y: 4, w: 1, h: 2, minW: 1, minH: 2, maxW: 3, maxH: 4 },
  { i: 'chat', x: 1, y: 4, w: 2, h: 2, minW: 1, minH: 2, maxW: 3, maxH: 4 },
  { i: 'discord', x: 0, y: 6, w: 1, h: 2, minW: 1, minH: 2, maxW: 3, maxH: 4 },
  { i: 'skills', x: 1, y: 6, w: 2, h: 2, minW: 1, minH: 1, maxW: 3, maxH: 4 },
];

const WidgetContext = createContext<WidgetContextType>({
  layouts: defaultWidgetLayouts,
  updateLayouts: () => {},
  resetLayouts: () => {},
  updateWidgetSize: () => {},
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

  const updateWidgetSize = (widgetId: string, size: WidgetSize) => {
    const newLayouts = layouts.map(layout => {
      if (layout.i === widgetId) {
        const sizeConfig = WIDGET_SIZE_CONFIGS[size];
        return {
          ...layout,
          w: sizeConfig.w,
          h: sizeConfig.h
        };
      }
      return layout;
    });
    
    setLayouts(newLayouts);
  };

  return (
    <WidgetContext.Provider value={{ layouts, updateLayouts, resetLayouts, updateWidgetSize }}>
      {children}
    </WidgetContext.Provider>
  );
};
