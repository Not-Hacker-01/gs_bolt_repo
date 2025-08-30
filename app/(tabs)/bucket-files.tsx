import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView, 
  useWindowDimensions 
} from 'react-native';
import { Search, MoreVertical, ChevronRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useThemeContext } from '@/hooks/useThemeContext';
import ContextMenu from '@/components/ContextMenu';

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  createdDate: string;
  lastModifiedDate: string;
}

export default function BucketFiles() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const buttonRefs = React.useRef<{ [key: string]: any }>({});
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const { colors } = useThemeContext();

  const bucketName = params.bucketName as string || 'MyBucket';

  const files: File[] = [
    {
      id: '1',
      name: 'document1.pdf',
      type: 'PDF',
      size: '2.5 MB',
      createdDate: '2024-01-15',
      lastModifiedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'image1.jpg',
      type: 'Image',
      size: '1.2 MB',
      createdDate: '2024-01-16',
      lastModifiedDate: '2024-01-16',
    },
    {
      id: '3',
      name: 'video1.mp4',
      type: 'Video',
      size: '150 MB',
      createdDate: '2024-01-17',
      lastModifiedDate: '2024-01-17',
    },
    {
      id: '4',
      name: 'archive.zip',
      type: 'Archive',
      size: '50 MB',
      createdDate: '2024-01-18',
      lastModifiedDate: '2024-01-18',
    },
    {
      id: '5',
      name: 'data.csv',
      type: 'CSV',
      size: '10 MB',
      createdDate: '2024-01-19',
      lastModifiedDate: '2024-01-19',
    },
  ];

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoreButtonPress = (file: File) => {
    const buttonRef = buttonRefs.current[file.id];
    if (buttonRef) {
      buttonRef.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
        setContextMenuPosition({ x: pageX + width, y: pageY });
        setSelectedFile(file);
        setContextMenuVisible(true);
      });
    }
  };

  const handleShare = () => {
    console.log('Share file:', selectedFile?.name);
  };

  const handleDetails = () => {
    if (selectedFile) {
      router.push({
        pathname: '/object-details',
        params: {
          id: selectedFile.id,
          fileName: selectedFile.name,
          bucketName: bucketName,
          size: selectedFile.size,
          type: selectedFile.type,
          createdDate: selectedFile.createdDate,
          lastModifiedDate: selectedFile.lastModifiedDate,
          uploadedBy: 'Sophia Carter', // Default value for demo
          objectKey: `/${bucketName.toLowerCase()}/${selectedFile.name.toLowerCase()}`,
        }
      });
    }
  };

  const handleDownload = () => {
    console.log('Download file:', selectedFile?.name);
  };

  const handleDelete = () => {
    console.log('Delete file:', selectedFile?.name);
  };



  const handleBreadcrumbPress = (path: string) => {
    if (path === 'Buckets') {
      router.push('/buckets');
    }
  };

  const renderMobileView = () => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Files"
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
        {filteredFiles.map((file) => (
          <View key={file.id} style={[styles.mobileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.mobileCardHeader}>
              <Text style={[styles.mobileCardTitle, { color: colors.text }]}>{file.name}</Text>
              <TouchableOpacity 
                ref={(ref) => { buttonRefs.current[file.id] = ref; }}
                style={styles.moreButton} 
                activeOpacity={1}
                onPress={() => handleMoreButtonPress(file)}
              >
                <MoreVertical size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.mobileCardContent}>
              <View style={styles.mobileCardRow}>
                <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Type:</Text>
                <Text style={[styles.mobileCardValue, { color: colors.text }]}>{file.type}</Text>
              </View>
              <View style={styles.mobileCardRow}>
                <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Size:</Text>
                <Text style={[styles.mobileCardValue, { color: colors.text }]}>{file.size}</Text>
              </View>
              <View style={styles.mobileCardRow}>
                <Text style={[styles.mobileCardLabel, { color: colors.textSecondary }]}>Created:</Text>
                <Text style={[styles.mobileCardValue, { color: colors.text }]}>{file.createdDate}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.mobileViewButton, { backgroundColor: colors.primary }]} activeOpacity={1}>
              <Text style={styles.mobileViewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderDesktopView = () => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Files"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={[styles.tableContainer, { borderColor: colors.border }]}>
        <View style={[styles.table, isTablet && styles.tableTablet]}>
          <View style={[styles.tableHeader, { borderBottomColor: colors.border, backgroundColor: '#F9FAFB' }]}>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.nameCell]}>Name</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.typeCell]}>Type</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.sizeCell]}>Size</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.dateCell]}>Created Date</Text>
            <Text style={[styles.headerCell, { color: colors.textSecondary }, styles.dateCell]}>Last Modified Date</Text>
            <Text style={[styles.actionsHeaderCell, { color: colors.textSecondary }, styles.actionsCell]}>Actions</Text>
          </View>

          <View style={styles.tableBody}>
            {filteredFiles.map((file, index) => (
              <View 
                key={file.id} 
                style={[
                  styles.tableRow,
                  { 
                    borderBottomColor: colors.border,
                    borderBottomWidth: index === filteredFiles.length - 1 ? 0 : 1
                  }
                ]}
              >
                <Text style={[styles.cell, { color: colors.text }, styles.nameCell]}>{file.name}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.typeCell]}>{file.type}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.sizeCell]}>{file.size}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.dateCell]}>{file.createdDate}</Text>
                <Text style={[styles.cell, { color: colors.text }, styles.dateCell]}>{file.lastModifiedDate}</Text>
                <View style={[styles.actionsCellContainer, styles.actionsCell]}>
                  <TouchableOpacity style={styles.viewButton} activeOpacity={1}>
                    <Text style={[styles.viewButtonText, { color: '#3B82F6' }]}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    ref={(ref) => { buttonRefs.current[file.id] = ref; }}
                    style={styles.moreButton} 
                    activeOpacity={1}
                    onPress={() => handleMoreButtonPress(file)}
                  >
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.content, isMobile && styles.contentMobile]}>
        {/* Header */}
        <View style={[styles.header, isMobile && styles.headerMobile]}>
          <Text style={[styles.title, { color: colors.text }, isMobile && styles.titleMobile]}>
            Bucket
          </Text>
        </View>

        {/* Breadcrumb */}
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity 
            onPress={() => handleBreadcrumbPress('Buckets')}
            style={styles.breadcrumbItem}
          >
            <Text style={[styles.breadcrumbText, { color: colors.textSecondary }]}>Buckets</Text>
          </TouchableOpacity>
          <ChevronRight size={16} color={colors.textSecondary} style={styles.breadcrumbSeparator} />
          <Text style={[styles.breadcrumbText, { color: colors.text }]}>{bucketName}</Text>
        </View>

        {/* Content */}
        {isMobile ? renderMobileView() : renderDesktopView()}

        <ContextMenu
          visible={contextMenuVisible}
          onClose={() => setContextMenuVisible(false)}
          position={contextMenuPosition}
          onShare={handleShare}
          onDetails={handleDetails}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
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
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nameCell: {
    flex: 2,
    paddingRight: 16,
  },
  typeCell: {
    flex: 1,
    paddingRight: 16,
  },
  sizeCell: {
    flex: 1,
    paddingRight: 16,
  },
  dateCell: {
    flex: 1.5,
    paddingRight: 16,
  },
  actionsCell: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 8,
  },
  actionsHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
});
