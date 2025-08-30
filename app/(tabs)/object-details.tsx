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
import { ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeContext } from '@/hooks/useThemeContext';

interface DetailRow {
  key: string;
  value: string;
}

export default function ObjectDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  // Get object data from params or use default for demo
  const fileName = params.fileName as string || 'Document.pdf';
  const bucketName = params.bucketName as string || 'MyBucket';
  const objectData = {
    id: params.id as string || '1',
    name: fileName,
    size: params.size as string || '256 MB',
    type: params.type as string || 'Document',
    uploadedBy: params.uploadedBy as string || 'Sophia Carter',
    createdDate: params.createdDate as string || '2024-01-15',
    lastModifiedDate: params.lastModifiedDate as string || '2024-01-16',
    objectKey: params.objectKey as string || '/mybucket/document.pdf',
  };

  const detailRows: DetailRow[] = [
    { key: 'Object Name', value: objectData.name },
    { key: 'File Size', value: objectData.size },
    { key: 'Document Type', value: objectData.type },
    { key: 'Uploaded By', value: objectData.uploadedBy },
    { key: 'Created Date', value: objectData.createdDate },
    { key: 'Last Modified Date', value: objectData.lastModifiedDate },
    { key: 'Object Key', value: objectData.objectKey },
  ];

  const handleBreadcrumbPress = (path: string) => {
    if (path === 'Buckets') {
      router.push('/buckets');
    } else if (path === 'bucket') {
      router.push({
        pathname: '/bucket-files',
        params: { bucketName }
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Header */}
        <View style={[styles.header, isMobile && styles.headerMobile]}>
          <Text style={[styles.title, { color: colors.text }, isMobile && styles.titleMobile]}>
            Object Details
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
          <TouchableOpacity 
            onPress={() => handleBreadcrumbPress('bucket')}
            style={styles.breadcrumbItem}
          >
            <Text style={[styles.breadcrumbText, { color: colors.textSecondary }]}>{bucketName}</Text>
          </TouchableOpacity>
          <ChevronRight size={16} color={colors.textSecondary} style={styles.breadcrumbSeparator} />
          <Text style={[styles.breadcrumbText, { color: colors.text }]}>{objectData.name}</Text>
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
