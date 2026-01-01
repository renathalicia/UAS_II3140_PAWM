import { StyleSheet } from 'react-native';
import { DESIGN_SYSTEM } from '../style/design';

const { colors, typography, spacing, borderRadius, shadow } = DESIGN_SYSTEM;

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    paddingBottom: 24,
  },

  /* ===== ONLY TOP BAR fixed ===== */
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

  /* Top Bar - DIPERBESAR */
  topBar: {
    height: 70, // lebih tinggi
    flexDirection: 'row',
    alignItems: 'center',
  },
  topStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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

  /* Header block (scrollable) - DIANGKAT */
  headerBlock: {
    marginTop: 0,
    marginBottom: 8,
    paddingHorizontal: spacing.lg,
  },
  helloText: {
    ...typography.pageTitle,
    color: colors.textPrimary,
  },
  subGreeting: {
    ...typography.pageSubtitle,
    marginTop: 5,
  },

  /* Search (scrollable) */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  searchInputWrap: {
    flex: 1,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    paddingLeft: spacing.md,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  clearBtn: {
    paddingLeft: 8,
    paddingVertical: 6,
  },
  searchBtn: {
    width: 46,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  /* Featured & rest (unchanged) */
  featuredWrap: {
    marginBottom: 14,
  },
  featuredCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.background,
    marginRight: spacing.md,
    ...shadow.sm,
  },
  featuredImage: {
    width: '100%',
    height: 170,
    backgroundColor: colors.border,
  },
  featuredContent: {
    padding: 14,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  featuredDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  readBtn: {
  alignSelf: 'flex-start',
  backgroundColor: colors.primary,
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: borderRadius.full,
  pointerEvents: 'none',
},
  readBtnText: {
    color: colors.surface,
    fontWeight: '800',
  },
  dotsRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  dotActive: {
    width: 28,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  materiHeader: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: 10,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  dropdownButton: {
    flex: 1,
    height: 46,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLabel: {
    color: colors.textPrimary,
    fontSize: 14,
  },

  /* Materials grid and cards */
  materialGridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  materialCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.background,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  materialImageWrap: {
    width: '100%',
    height: 120,
    backgroundColor: colors.border,
  },
  materialImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  materialImagePlaceholder: {
    flex: 1,
    backgroundColor: colors.border,
  },
  materialBody: {
    padding: spacing.md,
  },
  materialTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  materialDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 16,
  },
  materialMeta: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '700',
  },

  emptyText: {
    color: colors.textSecondary,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },

  dropdownBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  dropdownModal: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    maxHeight: 320,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  dropdownItemText: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  dropdownItemSelected: {
    backgroundColor: '#eef6ff',
  },
  dropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: '700',
  },
});