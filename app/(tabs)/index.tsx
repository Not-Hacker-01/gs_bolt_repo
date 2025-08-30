import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Upload, BarChart3, Activity, HardDrive } from 'lucide-react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

interface MetricCard {
  title: string;
  value: string;
  icon: React.ComponentType<{ size: number; color: string }>;
}

interface ActivityItem {
  date: string;
  activity: string;
  user: string;
}

interface StorageBucket {
  name: string;
  percentage: number;
}

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { colors } = useThemeContext();

  const metrics: MetricCard[] = [
    {
      title: 'Total Storage Used',
      value: '12.5 TB',
      icon: HardDrive,
    },
    {
      title: 'Number of Buckets',
      value: '25',
      icon: BarChart3,
    },
    {
      title: 'Monthly Bandwidth',
      value: '500 GB',
      icon: Activity,
    },
    {
      title: 'Active Users',
      value: '15',
      icon: Activity,
    },
  ];

  const recentActivities: ActivityItem[] = [
    { date: '2023-09-20', activity: 'Bucket created', user: 'Alex Turner' },
    { date: '2023-09-19', activity: 'File uploaded', user: 'Olivia Bennett' },
    { date: '2023-09-18', activity: 'Access key generated', user: 'Ethan Carter' },
    { date: '2023-09-17', activity: 'Usage report generated', user: 'Sophia Davis' },
    { date: '2023-09-16', activity: 'Team member added', user: 'Liam Foster' },
  ];

  const storageBuckets: StorageBucket[] = [
    { name: 'Bucket A', percentage: 15 },
    { name: 'Bucket B', percentage: 12 },
    { name: 'Bucket C', percentage: 18 },
    { name: 'Bucket D', percentage: 10 },
    { name: 'Bucket E', percentage: 8 },
    { name: 'Bucket F', percentage: 14 },
    { name: 'Bucket G', percentage: 11 },
    { name: 'Bucket H', percentage: 9 },
    { name: 'Bucket I', percentage: 3 },
  ];

  const renderMetricsSection = () => (
    <View style={styles.metricsSection}>
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <View key={index} style={[styles.metricCard, { backgroundColor: '#FFFFFF', borderColor: colors.border }]}>
            <Text style={[styles.metricTitle, { color: colors.text }]}>{metric.title}</Text>
            <View style={[styles.metricValueBox, { backgroundColor: '#F2F5F8' }]}>
              <Text style={[styles.metricValue, { color: colors.primary }]}>{metric.value}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderQuickUploadSection = () => (
    <View>
      <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>Quick Upload</Text>
      <View style={[styles.uploadContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.uploadArea, { borderColor: colors.border }]}>
          <Upload size={32} color={colors.textSecondary} />
          <Text style={[styles.uploadText, { color: colors.text }]}>Drag and drop files here</Text>
          <Text style={[styles.uploadSubtext, { color: colors.textSecondary }]}>Or click to browse your files</Text>
          <TouchableOpacity style={[styles.uploadButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.uploadButtonText}>Upload Files</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderRecentActivitySection = () => (
    <View>
      <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>Recent Activity</Text>
      <View style={[styles.tableContainer, { borderColor: colors.border }]}>
        <View style={[styles.table, { borderColor: colors.border }]}>
          <View style={[styles.tableHeader, { borderBottomColor: colors.border, backgroundColor: '#F9FAFB' }]}>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.dateCell]}>Date</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.activityCell]}>Activity</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.userCell]}>User</Text>
          </View>

          <View style={styles.tableBody}>
            {recentActivities.map((activity, index) => (
              <View 
                key={index} 
                style={[
                  styles.tableRow,
                  { 
                    borderBottomColor: colors.border,
                    borderBottomWidth: index === recentActivities.length - 1 ? 0 : 1
                  }
                ]}
              >
                <Text style={[styles.cell, { color: colors.text }, styles.dateCell]}>{activity.date}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.activityCell]}>{activity.activity}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.userCell]}>{activity.user}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderStorageDistributionSection = () => (
    <View>
      <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: 16 }]}>Storage Distribution</Text>
      <View style={[styles.storageContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.storageHeader}>
          <Text style={[styles.storageHeading, { color: colors.text }]}>Storage Distribution</Text>
          <Text style={[styles.storageTotal, { color: colors.text }]}>12.5 TB</Text>
          <Text style={[styles.storageSubtitle, { color: colors.textSecondary }]}>Total</Text>
        </View>
        <View style={styles.storageChart}>
          {storageBuckets.map((bucket, index) => (
            <View key={index} style={styles.bucketBar}>
              <View style={[styles.barContainer, { backgroundColor: '#F3F4F6' }]}>
                <View style={[styles.barTopLine, { backgroundColor: '#3B82F6' }]} />
              </View>
              <Text style={[styles.bucketLabel, { color: colors.text }]}>{bucket.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.content, isMobile && styles.contentMobile]} showsVerticalScrollIndicator={false}>
        <View style={[styles.pageHeader, isMobile && styles.pageHeaderMobile]}>
          <Text style={[styles.pageTitle, { color: colors.text }, isMobile && styles.pageTitleMobile]}>Dashboard</Text>
        </View>

        {renderMetricsSection()}

        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            {renderQuickUploadSection()}
            {renderRecentActivitySection()}
            {renderStorageDistributionSection()}
          </View>
        </View>
      </ScrollView>
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
  },
  contentMobile: {
    padding: 16,
  },
  pageHeader: {
    marginBottom: 24,
  },
  pageHeaderMobile: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  pageTitleMobile: {
    fontSize: 24,
  },
  metricsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: 200,
    maxWidth: 250,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  metricValueBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
    // maxWidth: 120,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    maxWidth: 'auto',
  },
  mainContent: {
    flexDirection: 'row',
    gap: 24,
  },
  leftColumn: {
    flex: 2,
    gap: 24,
  },
  rightColumn: {
    flex: 1,
  },
  uploadContainer: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  storageHeading:{
    fontSize: 16,
    fontWeight: '400',
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 14,
    marginBottom: 20,
  },
  uploadButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  recentActivitySection: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },


  storageContainer: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  storageHeader: {
    alignItems: 'flex-start',
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  storageTotal: {
    fontSize: 24,
    fontWeight: '700',
  },
  storageSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  storageChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    gap: 24,
  },
  bucketBar: {
    alignItems: 'flex-start',
    width: 60,
  },
  barContainer: {
    width: 60,
    height: 150,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barTopLine: {
    width: '100%',
    height: 2,
    position: 'absolute',
    top: 0,
  },
  bucketLabel: {
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Table styles for Recent Activity
  tableContainer: {
    marginBottom: 24,
  },
  table: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    alignItems: 'center',
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateCell: {
    flex: 1,
    paddingRight: 16,
  },
  activityCell: {
    flex: 2,
    paddingRight: 16,
  },
  userCell: {
    flex: 1,
    paddingRight: 16,
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    minHeight: 72,
  },
  cell: {
    fontSize: 14,
    lineHeight: 20,
  },
});