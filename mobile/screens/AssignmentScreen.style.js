import { StyleSheet } from 'react-native';
import { DESIGN_SYSTEM } from '../style/design';

const { colors, typography, spacing, borderRadius, shadow } = DESIGN_SYSTEM;

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
  topStatText: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: '900',
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
  listContent: {
    padding: spacing.lg,
    paddingBottom: 32,
  },
  headerSection: {
    marginTop: 0,
    marginBottom: 8,
  },
  pageTitle: {
    ...typography.pageTitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: 'System',
  },
  pageSubtitle: {
    ...typography.pageSubtitle,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  assignmentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  assignmentCardOverdue: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chapterBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  chapterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369a1',
    fontFamily: 'System',
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
  },
  statusSubmitted: {
    backgroundColor: '#d1fae5',
  },
  statusNotSubmitted: {
    backgroundColor: '#fee2e2',
  },
  statusDefault: {
    backgroundColor: '#e5e7eb',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#374151',
  },
  statusTextSubmitted: {
    color: '#065f46',
  },
  statusTextNotSubmitted: {
    color: '#991b1b',
  },
  assignmentTitle: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 22,
    fontFamily: 'System',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deadlineText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontFamily: 'System',
  },
  deadlineOverdue: {
    color: colors.error,
    fontWeight: '500',
  },
  overdueTag: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  overdueTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#dc2626',
    fontFamily: 'System',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.xs,
    fontFamily: 'System',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    fontFamily: 'System',
  },
});
