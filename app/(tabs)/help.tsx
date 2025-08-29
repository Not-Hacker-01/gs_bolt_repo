import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function Help() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, isMobile && styles.pageTitleMobile]}>Help</Text>
          <Text style={[styles.pageSubtitle, isMobile && styles.pageSubtitleMobile]}>
            Find answers to common questions and get support.
          </Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, isMobile && styles.emptyStateTextMobile]}>
            Help documentation coming soon
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  contentMobile: {
    padding: 16,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  pageTitleMobile: {
    fontSize: 24,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  pageSubtitleMobile: {
    fontSize: 13,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyStateTextMobile: {
    fontSize: 14,
    textAlign: 'center',
  },
});