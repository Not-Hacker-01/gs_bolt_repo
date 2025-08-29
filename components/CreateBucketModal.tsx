import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import { X } from 'lucide-react-native';
import ThemeButton from './ThemeButton';
import { useThemeContext } from '@/hooks/useThemeContext';

interface CreateBucketModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateBucket: (name: string) => void;
}

export default function CreateBucketModal({ visible, onClose, onCreateBucket }: CreateBucketModalProps) {
  const [bucketName, setBucketName] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  const handleCreate = () => {
    if (bucketName.trim()) {
      onCreateBucket(bucketName.trim());
      setBucketName('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.surface }, isMobile && styles.modalMobile]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text }, isMobile && styles.modalTitleMobile]}>
              Create New Bucket
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.modalContent, isMobile && styles.modalContentMobile]}>
            <Text style={[styles.label, { color: colors.text }]}>Bucket Name</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Enter bucket name"
              placeholderTextColor={colors.textSecondary}
              value={bucketName}
              onChangeText={setBucketName}
              autoFocus
            />
          </View>
          
          <View style={[styles.modalFooter, { borderTopColor: colors.border }, isMobile && styles.modalFooterMobile]}>
            <ThemeButton
              title="Cancel"
              onPress={onClose}
              variant="secondary"
              style={{ flex: 1 }}
            />
            <ThemeButton
              title="Create Bucket"
              onPress={handleCreate}
              disabled={!bucketName.trim()}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modal: {
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  modalMobile: {
    marginHorizontal: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalTitleMobile: {
    fontSize: 16,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalContentMobile: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
  },
  modalFooterMobile: {
    padding: 16,
  },

});