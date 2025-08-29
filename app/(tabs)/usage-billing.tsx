import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function UsageBilling() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.text }, isMobile && styles.pageTitleMobile]}>Usage & Billing</Text>
          <Text style={[styles.pageSubtitle, { color: colors.textSecondary }, isMobile && styles.pageSubtitleMobile]}>
            Monitor your usage statistics and manage billing information.
          </Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }, isMobile && styles.emptyStateTextMobile]}>
            Usage & Billing dashboard coming soon
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 4,
  },
  pageTitleMobile: {
    fontSize: 24,
  },
  pageSubtitle: {
    fontSize: 14,
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
  },
  emptyStateTextMobile: {
    fontSize: 14,
    textAlign: 'center',
  },
});