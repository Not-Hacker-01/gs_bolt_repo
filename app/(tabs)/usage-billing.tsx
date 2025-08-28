import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import Header from '@/components/Header';

export default function UsageBilling() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, isMobile && styles.pageTitleMobile]}>Usage & Billing</Text>
          <Text style={[styles.pageSubtitle, isMobile && styles.pageSubtitleMobile]}>
            Monitor your usage statistics and manage billing information.
          </Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={[styles.emptyStateText, isMobile && styles.emptyStateTextMobile]}>
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