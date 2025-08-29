import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, useWindowDimensions } from 'react-native';
import { Plus, Trash2, Download, Settings, Heart } from 'lucide-react-native';
import ThemeButton from '@/components/ThemeButton';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { isDark, colors } = useThemeContext();

  const handleButtonPress = (buttonName: string) => {
    console.log(`${buttonName} button pressed`);
  };

  const handleLoadingPress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const containerStyle = {
    backgroundColor: colors.background,
  };

  const sectionStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  };

  const textStyle = {
    color: colors.text,
  };

  const subtitleStyle = {
    color: colors.textSecondary,
  };

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <ScrollView style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, textStyle]}>Theme Button Demo</Text>
          <Text style={[styles.pageSubtitle, subtitleStyle]}>
            Explore different button variants and themes
          </Text>
        </View>

        {/* Button Variants */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Button Variants</Text>
          
          <View style={styles.buttonGrid}>
            <ThemeButton
              title="Primary Button"
              onPress={() => handleButtonPress('Primary')}
              variant="primary"
            />
            
            <ThemeButton
              title="Secondary Button"
              onPress={() => handleButtonPress('Secondary')}
              variant="secondary"
            />
            
            <ThemeButton
              title="Outline Button"
              onPress={() => handleButtonPress('Outline')}
              variant="outline"
            />
            
            <ThemeButton
              title="Ghost Button"
              onPress={() => handleButtonPress('Ghost')}
              variant="ghost"
            />
            
            <ThemeButton
              title="Danger Button"
              onPress={() => handleButtonPress('Danger')}
              variant="danger"
            />
          </View>
        </View>

        {/* Button Sizes */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Button Sizes</Text>
          
          <View style={styles.buttonRow}>
            <ThemeButton
              title="Small"
              onPress={() => handleButtonPress('Small')}
              size="small"
            />
            
            <ThemeButton
              title="Medium"
              onPress={() => handleButtonPress('Medium')}
              size="medium"
            />
            
            <ThemeButton
              title="Large"
              onPress={() => handleButtonPress('Large')}
              size="large"
            />
          </View>
        </View>

        {/* Buttons with Icons */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Buttons with Icons</Text>
          
          <View style={styles.buttonGrid}>
            <ThemeButton
              title="Create New"
              onPress={() => handleButtonPress('Create')}
              icon={<Plus size={16} color={isDark ? '#FFFFFF' : '#3B82F6'} />}
              iconPosition="left"
            />
            
            <ThemeButton
              title="Download"
              onPress={() => handleButtonPress('Download')}
              icon={<Download size={16} color={isDark ? '#FFFFFF' : '#3B82F6'} />}
              iconPosition="right"
            />
            
            <ThemeButton
              title="Settings"
              onPress={() => handleButtonPress('Settings')}
              icon={<Settings size={16} color={isDark ? '#FFFFFF' : '#3B82F6'} />}
              iconPosition="left"
            />
            
            <ThemeButton
              title="Delete"
              onPress={() => handleButtonPress('Delete')}
              icon={<Trash2 size={16} color={isDark ? '#FFFFFF' : '#EF4444'} />}
              iconPosition="left"
              variant="danger"
            />
            
            <ThemeButton
              title="Like"
              onPress={() => handleButtonPress('Like')}
              icon={<Heart size={16} color={isDark ? '#FFFFFF' : '#EF4444'} />}
              iconPosition="right"
              variant="outline"
            />
          </View>
        </View>

        {/* Loading and Disabled States */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Loading & Disabled States</Text>
          
          <View style={styles.buttonGrid}>
            <ThemeButton
              title="Loading Button"
              onPress={handleLoadingPress}
              loading={loading}
            />
            
            <ThemeButton
              title="Disabled Button"
              onPress={() => handleButtonPress('Disabled')}
              disabled={true}
            />
            
            <ThemeButton
              title="Disabled Outline"
              onPress={() => handleButtonPress('Disabled Outline')}
              variant="outline"
              disabled={true}
            />
          </View>
        </View>

        {/* Full Width Buttons */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Full Width Buttons</Text>
          
          <View style={styles.fullWidthContainer}>
            <ThemeButton
              title="Full Width Primary"
              onPress={() => handleButtonPress('Full Width Primary')}
              fullWidth={true}
              style={{ marginBottom: 12 }}
            />
            
            <ThemeButton
              title="Full Width Secondary"
              onPress={() => handleButtonPress('Full Width Secondary')}
              variant="secondary"
              fullWidth={true}
              style={{ marginBottom: 12 }}
            />
            
            <ThemeButton
              title="Full Width Outline"
              onPress={() => handleButtonPress('Full Width Outline')}
              variant="outline"
              fullWidth={true}
            />
          </View>
        </View>

        {/* Theme Information */}
        <View style={[styles.section, sectionStyle]}>
          <Text style={[styles.sectionTitle, textStyle]}>Current Theme</Text>
          <Text style={[styles.themeInfo, subtitleStyle]}>
            Current theme: {isDark ? 'Dark' : 'Light'}
          </Text>
          <Text style={[styles.themeInfo, subtitleStyle]}>
            The buttons automatically adapt to your system theme preference.
          </Text>
        </View>
      </ScrollView>
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
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonGrid: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  fullWidthContainer: {
    width: '100%',
  },
  themeInfo: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});
