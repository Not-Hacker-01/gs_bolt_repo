import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function ThemeToggleButton() {
  const { isDark, toggleTheme, colors } = useThemeContext();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      {isDark ? (
        <Sun size={20} color={colors.text} />
      ) : (
        <Moon size={20} color={colors.text} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
