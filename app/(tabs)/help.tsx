import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '@/components/Header';

export default function Help() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Help</Text>
          <Text style={styles.pageSubtitle}>
            Find answers to common questions and get support.
          </Text>
        </View>

        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Help documentation coming soon</Text>
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
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
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
});