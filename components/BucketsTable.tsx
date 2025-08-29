import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  useWindowDimensions 
} from 'react-native';
import { Search, MoreVertical } from 'lucide-react-native';
import { useThemeContext } from '@/hooks/useThemeContext';

interface Bucket {
  id: string;
  name: string;
  createdOn: string;
  files: number;
  size: string;
  lastModified: string;
  access: string;
}

export default function BucketsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const { colors } = useThemeContext();
  
  const buckets: Bucket[] = [
    {
      id: '1',
      name: 'Project Alpha',
      createdOn: '2023-08-15',
      files: 120,
      size: '50 GB',
      lastModified: '2024-01-20',
      access: 'Private',
    },
    {
      id: '2',
      name: 'Project Alpha',
      createdOn: '2023-08-15',
      files: 120,
      size: '50 GB',
      lastModified: '2024-01-20',
      access: 'Private',
    },
    {
      id: '3',
      name: 'Project Alpha',
      createdOn: '2023-08-15',
      files: 120,
      size: '50 GB',
      lastModified: '2024-01-20',
      access: 'Private',
    },
    {
      id: '4',
      name: 'Project Alpha',
      createdOn: '2023-08-15',
      files: 120,
      size: '50 GB',
      lastModified: '2024-01-20',
      access: 'Private',
    },
    {
      id: '5',
      name: 'Project Alpha',
      createdOn: '2023-08-15',
      files: 120,
      size: '50 GB',
      lastModified: '2024-01-20',
      access: 'Private',
    },
    {
      id: '6',
      name: 'Archived Data',
      createdOn: '2023-12-01',
      files: 1000,
      size: '400 GB',
      lastModified: '2024-04-01',
      access: 'Private',
    },
  ];

  const filteredBuckets = buckets.filter(bucket =>
    bucket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isMobile) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search Buckets"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView 
          style={styles.mobileList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.mobileListContent}
        >
          {filteredBuckets.map((bucket) => (
            <View key={bucket.id} style={[styles.mobileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.mobileCardHeader}>
                <Text style={[styles.mobileCardTitle, { color: colors.text }]}>{bucket.name}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={16} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
              <View style={styles.mobileCardContent}>
                <View style={styles.mobileCardRow}>
                  <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Files:</Text>
                  <Text style={[styles.mobileCardValue, { color: colors.text }]}>{bucket.files}</Text>
                </View>
                <View style={styles.mobileCardRow}>
                  <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Size:</Text>
                  <Text style={[styles.mobileCardValue, { color: colors.text }]}>{bucket.size}</Text>
                </View>
                <View style={styles.mobileCardRow}>
                  <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Access:</Text>
                  <View style={[styles.mobileAccessBadge, { backgroundColor: '#F3F4F6' }]}>
                    <Text style={[styles.mobileAccessBadgeText, { color: '#374151' }]}>{bucket.access}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={[styles.mobileViewButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.mobileViewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Buckets"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={[styles.tableContainer, { borderColor: colors.border }]}>
        <View style={[styles.table, isTablet && styles.tableTablet]}>
          <View style={[styles.tableHeader, { borderBottomColor: colors.border, backgroundColor: '#F9FAFB' }]}>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.bucketNameCell]}>Bucket Name</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.dateCell]}>Created On</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.numberCell]}>Files</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.numberCell]}>Size</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.dateCell]}>Last Modified</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.accessCell]}>Access</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.actionsCell]}>Actions</Text>
          </View>

            <View style={styles.tableBody}>
              {filteredBuckets.map((bucket, index) => (
                <View 
                  key={bucket.id} 
                  style={[
                    styles.tableRow,
                    { 
                      borderBottomColor: colors.border,
                      borderBottomWidth: index === filteredBuckets.length - 1 ? 0 : 1
                    }
                  ]}
                >
                  <Text style={[styles.cell, { color: colors.text }, styles.bucketNameCell]}>{bucket.name}</Text>
                  <Text style={[styles.cell, { color: colors.text }, styles.dateCell]}>{bucket.createdOn}</Text>
                  <Text style={[styles.cell, { color: colors.text }, styles.numberCell]}>{bucket.files}</Text>
                  <Text style={[styles.cell, { color: colors.text }, styles.numberCell]}>{bucket.size}</Text>
                  <Text style={[styles.cell, { color: colors.text }, styles.dateCell]}>{bucket.lastModified}</Text>
                  <View style={[styles.accessCellContainer, styles.accessCell]}> 
                    <View style={[styles.accessBadge, { backgroundColor: '#F3F4F6' }]}>
                      <Text style={[styles.accessBadgeText, { color: '#374151' }]}>{bucket.access}</Text>
                    </View>
                  </View>
                  <View style={[styles.actionsCellContainer, styles.actionsCell]}>
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={[styles.viewButtonText, { color: '#3B82F6' }]}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreButton}>
                      <MoreVertical size={16} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    minHeight: 24,
  },
  tableContainer: {
    marginBottom: 24,
  },
  table: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableTablet: {
    minWidth: 680,
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
  bucketNameCell: {
    flex: 1,
    paddingRight: 16,
  },
  dateCell: {
    flex: 1,
    paddingRight: 16,
  },
  numberCell: {
    flex: 1,
    paddingRight: 16,
  },
  accessCell: {
    flex: 1,
    paddingRight: 16,
  },
  actionsCell: {
    flex: 1,
    paddingRight: 16,
  },
  accessCellContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    paddingRight: 16,
  },
  actionsCellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  accessBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    width: 24,
    height: 24,
  },
  // Mobile styles
  mobileList: {
    flex: 1,
    minHeight: 0,
  },
  mobileListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  mobileCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  mobileCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mobileCardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  mobileCardContent: {
    marginBottom: 12,
  },
  mobileCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  mobileCardLabel: {
    fontSize: 14,
  },
  mobileCardValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  mobileViewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  mobileViewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  mobileAccessBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mobileAccessBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
});