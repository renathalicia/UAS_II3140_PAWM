import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  /* ===== ONLY TOP BAR fixed ===== */
  topFixed: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    paddingTop: 20, // status bar offset
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
    gap: 8,
    paddingHorizontal: 12,
    height: 48, // lebih besar
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  topStatLabel: {
    fontSize: 16, // diperbesar dari 13
    color: '#6b7280',
    fontWeight: '800',
  },
  topStatText: {
    fontSize: 20, // diperbesar dari 15
    color: '#111827',
    fontWeight: '900',
  },
  xpWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    height: 48, // lebih besar
    borderRadius: 999,
    backgroundColor: 'transparent',
  },
  xpBar: {
    flex: 1,
    height: 14, // lebih tebal dari 10
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
    fontSize: 15, // diperbesar dari 12
    color: '#111827',
    fontWeight: '800',
  },

  /* Header block (scrollable) - DIANGKAT */
  headerBlock: {
    marginTop: 6, // dikecilkan dari 8 agar lebih dekat
    marginBottom: 15,
    paddingHorizontal: 16,
  },
  helloText: {
    fontSize: 22, // sedikit lebih besar
    fontWeight: '900',
    color: '#111827',
  },
  subGreeting: {
    marginTop: 5,
    color: '#6b7280',
    fontSize: 14, // sedikit lebih besar
  },

  /* Search (scrollable) */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  searchInputWrap: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#fff',
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#111827',
    fontSize: 14,
  },
  clearBtn: {
    paddingLeft: 8,
    paddingVertical: 6,
  },
  searchBtn: {
    width: 46,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#eef2f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  /* Featured & rest (unchanged) */
  featuredWrap: {
    marginBottom: 14,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef2f7',
    marginRight: 12,
  },
  featuredImage: {
    width: '100%',
    height: 170,
    backgroundColor: '#e5e7eb',
  },
  featuredContent: {
    padding: 14,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  featuredDesc: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 12,
  },
  readBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#0b4d78',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  readBtnText: {
    color: '#fff',
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
    backgroundColor: '#0b4d78',
  },

  materiHeader: {
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111827',
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
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownLabel: {
    color: '#111827',
    fontSize: 14,
  },

  /* Materials grid and cards */
  materialGridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  materialCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef2f7',
    marginBottom: 12,
  },
  materialImageWrap: {
    width: '100%',
    height: 120,
    backgroundColor: '#e5e7eb',
  },
  materialImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  materialImagePlaceholder: {
    flex: 1,
    backgroundColor: '#e5e7eb',
  },
  materialBody: {
    padding: 12,
  },
  materialTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  materialDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 16,
  },
  materialMeta: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '700',
  },

  emptyText: {
    color: '#6b7280',
    paddingBottom: 16,
    paddingTop: 8,
  },

  dropdownBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  dropdownModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: 320,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#111827',
  },
  dropdownItemSelected: {
    backgroundColor: '#eef6ff',
  },
  dropdownItemTextSelected: {
    color: '#0b4d78',
    fontWeight: '700',
  },
});