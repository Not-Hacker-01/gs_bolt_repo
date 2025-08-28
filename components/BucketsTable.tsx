import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, { width: 160 }]}>Bucket Name</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Created On</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Files</Text>
            <Text style={[styles.headerCell, { width: 80 }]}>Size</Text>
            <Text style={[styles.headerCell, { width: 120 }]}>Last Modified</Text>
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
              <Text style={[styles.cell, { width: 160 }]}>{bucket.name}</Text>
              <Text style={[styles.cell, { width: 120 }]}>{bucket.createdOn}</Text>
              <Text style={[styles.cell, { width: 80 }]}>{bucket.files}</Text>
              <Text style={[styles.cell, { width: 80 }]}>{bucket.size}</Text>
              <Text style={[styles.cell, { width: 120 }]}>{bucket.lastModified}</Text>
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
});