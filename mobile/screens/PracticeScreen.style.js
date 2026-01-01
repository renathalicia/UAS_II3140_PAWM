import { StyleSheet } from 'react-native';
import { DESIGN_SYSTEM } from '../style/design';

const { colors, typography, spacing, borderRadius, shadow } = DESIGN_SYSTEM;

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  
  /* ===== Fixed Top Bar ===== */
  topFixed: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: 0,
  },
  
  /* Top Bar */
  topBar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
  topStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  topStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
  },
  topStatLabel: {
    ...typography.label,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  topStatText: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '900',
    fontFamily: 'System',
  },
  xpWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: 'transparent',
  },
  xpBar: {
    flex: 1,
    height: 14,
    borderRadius: borderRadius.full,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
  },
  xpText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: '800',
    fontFamily: 'System',
  },

  // Header
  header: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    ...typography.pageTitle,
    color: colors.textPrimary,
    fontFamily: 'System',
  },
  headerSubtitle: {
    ...typography.pageSubtitle,
    color: colors.textSecondary,
    fontFamily: 'System',
    marginTop: 5,
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
    marginBottom: spacing.xxl,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#e5f3ff',
    ...shadow.md,
  },

  // Section Header
  sectionHeader: {
    padding: spacing.lg,
    paddingVertical: spacing.xl,
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
    ...typography.sectionTitle,
    color: '#ffffff',
    fontFamily: 'System',
  },

  // Nodes Path
  nodesPath: {
    flexDirection: 'row',
    padding: spacing.xl,
    paddingTop: 30,
    paddingBottom: 30,
    minHeight: 200,
  },
  beeLarge: {
    width: 120,
    height: 120,
    marginRight: spacing.xl,
    marginTop: spacing.xl,
  },
  nodesGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
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
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.border,
    ...shadow.md,
    position: 'relative',
  },
  nodeCircleCompleted: {
    borderColor: colors.success,
    backgroundColor: '#d1fae5',
  },
  nodeCircleLocked: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  nodeCircleActive: {
    borderColor: colors.warning,
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
    borderColor: colors.success,
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
    backgroundColor: colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fbbf24',
  },

  // Progress Section
  progressSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    fontFamily: 'System',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
