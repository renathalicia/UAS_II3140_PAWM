import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

import styles from './AssignmentDetailScreen.style';
import {
  fetchUserSubmission,
  fetchClassComments,
  fetchPrivateComments,
  addComment,
  uploadFile,
  submitAssignment,
  markAsDone,
} from '../services/assignmentDetailService';

export default function AssignmentDetailScreen({ navigation, route }) {
  const { assignment, userId } = route.params;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [submission, setSubmission] = useState(null);
  const [classComments, setClassComments] = useState([]);
  const [privateComments, setPrivateComments] = useState([]);

  // Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showClassCommentModal, setShowClassCommentModal] = useState(false);
  const [showPrivateCommentModal, setShowPrivateCommentModal] = useState(false);

  // Form states
  const [selectedFile, setSelectedFile] = useState(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [submissionData, classCommentsData, privateCommentsData] = await Promise.all([
        fetchUserSubmission(assignment.id, userId),
        fetchClassComments(assignment.id),
        fetchPrivateComments(assignment.id, userId),
      ]);

      setSubmission(submissionData);
      setClassComments(classCommentsData);
      setPrivateComments(privateCommentsData);
    } catch (error) {
      console.error('Error loading assignment detail:', error);
      Alert.alert('Error', error?.message || 'Gagal memuat detail assignment');
    } finally {
      setLoading(false);
    }
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Gagal memilih file');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile && !textAnswer.trim()) {
      Alert.alert('Perhatian', 'Silakan upload file atau masukkan jawaban text');
      return;
    }

    try {
      setSubmitting(true);

      let fileData = null;
      if (selectedFile) {
        fileData = await uploadFile(selectedFile, assignment.id, userId);
      }

      await submitAssignment(assignment.id, userId, fileData, textAnswer.trim() || null);

      Alert.alert('Berhasil', 'Assignment berhasil disubmit!');
      setShowSubmitModal(false);
      setSelectedFile(null);
      setTextAnswer('');
      loadData();
    } catch (error) {
      console.error('Error submitting assignment:', error);
      Alert.alert('Error', error?.message || 'Gagal submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAsDone = async () => {
    Alert.alert(
      'Konfirmasi',
      'Tandai assignment ini sebagai selesai?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Ya',
          onPress: async () => {
            try {
              await markAsDone(assignment.id, userId);
              Alert.alert('Berhasil', 'Assignment ditandai sebagai selesai!');
              navigation.goBack();
            } catch (error) {
              console.error('Error marking as done:', error);
              Alert.alert('Error', error?.message || 'Gagal menandai sebagai selesai');
            }
          },
        },
      ]
    );
  };

  const handleAddComment = async (isPrivate) => {
    if (!commentText.trim()) {
      Alert.alert('Perhatian', 'Silakan masukkan komentar');
      return;
    }

    try {
      await addComment(assignment.id, userId, commentText.trim(), isPrivate);
      Alert.alert('Berhasil', 'Komentar berhasil ditambahkan!');
      setCommentText('');
      if (isPrivate) {
        setShowPrivateCommentModal(false);
      } else {
        setShowClassCommentModal(false);
      }
      loadData();
    } catch (error) {
      console.error('Error adding comment:', error);
      Alert.alert('Error', error?.message || 'Gagal menambahkan komentar');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleDateString('id-ID', options);
    } catch (e) {
      return dateString;
    }
  };

  const isOverdue = () => {
    if (submission?.status === 'completed') return false;
    if (!assignment.due_date) return false;

    try {
      const now = new Date();
      const dueDate = new Date(assignment.due_date);
      return dueDate < now;
    } catch (e) {
      return false;
    }
  };

  const renderCommentModal = (isPrivate) => {
    const visible = isPrivate ? showPrivateCommentModal : showClassCommentModal;
    const setVisible = isPrivate ? setShowPrivateCommentModal : setShowClassCommentModal;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          setVisible(false);
        }}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      {isPrivate ? 'Add Private Comment' : 'Add Class Comment'}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      Keyboard.dismiss();
                      setVisible(false);
                    }} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                    <Text style={styles.inputLabel}>Comment</Text>
                    <TextInput
                      value={commentText}
                      onChangeText={setCommentText}
                      placeholder="Type your comment here..."
                      placeholderTextColor="#94a3b8"
                      style={styles.input}
                      multiline
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                  </ScrollView>

                  <View style={styles.modalFooter}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalButtonCancel]}
                      onPress={() => {
                        Keyboard.dismiss();
                        setVisible(false);
                        setCommentText('');
                      }}
                    >
                      <Text style={[styles.modalButtonText, styles.modalButtonTextCancel]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalButtonSubmit]}
                      onPress={() => {
                        Keyboard.dismiss();
                        handleAddComment(isPrivate);
                      }}
                    >
                      <Text style={[styles.modalButtonText, styles.modalButtonTextSubmit]}>
                        Add Comment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  const renderSubmitModal = () => {
    return (
      <Modal
        visible={showSubmitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => {
          if (!submitting) {
            Keyboard.dismiss();
            setShowSubmitModal(false);
          }
        }}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Submit Your Work</Text>
                    <TouchableOpacity
                      onPress={() => {
                        if (!submitting) {
                          Keyboard.dismiss();
                          setShowSubmitModal(false);
                        }
                      }}
                      style={styles.closeButton}
                      disabled={submitting}
                    >
                      <Ionicons name="close" size={24} color="#64748b" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.modalBody} keyboardShouldPersistTaps="handled">
                  <Text style={styles.inputLabel}>Upload File (Optional)</Text>
                  <TouchableOpacity
                    style={styles.filePickerButton}
                    onPress={handlePickDocument}
                    disabled={submitting}
                  >
                    <Ionicons name="cloud-upload-outline" size={24} color="#64748b" />
                    <Text style={styles.filePickerText}>
                      {selectedFile ? 'Change File' : 'Choose File'}
                    </Text>
                  </TouchableOpacity>

                  {selectedFile && (
                    <View style={styles.selectedFile}>
                      <Ionicons name="document-attach" size={20} color="#0369a1" />
                      <Text style={styles.selectedFileText} numberOfLines={1}>
                        {selectedFile.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setSelectedFile(null)}
                        style={styles.removeFileBtn}
                        disabled={submitting}
                      >
                        <Ionicons name="close-circle" size={20} color="#64748b" />
                      </TouchableOpacity>
                    </View>
                  )}

                    <Text style={[styles.inputLabel, { marginTop: 16 }]}>
                      Or Enter Your Answer (Optional)
                    </Text>
                    <TextInput
                      value={textAnswer}
                      onChangeText={setTextAnswer}
                      placeholder="Type your answer here..."
                      placeholderTextColor="#94a3b8"
                      style={styles.input}
                      multiline
                      editable={!submitting}
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                  </ScrollView>

                  <View style={styles.modalFooter}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalButtonCancel]}
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowSubmitModal(false);
                        setSelectedFile(null);
                        setTextAnswer('');
                      }}
                      disabled={submitting}
                    >
                      <Text style={[styles.modalButtonText, styles.modalButtonTextCancel]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.modalButton, styles.modalButtonSubmit]}
                      onPress={() => {
                        Keyboard.dismiss();
                        handleSubmit();
                      }}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <ActivityIndicator size="small" color="#ffffff" />
                      ) : (
                        <Text style={[styles.modalButtonText, styles.modalButtonTextSubmit]}>
                          Submit Work
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B3C5D" />
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;
  const overdue = isOverdue();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Fixed Header with Back Button */}
        <View style={styles.fixedHeader}>
          <TouchableOpacity 
            style={styles.backBtn} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Assignment</Text>
        </View>

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text" size={24} color="#0369a1" />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={[styles.dueDate, overdue && styles.dueDateOverdue]}>
                  Due {formatDate(assignment.due_date)}
                  {overdue && ' (Overdue)'}
                </Text>
              </View>
            </View>

            <View style={styles.chapterBadge}>
              <Text style={styles.chapterText}>{assignment.chapter}</Text>
            </View>

            <Text style={styles.description}>{assignment.description}</Text>
            <Text style={styles.points}>Points: {assignment.points || 0}</Text>
          </View>

          {/* Class Comments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitle}>
                <Ionicons name="people" size={20} color="#0B3C5D" />
                <Text style={styles.sectionTitleText}>Class Comments</Text>
                <Text style={styles.commentCount}>({classComments.length})</Text>
              </View>
              <TouchableOpacity
                style={styles.addCommentBtn}
                onPress={() => setShowClassCommentModal(true)}
              >
                <Text style={styles.addCommentBtnText}>Add Comment</Text>
              </TouchableOpacity>
            </View>

            {classComments.length > 0 ? (
              <View style={styles.commentsList}>
                {classComments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentAuthor}>
                        {comment.users?.full_name || 'Anonymous'}
                      </Text>
                      <Text style={styles.commentDate}>{formatDate(comment.created_at)}</Text>
                    </View>
                    <Text style={styles.commentContent}>{comment.comment || comment.content}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyComments}>
                <Text style={styles.emptyCommentsText}>No comments yet</Text>
              </View>
            )}
          </View>

          {/* Your Work */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitle}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.sectionTitleText}>Your Work</Text>
              </View>
            </View>

            {submission ? (
              <>
                <View style={styles.submissionInfo}>
                  <Text style={styles.submissionLabel}>Submitted File:</Text>
                  <Text style={styles.submissionFileName}>
                    {submission.submission_file_name || 'No file'}
                  </Text>
                  <Text style={styles.submissionDate}>
                    Submitted on: {formatDate(submission.submitted_at)}
                  </Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => setShowSubmitModal(true)}
                  >
                    <Ionicons name="create-outline" size={18} color="#0B3C5D" />
                    <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                      Update Submission
                    </Text>
                  </TouchableOpacity>

                  {submission.status !== 'completed' && (
                    <TouchableOpacity
                      style={[styles.button, styles.buttonPrimary]}
                      onPress={handleMarkAsDone}
                    >
                      <Ionicons name="checkmark-done" size={18} color="#ffffff" />
                      <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                        Mark As Done
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary]}
                onPress={() => setShowSubmitModal(true)}
              >
                <Ionicons name="cloud-upload-outline" size={18} color="#ffffff" />
                <Text style={[styles.buttonText, styles.buttonTextPrimary]}>Submit Work</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Private Comments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitle}>
                <Ionicons name="lock-closed" size={20} color="#64748b" />
                <Text style={styles.sectionTitleText}>Private Comments</Text>
                <Text style={styles.commentCount}>({privateComments.length})</Text>
              </View>
              <TouchableOpacity
                style={styles.addCommentBtn}
                onPress={() => setShowPrivateCommentModal(true)}
              >
                <Text style={styles.addCommentBtnText}>Add Comment</Text>
              </TouchableOpacity>
            </View>

            {privateComments.length > 0 ? (
              <View style={styles.commentsList}>
                {privateComments.map((comment) => (
                  <View key={comment.id} style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentAuthor}>You</Text>
                      <Text style={styles.commentDate}>{formatDate(comment.created_at)}</Text>
                    </View>
                    <Text style={styles.commentContent}>{comment.comment || comment.content}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyComments}>
                <Text style={styles.emptyCommentsText}>No private comments yet</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modals */}
      {renderSubmitModal()}
      {renderCommentModal(false)}
      {renderCommentModal(true)}
    </SafeAreaView>
  );
}
