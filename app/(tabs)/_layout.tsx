import { Tabs } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768 && width < 1024;
  const isMobile = width < 768;

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Header />
      <View style={{ flex: 1, flexDirection: isDesktop ? 'row' : 'column' }}>
        {isDesktop && <Sidebar />}
        <View style={{ flex: 1 }}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: { 
                display: isDesktop ? 'none' : 'flex',
                height: isMobile ? 60 : 70,
                paddingBottom: isMobile ? 8 : 12,
                paddingTop: 8,
              },
              tabBarLabelStyle: {
                fontSize: isMobile ? 10 : 12,
              },
              tabBarIconStyle: {
                marginBottom: isMobile ? 2 : 4,
              },
            }}>
          <Tabs.Screen 
            name="index" 
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ color, size }) => {
                const { Home } = require('lucide-react-native');
                return <Home size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
          <Tabs.Screen 
            name="buckets" 
            options={{
              title: 'Buckets',
              tabBarIcon: ({ color, size }) => {
                const { FolderOpen } = require('lucide-react-native');
                return <FolderOpen size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
          <Tabs.Screen 
            name="access-keys" 
            options={{
              title: 'Keys',
              tabBarIcon: ({ color, size }) => {
                const { Key } = require('lucide-react-native');
                return <Key size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
          <Tabs.Screen 
            name="usage-billing" 
            options={{
              title: 'Billing',
              tabBarIcon: ({ color, size }) => {
                const { BarChart3 } = require('lucide-react-native');
                return <BarChart3 size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
          <Tabs.Screen 
            name="settings" 
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => {
                const { Settings } = require('lucide-react-native');
                return <Settings size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
          <Tabs.Screen 
            name="help" 
            options={{
              title: 'Help',
              tabBarIcon: ({ color, size }) => {
                const { HelpCircle } = require('lucide-react-native');
                return <HelpCircle size={isMobile ? 20 : 24} color={color} />;
              },
            }}
          />
        </Tabs>
        </View>
      </View>
    </View>
  );
}