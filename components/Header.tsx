import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import ThemeToggleButton from './ThemeToggleButton';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function Header() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  return (
    <View style={[
      styles.header, 
      { backgroundColor: colors.background, borderBottomColor: colors.border },
      isMobile && styles.headerMobile
    ]}>
      <View style={styles.headerLeft}>
        <Text style={[
          styles.brandText, 
          { color: colors.text },
          isMobile && styles.brandTextMobile
        ]}>myflapi</Text>
      </View>
      <View style={styles.headerRight}>
        <ThemeToggleButton />
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>0</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerMobile: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerLeft: {
    flex: 1,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
  },
  brandTextMobile: {
    fontSize: 16,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationBadge: {
    backgroundColor: '#6B7280',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  avatar: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});