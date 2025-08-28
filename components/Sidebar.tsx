import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Chrome as Home, FolderOpen, Key, ChartBar as BarChart3, Settings, CircleHelp as HelpCircle } from 'lucide-react-native';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  route: string;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      route: '/',
    },
    {
      id: 'buckets',
      label: 'Buckets',
      icon: FolderOpen,
      route: '/buckets',
    },
    {
      id: 'access-keys',
      label: 'Access Keys',
      icon: Key,
      route: '/access-keys',
    },
    {
      id: 'usage-billing',
      label: 'Usage & Billing',
      icon: BarChart3,
      route: '/usage-billing',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      route: '/settings',
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      route: '/help',
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/' || pathname === '/(tabs)';
    return pathname.includes(route);
  };

  // Only show sidebar on desktop
  if (width < 1024) {
    return null;
  }

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.brandText}>myflapi</Text>
      </View>
      
      <View style={styles.nav}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.route);
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                active && styles.navItemActive,
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <IconComponent 
                size={20} 
                color={active ? '#3B82F6' : '#6B7280'} 
              />
              <Text style={[
                styles.navText,
                active && styles.navTextActive,
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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