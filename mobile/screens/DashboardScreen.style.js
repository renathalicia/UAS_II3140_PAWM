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

  /* ===== Top Bar (menu + streak + lvl + xp) ===== */
  topBar: {
    paddingTop: 6,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  topStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  topStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '700',
  },
  topStatText: {
    fontSize: 13,
    color: '#111827',
    fontWeight: '800',
  },
  xpWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  xpBar: {
    flex: 1,
    height: 10,
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
    fontSize: 12,
    color: '#111827',
    fontWeight: '700',
  },

  /* ===== Header block (Halo + subtitle) ===== */
  headerBlock: {
    marginTop: 6,
    marginBottom: 12,
  },
  helloText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111827',
  },
  subGreeting: {
    marginTop: 2,
    color: '#6b7280',
    fontSize: 13,
  },

  /* ===== Search ===== */
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  searchInputWrap: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: '#fff',
    paddingLeft: 14,
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
    height: 46,
    borderRadius: 23,
    backgroundColor: '#eef2f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  /* ===== Featured carousel ===== */
  featuredWrap: {
    marginBottom: 14,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef2f7',
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

  /* ===== Materi header + filter pills ===== */
  materiHeader: {
    marginTop: 6,
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
  pickerPill: {
    flex: 1,
    height: 46,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    justifyContent: 'center',
  },

  /* ===== Materials grid ===== */
  materialGridRow: {
    justifyContent: 'space-between',
  },
  materialCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eef2f7',
    marginBottom: 12,
    // supaya jarak antar kolom rapi:
    marginRight: 12,
    minWidth: 160,
    maxWidth: 230,
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
  },
});