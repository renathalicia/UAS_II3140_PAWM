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

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },

  contentInner: {
    paddingBottom: 24,
  },

  /* ===== COVER IMAGE ===== */
  coverWrap: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  coverImage: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
  },
  coverImagePlaceholder: {
    width: '100%',
    height: 240,
    backgroundColor: '#e5e7eb',
  },

  body: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '700',
  },
  metaDot: {
    fontSize: 13,
    color: '#d1d5db',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
  },
  linkBtn: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: '#0b4d78',
    gap: 8,
  },
  linkBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
});
