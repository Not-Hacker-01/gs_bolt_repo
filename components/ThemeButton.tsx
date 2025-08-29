import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

export interface ThemeButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function ThemeButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}: ThemeButtonProps) {
  const { isDark } = useThemeContext();

  // Theme colors
  const themeColors = {
    light: {
      primary: {
        background: '#3B82F6',
        text: '#FFFFFF',
        border: '#3B82F6',
        disabled: '#9CA3AF',
      },
      secondary: {
        background: '#F3F4F6',
        text: '#374151',
        border: '#D1D5DB',
        disabled: '#E5E7EB',
      },
      outline: {
        background: 'transparent',
        text: '#3B82F6',
        border: '#3B82F6',
        disabled: '#9CA3AF',
      },
      ghost: {
        background: 'transparent',
        text: '#6B7280',
        border: 'transparent',
        disabled: '#D1D5DB',
      },
      danger: {
        background: '#EF4444',
        text: '#FFFFFF',
        border: '#EF4444',
        disabled: '#FCA5A5',
      },
    },
    dark: {
      primary: {
        background: '#3B82F6',
        text: '#FFFFFF',
        border: '#3B82F6',
        disabled: '#4B5563',
      },
      secondary: {
        background: '#374151',
        text: '#F9FAFB',
        border: '#4B5563',
        disabled: '#1F2937',
      },
      outline: {
        background: 'transparent',
        text: '#60A5FA',
        border: '#60A5FA',
        disabled: '#4B5563',
      },
      ghost: {
        background: 'transparent',
        text: '#9CA3AF',
        border: 'transparent',
        disabled: '#374151',
      },
      danger: {
        background: '#DC2626',
        text: '#FFFFFF',
        border: '#DC2626',
        disabled: '#7F1D1D',
      },
    },
  };

  const colors = themeColors[isDark ? 'dark' : 'light'][variant];

  // Size configurations
  const sizeConfig = {
    small: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      fontSize: 12,
      borderRadius: 6,
      iconSize: 14,
    },
    medium: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 14,
      borderRadius: 8,
      iconSize: 16,
    },
    large: {
      paddingVertical: 14,
      paddingHorizontal: 20,
      fontSize: 16,
      borderRadius: 10,
      iconSize: 18,
    },
  };

  const config = sizeConfig[size];

  const buttonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: config.paddingVertical,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: config.borderRadius,
    backgroundColor: disabled ? colors.disabled : colors.background,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: disabled ? colors.disabled : colors.border,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  const textStyleObj: TextStyle = {
    fontSize: config.fontSize,
    fontWeight: '500',
    color: disabled ? (isDark ? '#6B7280' : '#9CA3AF') : colors.text,
    textAlign: 'center',
    ...textStyle,
  };

  const iconStyle = {
    marginLeft: iconPosition === 'right' ? 8 : 0,
    marginRight: iconPosition === 'left' ? 8 : 0,
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ActivityIndicator 
            size="small" 
            color={colors.text} 
            style={{ marginRight: 8 }}
          />
          <Text style={textStyleObj}>{title}</Text>
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <Text style={iconStyle}>{icon}</Text>
        )}
        <Text style={textStyleObj}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <Text style={iconStyle}>{icon}</Text>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

// Additional theme utilities
export const useTheme = () => {
  const { isDark, colors } = useThemeContext();
  return { isDark, colors };
};
