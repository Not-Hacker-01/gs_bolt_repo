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
import { Search, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';

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
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Buckets"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView style={styles.mobileList}>
          {filteredBuckets.map((bucket) => (
            <View key={bucket.id} style={styles.mobileCard}>
              <View style={styles.mobileCardHeader}>
                <Text style={styles.mobileCardTitle}>{bucket.name}</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <View style={styles.mobileCardContent}>
                <View style={styles.mobileCardRow}>
                  <Text style={styles.mobileCardLabel}>Files:</Text>
                  <Text style={styles.mobileCardValue}>{bucket.files}</Text>
                </View>
                <View style={styles.mobileCardRow}>
                  <Text style={styles.mobileCardLabel}>Size:</Text>
                  <Text style={styles.mobileCardValue}>{bucket.size}</Text>
                </View>
                <View style={styles.mobileCardRow}>
                  <Text style={styles.mobileCardLabel}>Access:</Text>
                  <Text style={styles.mobileCardValue}>{bucket.access}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.mobileViewButton}>
                <Text style={styles.mobileViewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isTablet && styles.searchContainerTablet]}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Buckets"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView horizontal={isTablet} showsHorizontalScrollIndicator={false}>
        <View style={[styles.table, isTablet && styles.tableTablet]}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: isTablet ? 140 : 160 }]}>Bucket Name</Text>
            <Text style={[styles.headerCell, { width: isTablet ? 100 : 120 }]}>Created On</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Files</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Size</Text>
            <Text style={[styles.headerCell, { width: isTablet ? 100 : 120 }]}>Last Modified</Text>
            <Text style={[styles.headerCell, { width: 100 }]}>Access</Text>
            <Text style={[styles.headerCell, { width: 100 }]}>Actions</Text>
          </View>

          {filteredBuckets.map((bucket, index) => (
            <View 
              key={bucket.id} 
              style={[
                styles.tableRow,
                index % 2 === 1 && styles.tableRowAlternate
              ]}
            >
              <Text style={[styles.cell, { width: isTablet ? 140 : 160 }]}>{bucket.name}</Text>
              <Text style={[styles.cell, { width: isTablet ? 100 : 120 }]}>{bucket.createdOn}</Text>
              <Text style={[styles.cell, { width: 80 }]}>{bucket.files}</Text>
              <Text style={[styles.cell, { width: 80 }]}>{bucket.size}</Text>
              <Text style={[styles.cell, { width: isTablet ? 100 : 120 }]}>{bucket.lastModified}</Text>
              <Text style={[styles.cell, { width: 100 }]}>{bucket.access}</Text>
              <View style={[styles.actionsCell, { width: 100 }]}>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreHorizontal size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 24,
    marginVertical: 16,
    paddingHorizontal: 12,
  },
  searchContainerTablet: {
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
  },
  table: {
    minWidth: 760,
  },
  tableTablet: {
    minWidth: 680,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  tableRowAlternate: {
    backgroundColor: '#F9FAFB',
  },
  cell: {
    fontSize: 14,
    color: '#1F2937',
  },
  actionsCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  moreButton: {
    padding: 4,
  },
  // Mobile styles
  mobileList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mobileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#1F2937',
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
    color: '#6B7280',
  },
  mobileCardValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  mobileViewButton: {
    backgroundColor: '#3B82F6',
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
});