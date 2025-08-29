import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={[styles.pageHeader, isMobile && styles.pageHeaderMobile]}>
          <View style={[styles.headerText, isMobile && styles.headerTextMobile]}>
            <Text style={[styles.pageTitle, { color: colors.text }, isMobile && styles.pageTitleMobile]}>Dashboard</Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSecondary }, isMobile && styles.pageSubtitleMobile]}>
              Welcome to your dashboard. Here you can view an overview of your account and manage your resources.
            </Text>
          </View>
        </View>

        <View style={styles.dashboardContent}>
          <Text style={[styles.dashboardText, { color: colors.text }]}>
            Dashboard content will be displayed here. This is a placeholder for the main dashboard view.
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pageHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  headerTextMobile: {
    marginBottom: 16,
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
    maxWidth: 400,
  },
  pageSubtitleMobile: {
    fontSize: 13,
    maxWidth: '100%',
  },
  createButtonMobile: {
    justifyContent: 'center',
    paddingVertical: 12,
  },
  dashboardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dashboardText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});