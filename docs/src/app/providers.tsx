'use client';

import { createContext, useContext } from 'react';
import { ThemeProvider } from 'next-themes';

import { usePrimaryColor } from '@/components/PrimaryColorPicker';
import * as HapplyThemeProvider from '@/components/ui/theme-provider';

interface PrimaryColorContextValue {
  color: string;
  setColor: (hex: string) => void;
}

const PrimaryColorContext = createContext<PrimaryColorContextValue>({
  color: '#7c3aed',
  setColor: () => {},
});

export function usePrimaryColorContext() {
  return useContext(PrimaryColorContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const { color, setPrimaryColor, mounted } = usePrimaryColor();

  return (
    <ThemeProvider attribute='class' disableTransitionOnChange>
      <PrimaryColorContext.Provider
        value={{ color, setColor: setPrimaryColor }}
      >
        <HapplyThemeProvider.Root
          primaryColor={mounted ? color : '#7c3aed'}
          scope='global'
          darkMode='class'
        >
          {children}
        </HapplyThemeProvider.Root>
      </PrimaryColorContext.Provider>
    </ThemeProvider>
  );
}
