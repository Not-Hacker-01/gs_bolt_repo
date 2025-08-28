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

interface CreateBucketModalProps {
  visible: boolean;
  onClose: () => void;
  onCreateBucket: (name: string) => void;
}

export default function CreateBucketModal({ visible, onClose, onCreateBucket }: CreateBucketModalProps) {
  const [bucketName, setBucketName] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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
        <View style={[styles.modal, isMobile && styles.modalMobile]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, isMobile && styles.modalTitleMobile]}>
              Create New Bucket
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={[styles.modalContent, isMobile && styles.modalContentMobile]}>
            <Text style={styles.label}>Bucket Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter bucket name"
              value={bucketName}
              onChangeText={setBucketName}
              autoFocus
            />
          </View>
          
          <View style={[styles.modalFooter, isMobile && styles.modalFooterMobile]}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.createButton, !bucketName.trim() && styles.createButtonDisabled]} 
              onPress={handleCreate}
              disabled={!bucketName.trim()}
            >
              <Text style={styles.createButtonText}>Create Bucket</Text>
            </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
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
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
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
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
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
    borderTopColor: '#E5E7EB',
  },
  modalFooterMobile: {
    padding: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  createButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  createButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});