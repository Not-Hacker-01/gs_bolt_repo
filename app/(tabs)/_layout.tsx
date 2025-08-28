import { Tabs } from 'expo-router';
import { View } from 'react-native';
import Sidebar from '@/components/Sidebar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Sidebar />
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' },
          }}>
          <Tabs.Screen name="index" />
          <Tabs.Screen name="buckets" />
          <Tabs.Screen name="access-keys" />
          <Tabs.Screen name="usage-billing" />
          <Tabs.Screen name="settings" />
          <Tabs.Screen name="help" />
        </Tabs>
      </View>
    </View>
  );
}