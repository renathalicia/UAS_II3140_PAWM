import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'System',
  },
  
  // Top Bar Stats (sama kayak Dashboard)
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f0f9ff',
  },
  topStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  topStatLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '800',
    fontFamily: 'System',
  },
  topStatText: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '900',
    fontFamily: 'System',
  },
  xpWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  xpBar: {
    flex: 1,
    height: 14,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#34a853',
  },
  xpText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '800',
    fontFamily: 'System',
  },

  // Header
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0B3C5D',
    fontFamily: 'System',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'System',
    marginTop: 4,
  },
  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Unit Container
  unitContainer: {
    marginBottom: 20,
  },

  // Section Container
  sectionContainer: {
    marginBottom: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5f3ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Section Header
  sectionHeader: {
    padding: 16,
    paddingVertical: 20,
  },
  sectionHeaderLeft: {
    flex: 1,
  },
  sectionHeaderText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
    fontFamily: 'System',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#ffffff',
    fontFamily: 'System',
  },

  // Nodes Path
  nodesPath: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
    minHeight: 200,
  },
  beeLarge: {
    width: 120,
    height: 120,
    marginRight: 20,
    marginTop: 20,
  },
  nodesGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignContent: 'flex-start',
  },
  nodeWrapper: {
    width: '30%',
    aspectRatio: 1,
    maxWidth: 80,
  },

  // Node Circle
  nodeCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#cbd5e1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  nodeCircleCompleted: {
    borderColor: '#10b981',
    backgroundColor: '#d1fae5',
  },
  nodeCircleLocked: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  nodeCircleActive: {
    borderColor: '#f59e0b',
    backgroundColor: '#fef3c7',
  },
  beeImage: {
    width: 50,
    height: 50,
  },
  nodeCompleted: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#10b981',
  },
  nodeLocked: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#e5e7eb',
  },
  nodeActive: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fbbf24',
  },

  // Progress Section
  progressSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    fontFamily: 'System',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
