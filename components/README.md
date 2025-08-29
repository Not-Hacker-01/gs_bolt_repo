# Theme Button Component

A comprehensive, theme-aware button component for React Native/Expo applications that automatically adapts to light and dark themes.

## Features

- 🌓 **Automatic Theme Detection**: Automatically adapts to system light/dark theme
- 🎨 **Multiple Variants**: Primary, secondary, outline, ghost, and danger styles
- 📏 **Flexible Sizing**: Small, medium, and large button sizes
- 🔄 **Loading States**: Built-in loading indicator with spinner
- 🚫 **Disabled States**: Proper disabled styling and behavior
- 🎯 **Icon Support**: Left or right positioned icons
- 📱 **Responsive**: Full width option for mobile layouts
- 🎨 **Customizable**: Accepts custom styles and text styles

## Usage

### Basic Usage

```tsx
import ThemeButton from '@/components/ThemeButton';

<ThemeButton
  title="Click Me"
  onPress={() => console.log('Button pressed!')}
/>
```

### With Different Variants

```tsx
// Primary button (default)
<ThemeButton
  title="Primary Action"
  onPress={handlePrimaryAction}
  variant="primary"
/>

// Secondary button
<ThemeButton
  title="Secondary Action"
  onPress={handleSecondaryAction}
  variant="secondary"
/>

// Outline button
<ThemeButton
  title="Outline Action"
  onPress={handleOutlineAction}
  variant="outline"
/>

// Ghost button
<ThemeButton
  title="Ghost Action"
  onPress={handleGhostAction}
  variant="ghost"
/>

// Danger button
<ThemeButton
  title="Delete"
  onPress={handleDelete}
  variant="danger"
/>
```

### Different Sizes

```tsx
<ThemeButton title="Small" size="small" onPress={handlePress} />
<ThemeButton title="Medium" size="medium" onPress={handlePress} />
<ThemeButton title="Large" size="large" onPress={handlePress} />
```

### With Icons

```tsx
import { Plus, Download } from 'lucide-react-native';

// Icon on the left
<ThemeButton
  title="Create New"
  onPress={handleCreate}
  icon={<Plus size={16} color="#FFFFFF" />}
  iconPosition="left"
/>

// Icon on the right
<ThemeButton
  title="Download"
  onPress={handleDownload}
  icon={<Download size={16} color="#FFFFFF" />}
  iconPosition="right"
/>
```

### Loading and Disabled States

```tsx
// Loading state
<ThemeButton
  title="Processing..."
  onPress={handleAction}
  loading={isLoading}
/>

// Disabled state
<ThemeButton
  title="Disabled Button"
  onPress={handleAction}
  disabled={true}
/>
```

### Full Width Buttons

```tsx
<ThemeButton
  title="Full Width Button"
  onPress={handleAction}
  fullWidth={true}
/>
```

### Custom Styling

```tsx
<ThemeButton
  title="Custom Button"
  onPress={handleAction}
  style={{ marginTop: 20, shadowColor: '#000' }}
  textStyle={{ fontWeight: 'bold' }}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Button text |
| `onPress` | `() => void` | **Required** | Press handler |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Whether button is disabled |
| `loading` | `boolean` | `false` | Show loading spinner |
| `icon` | `React.ReactNode` | `undefined` | Icon component |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon position |
| `style` | `ViewStyle` | `undefined` | Custom button styles |
| `textStyle` | `TextStyle` | `undefined` | Custom text styles |
| `fullWidth` | `boolean` | `false` | Make button full width |

## Theme Colors

The component automatically adapts to light and dark themes with the following color schemes:

### Light Theme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#F3F4F6)
- **Outline**: Blue border with transparent background
- **Ghost**: Transparent with gray text
- **Danger**: Red (#EF4444)

### Dark Theme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Dark gray (#374151)
- **Outline**: Light blue border with transparent background
- **Ghost**: Transparent with light gray text
- **Danger**: Dark red (#DC2626)

## useTheme Hook

The component also exports a `useTheme` hook for accessing theme information in other components:

```tsx
import { useTheme } from '@/components/ThemeButton';

function MyComponent() {
  const { isDark, colors } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>
        Current theme: {isDark ? 'Dark' : 'Light'}
      </Text>
    </View>
  );
}
```

## Demo

Check out the demo page at `/button-demo` to see all button variants in action and test theme switching.
