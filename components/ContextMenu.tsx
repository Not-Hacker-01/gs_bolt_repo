import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal,
  Dimensions
} from 'react-native';
import { Share2, Info, Download, Trash2 } from 'lucide-react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

interface ContextMenuProps {
  visible: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onShare?: () => void;
  onDetails?: () => void;
  onDownload?: () => void;
  onDelete?: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  onPress: () => void;
  isDestructive?: boolean;
}

export default function ContextMenu({ 
  visible, 
  onClose, 
  position, 
  onShare, 
  onDetails, 
  onDownload, 
  onDelete 
}: ContextMenuProps) {
  const { colors } = useThemeContext();
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const menuItems: MenuItem[] = [
    {
      id: 'share',
      label: 'Share',
      icon: Share2,
      onPress: () => {
        onShare?.();
        onClose();
      }
    },
    {
      id: 'details',
      label: 'Details',
      icon: Info,
      onPress: () => {
        onDetails?.();
        onClose();
      }
    },
    {
      id: 'download',
      label: 'Download',
      icon: Download,
      onPress: () => {
        onDownload?.();
        onClose();
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      onPress: () => {
        onDelete?.();
        onClose();
      }
    }
  ];

  // Calculate position to ensure menu stays within screen bounds
  const menuWidth = 180;
  const menuHeight = 200;
  const padding = 16;
  const gap = 32; // Gap between menu and button
  
  // Position menu to the LEFT of the button with consistent gap
  let x = position.x - menuWidth - gap;
  let y = position.y;
  
  // Adjust horizontal position if menu would go off screen to the left
  if (x < padding) {
    x = padding; // Keep it within left bounds
  }
  
  // Adjust vertical position if menu would go off screen
  if (y + menuHeight > screenHeight - padding) {
    y = screenHeight - menuHeight - padding;
  }
  
  // Ensure y is not negative
  if (y < padding) {
    y = padding;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View 
          style={[
            styles.menu, 
            { 
              backgroundColor: '#FFFFFF',
              left: x,
              top: y,
            }
          ]}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <item.icon 
                size={16} 
                color="#6B7280"
              />
              <Text 
                style={styles.menuItemText}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 180,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
});
