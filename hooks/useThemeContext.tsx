import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    secondary: string;
    danger: string;
    success: string;
    warning: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('system');

  // Determine if we should use dark mode
  const isDark = theme === 'system' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';

  const colors = {
    background: isDark ? '#111827' : '#FFFFFF',
    surface: isDark ? '#1F2937' : '#F9FAFB',
    text: isDark ? '#F9FAFB' : '#111827',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    border: isDark ? '#374151' : '#E5E7EB',
    primary: '#3B82F6',
    secondary: isDark ? '#374151' : '#F3F4F6',
    danger: isDark ? '#DC2626' : '#EF4444',
    success: isDark ? '#059669' : '#10B981',
    warning: isDark ? '#D97706' : '#F59E0B',
  };

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'system') {
        return systemColorScheme === 'dark' ? 'light' : 'dark';
      }
      return current === 'light' ? 'dark' : 'light';
    });
  };

  const value: ThemeContextType = {
    theme,
    isDark,
    setTheme,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
