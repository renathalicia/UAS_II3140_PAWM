
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

  /* ===== SWITCH ===== */
  switchContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: 22,
    overflow: 'hidden',
    position: 'relative',
    height: 44, // fixed height -> posisi Y stabil
    width: 260, // compact width (tidak terlalu sempit)
    alignSelf: 'center', // center horizontally so X position stable
  },

  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 22,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    ...TYPOGRAPHY.button,
    fontSize: 18, // diperbesar sedikit
  },

  tabTextActive: {
    color: COLORS.textWhite,
  },

  tabTextInactive: {
    color: COLORS.textPrimary,
  },

  /* ===== FORM ===== */
  form: {
    marginTop: SPACING.lg,
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

  submitText: {
    ...TYPOGRAPHY.button,
    color: COLORS.textWhite,
    textAlign: 'center',
  },


  invisible: {
    opacity: 0,
  },

  /* ===== ZONA BAWAH ===== */
  bottomSection: {
    alignItems: 'center',
    marginBottom: -SPACING.sm,
  },

  // diperkecil supaya proporsional
  logoBee: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});
