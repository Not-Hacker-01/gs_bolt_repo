import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { Plus } from 'lucide-react-native';
import BucketsTable from '@/components/BucketsTable';
import CreateBucketModal from '@/components/CreateBucketModal';
import ThemeButton from '@/components/ThemeButton';
import { useThemeContext } from '@/hooks/useThemeContext';

export default function Buckets() {
  const [modalVisible, setModalVisible] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  const handleCreateBucket = (name: string) => {
    console.log('Creating bucket:', name);
    // Here you would typically call an API to create the bucket
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        <View style={[styles.pageHeader, isMobile && styles.pageHeaderMobile]}>
          <View style={[styles.headerText, isMobile && styles.headerTextMobile]}>
            <Text style={[styles.pageTitle, { color: colors.text }, isMobile && styles.pageTitleMobile]}>Buckets</Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSecondary }, isMobile && styles.pageSubtitleMobile]}>
              Buckets are containers for your files. You can create as many buckets as you need.
            </Text>
          </View>
          <ThemeButton
            title={isMobile ? 'Create' : 'Create New Bucket'}
            onPress={() => setModalVisible(true)}
            icon={<Plus size={16} color="#FFFFFF" />}
            iconPosition="left"
            style={isMobile ? styles.createButtonMobile : undefined}
          />
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
  },
  content: {
    flex: 1,
    padding: 24,
    minHeight: 0,
  },
  contentMobile: {
    padding: 16,
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    minHeight: 80,
  },
  pageHeaderMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginBottom: 20,
    minHeight: 100,
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
  createButtonMobile: {
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tableWrapper: {
    flex: 1,
    minHeight: 0,
  },
});