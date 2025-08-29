import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Chrome as Home, FolderOpen, Key, ChartBar as BarChart3, Settings, CircleHelp as HelpCircle, Square } from 'lucide-react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

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
  const { colors } = useThemeContext();
  
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
    {
      id: 'button-demo',
      label: 'Button Demo',
      icon: Square,
      route: '/button-demo',
    },
  ];

  const handleNavigation = (route: string) => {
    if (route === '/') {
      router.push('/(tabs)');
    } else {
      router.push(route as any);
    }
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
    <View style={[styles.sidebar, { backgroundColor: colors.background }]}>
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
                { color: active ? colors.primary : colors.textSecondary },
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
    width: 320,
    paddingTop: 20,
  },
  nav: {
    paddingTop: 20,
    paddingHorizontal: 12,
    paddingLeft: 32,
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
  },
});