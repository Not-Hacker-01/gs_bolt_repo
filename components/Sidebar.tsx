import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Chrome as Home, FolderOpen, Key, ChartBar as BarChart3, Settings, CircleHelp as HelpCircle } from 'lucide-react-native';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home size={20} color={pathname === '/(tabs)' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)',
    },
    {
      id: 'buckets',
      label: 'Buckets',
      icon: <FolderOpen size={20} color={pathname === '/(tabs)/buckets' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)/buckets',
    },
    {
      id: 'access-keys',
      label: 'Access Keys',
      icon: <Key size={20} color={pathname === '/(tabs)/access-keys' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)/access-keys',
    },
    {
      id: 'usage-billing',
      label: 'Usage & Billing',
      icon: <BarChart3 size={20} color={pathname === '/(tabs)/usage-billing' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)/usage-billing',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} color={pathname === '/(tabs)/settings' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)/settings',
    },
    {
      id: 'help',
      label: 'Help',
      icon: <HelpCircle size={20} color={pathname === '/(tabs)/help' ? '#3B82F6' : '#6B7280'} />,
      route: '/(tabs)/help',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => {
    if (route === '/(tabs)') return pathname === '/(tabs)';
    return pathname === route;
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.brandText}>myflapi</Text>
      </View>
      
      <View style={styles.nav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              isActive(item.route) && styles.navItemActive,
            ]}
            onPress={() => handleNavigation(item.route)}
          >
            {item.icon}
            <Text style={[
              styles.navText,
              isActive(item.route) && styles.navTextActive,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  brandText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  nav: {
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#EFF6FF',
  },
  navText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  navTextActive: {
    color: '#3B82F6',
  },
});
</parameter>