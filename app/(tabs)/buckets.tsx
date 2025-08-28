import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { Plus } from 'lucide-react-native';
import Header from '@/components/Header';
import BucketsTable from '@/components/BucketsTable';
import CreateBucketModal from '@/components/CreateBucketModal';

export default function Buckets() {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleCreateBucket = (name: string) => {
    console.log('Creating bucket:', name);
    // Here you would typically call an API to create the bucket
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={[styles.pageHeader, isMobile && styles.pageHeaderMobile]}>
          <View style={[styles.headerText, isMobile && styles.headerTextMobile]}>
            <Text style={[styles.pageTitle, isMobile && styles.pageTitleMobile]}>Buckets</Text>
            <Text style={[styles.pageSubtitle, isMobile && styles.pageSubtitleMobile]}>
              Buckets are containers for your files. You can create as many buckets as you need.
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.createButton, isMobile && styles.createButtonMobile]}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={16} color="#FFFFFF" />
            <Text style={styles.createButtonText}>
              {isMobile ? 'Create' : 'Create New Bucket'}
            </Text>
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
  contentMobile: {
    padding: 16,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  pageHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  headerTextMobile: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  pageTitleMobile: {
    fontSize: 24,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    maxWidth: 400,
  },
  pageSubtitleMobile: {
    fontSize: 13,
    maxWidth: '100%',
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
  createButtonMobile: {
    justifyContent: 'center',
    paddingVertical: 12,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});