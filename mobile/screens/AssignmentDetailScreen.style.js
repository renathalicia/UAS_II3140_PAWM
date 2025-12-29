import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#e0f2fe',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
    fontFamily: 'System',
  },
  dueDate: {
    fontSize: 13,
    color: '#64748b',
    fontFamily: 'System',
  },
  dueDateOverdue: {
    color: '#ef4444',
    fontWeight: '500',
  },
  chapterBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  chapterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0369a1',
    fontFamily: 'System',
  },
  description: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'System',
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'System',
  },
  
  // Comments Section
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'System',
  },
  commentCount: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'System',
  },
  addCommentBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0B3C5D',
    borderRadius: 6,
  },
  addCommentBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'System',
  },
  commentsList: {
    gap: 12,
  },
  commentItem: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#0B3C5D',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    fontFamily: 'System',
  },
  commentDate: {
    fontSize: 11,
    color: '#94a3b8',
    fontFamily: 'System',
  },
  commentContent: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    fontFamily: 'System',
  },
  emptyComments: {
    padding: 20,
    alignItems: 'center',
  },
  emptyCommentsText: {
    fontSize: 14,
    color: '#94a3b8',
    fontFamily: 'System',
  },

  // Submission Section
  submissionInfo: {
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#10b981',
  },
  submissionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 4,
    fontFamily: 'System',
  },
  submissionFileName: {
    fontSize: 14,
    color: '#047857',
    marginBottom: 2,
    fontFamily: 'System',
  },
  submissionDate: {
    fontSize: 12,
    color: '#059669',
    fontFamily: 'System',
  },
  actionButtons: {
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: '#0B3C5D',
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#0B3C5D',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  buttonTextPrimary: {
    color: '#ffffff',
  },
  buttonTextSecondary: {
    color: '#0B3C5D',
  },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: SCREEN_WIDTH * 0.9,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    fontFamily: 'System',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
    fontFamily: 'System',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#0f172a',
    minHeight: 100,
    maxHeight: 150,
    textAlignVertical: 'top',
    fontFamily: 'System',
  },
  filePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
    gap: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  filePickerText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
    fontFamily: 'System',
  },
  selectedFile: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#e0f2fe',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedFileText: {
    flex: 1,
    fontSize: 14,
    color: '#0369a1',
    fontFamily: 'System',
  },
  removeFileBtn: {
    padding: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f1f5f9',
  },
  modalButtonSubmit: {
    backgroundColor: '#10b981',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  modalButtonTextCancel: {
    color: '#64748b',
  },
  modalButtonTextSubmit: {
    color: '#ffffff',
  },
});
