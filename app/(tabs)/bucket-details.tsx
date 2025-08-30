import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  useWindowDimensions,
  ScrollView
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeContext } from '@/hooks/useThemeContext';

interface DetailRow {
  key: string;
  value: string;
}

export default function BucketDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  // Get bucket data from params or use default for demo
  const bucketName = params.bucketName as string || 'MyBucket';
  const bucketData = {
    id: params.id as string || '1',
    name: bucketName,
    createdOn: params.createdOn as string || '2024-01-16',
    files: parseInt(params.files as string) || 1,
    size: params.size as string || '5 GB',
    lastModified: params.lastModified as string || '2024-01-16',
    access: params.access as string || 'Private',
  };

  const detailRows: DetailRow[] = [
    { key: 'Name', value: bucketData.name },
    { key: 'Objects', value: bucketData.files.toString() },
    { key: 'Storage', value: bucketData.size },
    { key: 'Locations', value: 'Global' },
    { key: 'Versioning', value: 'Disabled' },
    { key: 'Date Created', value: bucketData.createdOn },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleBreadcrumbPress = (path: string) => {
    if (path === 'Buckets') {
      router.push('/buckets');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Header */}
        <View style={[styles.header, isMobile && styles.headerMobile]}>
          <TouchableOpacity 
            onPress={handleBackPress}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft size={20} color={colors.text} />
            <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }, isMobile && styles.titleMobile]}>
            Bucket Details
          </Text>
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity 
            onPress={() => handleBreadcrumbPress('Buckets')}
            style={styles.breadcrumbItem}
          >
            <Text style={[styles.breadcrumbText, { color: colors.primary }]}>Buckets</Text>
          </TouchableOpacity>
          <ChevronRight size={16} color={colors.textSecondary} style={styles.breadcrumbSeparator} />
          <Text style={[styles.breadcrumbText, { color: colors.textSecondary }]}>{bucketData.name}</Text>
          <ChevronRight size={16} color={colors.textSecondary} style={styles.breadcrumbSeparator} />
          <Text style={[styles.breadcrumbText, { color: colors.text }]}>Bucket Details</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.detailsCard, { borderColor: colors.border }]}>
            {detailRows.map((row, index) => (
              <View key={row.key}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailKey, { color: colors.text }]}>{row.key}</Text>
                  <Text style={[styles.detailValue, { color: colors.textSecondary }]}>{row.value}</Text>
                </View>
                                  {index < detailRows.length - 1 && (
                    <View style={[styles.separator, { backgroundColor: colors.border }]} />
                  )}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  contentMobile: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  headerMobile: {
    paddingVertical: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  titleMobile: {
    fontSize: 20,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  breadcrumbItem: {
    paddingVertical: 2,
  },
  breadcrumbText: {
    fontSize: 14,
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    marginHorizontal: 8,
  },
  scrollContent: {
    flex: 1,
  },
  detailsCard: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  detailKey: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    paddingLeft: 16,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
    paddingRight: 16,
    textAlign: 'left',
  },
  separator: {
    height: 1,
    marginHorizontal: 0,
  },
});
