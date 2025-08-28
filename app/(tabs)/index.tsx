import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Plus } from 'lucide-react-native';
import Header from '@/components/Header';
import BucketsTable from '@/components/BucketsTable';
import CreateBucketModal from '@/components/CreateBucketModal';

export default function Dashboard() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateBucket = (name: string) => {
    console.log('Creating bucket:', name);
    // Here you would typically call an API to create the bucket
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={styles.content}>
        <View style={styles.pageHeader}>
          <View>
            <Text style={styles.pageTitle}>Buckets</Text>
            <Text style={styles.pageSubtitle}>
              Buckets are containers for your files. You can create as many buckets as you need.
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Create New Bucket</Text>
          </TouchableOpacity>
        </View>

        <BucketsTable />
      </View>

      <CreateBucketModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreateBucket={handleCreateBucket}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    maxWidth: 400,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});