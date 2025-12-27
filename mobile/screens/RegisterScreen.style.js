import { StyleSheet } from 'react-native';
import { COLORS } from '../style/colors';
import { SPACING } from '../style/spacing';
import { TYPOGRAPHY } from '../style/typography';

export default StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: 0,
    justifyContent: 'space-between',
  },

  /* ===== ZONA ATAS ===== */
  topSection: {
    alignItems: 'center',
    marginTop: SPACING.xl + SPACING.sm,
  },

  logoITB: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },

  /* ===== ZONA TENGAH ===== */
  middleSection: {
    width: '100%',
    transform: [{ translateY: SPACING.lg }],
  },

  switch: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },

  activeBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },

  inactiveBtn: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },

  activeText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textWhite,
    textAlign: 'center',
  },

  inactiveText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },

  label: {
    ...TYPOGRAPHY.label,
    marginTop: SPACING.md,
    color: COLORS.textPrimary,
  },

  input: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
  },

  submit: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xl,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },

  /* ===== ZONA BAWAH ===== */
  bottomSection: {
    alignItems: 'center',
    marginBottom: -SPACING.sm,
  },

  logoBee: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
