import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  RefreshControl,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './AssignmentScreen.style';
import { fetchUserAssignments } from '../services/assignmentService';
import { getSupabase } from '../services/supabase';

const XP_MAX = 100;
const TOPBAR_HEIGHT = 64;

export default function AssignmentScreen({ navigation, route }) {
  const userId = route?.params?.userId;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [user, setUser] = useState(null);

  const loadAssignments = async (showLoader = true) => {
    if (!userId) {
      navigation.replace('Auth');
      return;
    }

    try {
      if (showLoader) setLoading(true);
      
      const supabase = getSupabase();
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, full_name, level, xp, streak')
        .eq('id', userId)
        .single();

      if (userError) throw userError;
      
      const data = await fetchUserAssignments(userId);
      setUser(userData);
      setAssignments(data);
    } catch (error) {
      console.error('Error loading assignments:', error);
      Alert.alert('Error', error?.message || 'Gagal memuat assignment');
    } finally {
      if (showLoader) setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [userId]);

  // Refresh user data when screen gets focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userId) {
        loadAssignments(false).catch(err => {
          console.error('Error refreshing assignment:', err);
        });
      }
    });

    return unsubscribe;
  }, [navigation, userId]);

  const onRefresh = () => {
    setRefreshing(true);
    loadAssignments(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return as-is if invalid date
      
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}/${month}/${year}, ${hours}:${minutes}`;
    } catch (e) {
      return dateString;
    }
  };

  const getStatusStyle = (displayStatus) => {
    switch (displayStatus?.toLowerCase()) {
      case 'submitted':
        return styles.statusSubmitted;
      case 'not submitted':
        return styles.statusNotSubmitted;
      default:
        return styles.statusDefault;
    }
  };

  const getStatusLabel = (displayStatus) => {
    switch (displayStatus?.toLowerCase()) {
      case 'submitted':
        return 'Submitted';
      case 'not submitted':
        return 'Not Submitted';
      default:
        return displayStatus || '-';
    }
  };

  const isOverdue = (endDate, hasSubmission) => {
    if (hasSubmission) return false;
    if (!endDate) return false;
    
    try {
      const now = new Date();
      const end = new Date(endDate);
      if (isNaN(end.getTime())) return false;
      return end < now;
    } catch (e) {
      return false;
    }
  };

  const renderAssignmentItem = ({ item }) => {
    // Handle different possible column names for end date
    const endDate = item.due_date || item.end_date || item.deadline;
    const overdue = isOverdue(endDate, item.hasSubmission);

    return (
      <TouchableOpacity 
        style={[styles.assignmentCard, overdue && styles.assignmentCardOverdue]} 
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('AssignmentDetail', { assignment: item, userId });
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.chapterBadge}>
            <Text style={styles.chapterText}>{item.chapter || item.unit || 'N/A'}</Text>
          </View>
          <View style={[styles.statusBadge, getStatusStyle(item.displayStatus)]}>
            <Text style={[styles.statusText, 
              item.displayStatus?.toLowerCase() === 'submitted' && styles.statusTextSubmitted,
              item.displayStatus?.toLowerCase() === 'not submitted' && styles.statusTextNotSubmitted
            ]}>
              {getStatusLabel(item.displayStatus)}
            </Text>
          </View>
        </View>

        <Text style={styles.assignmentTitle} numberOfLines={2}>
          {item.title || item.name || 'Untitled Assignment'}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.deadlineRow}>
            <Ionicons 
              name="time-outline" 
              size={16} 
              color={overdue ? '#ef4444' : '#64748b'} 
            />
            <Text style={[styles.deadlineText, overdue && styles.deadlineOverdue]}>
              {formatDate(endDate)}
            </Text>
          </View>
          {overdue && (
            <View style={styles.overdueTag}>
              <Text style={styles.overdueTagText}>Overdue</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.pageTitle}>Assignment</Text>
      <Text style={styles.pageSubtitle}>
        {assignments.length} tugas tersedia
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={64} color="#cbd5e1" />
      <Text style={styles.emptyText}>Belum ada assignment</Text>
      <Text style={styles.emptySubtext}>Assignment akan muncul di sini</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B3C5D" />
          <Text style={styles.loadingText}>Memuat assignment...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;
  const TOPBAR_TOTAL = TOPBAR_HEIGHT + STATUSBAR_HEIGHT;
  
  const xpValue = user?.xp || 0;
  const xpProgress = Math.min(xpValue, XP_MAX) / XP_MAX;
  const xpLabel = `${Math.min(xpValue, XP_MAX)}/${XP_MAX} XP`;
  const streakValue = user?.streak || 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.topFixed, { height: TOPBAR_TOTAL, paddingTop: STATUSBAR_HEIGHT }]}>
        <View style={styles.topBar}>
          <View style={styles.topStats}>
            <View style={styles.topStatItem}>
              <Ionicons name="flame" size={24} color="#ff7a00" />
              <Text style={styles.topStatText}>{streakValue}</Text>
            </View>

            <View style={styles.topStatItem}>
              <Text style={styles.topStatLabel}>Lvl</Text>
              <Text style={styles.topStatText}>{user?.level || 1}</Text>
            </View>

            <View style={styles.xpWrap}>
              <View style={styles.xpBar}>
                <View style={[styles.xpFill, { width: `${Math.round(xpProgress * 100)}%` }]} />
              </View>
              <Text style={styles.xpText}>{xpLabel}</Text>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={assignments}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderAssignmentItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[styles.listContent, { paddingTop: TOPBAR_TOTAL }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0B3C5D']}
            tintColor="#0B3C5D"
          />
        }
      />
    </SafeAreaView>
  );
}
