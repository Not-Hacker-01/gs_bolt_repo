import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

export default function Header() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={[styles.header, isMobile && styles.headerMobile]}>
      <View style={styles.headerLeft}>
        <Text style={[styles.brandText, isMobile && styles.brandTextMobile]}>myflapi</Text>
      </View>
      <View style={styles.headerRight}>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    color: '#1F2937',
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