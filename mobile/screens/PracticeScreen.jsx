import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './PracticeScreen.style';
import { fetchPracticeSections } from '../services/practiceService';
import { getSupabase } from '../services/supabase';

const XP_MAX = 100;

export default function PracticeScreen({ navigation, route }) {
  const userId = route?.params?.userId;

  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, [userId]);

  useEffect(() => {
    // Refresh when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation, userId]);

  const loadData = async () => {
    if (!userId) {
      navigation.replace('Auth');
      return;
    }

    try {
      setLoading(true);
      
      // Fetch user data and practice sections
      const supabase = getSupabase();
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, full_name, level, xp, streak')
        .eq('id', userId)
        .single();

      if (userError) throw userError;

      const unitsData = await fetchPracticeSections(userId);
      
      setUser(userData);
      setUnits(unitsData);
    } catch (error) {
      console.error('Error loading practice:', error);
      Alert.alert('Error', error?.message || 'Gagal memuat practice');
    } finally {
      setLoading(false);
    }
  };

  const canAccessSection = (unitIndex, sectionIndex) => {
    // First unit, first section is always accessible
    if (unitIndex === 0 && sectionIndex === 0) return true;

    // Check if previous section is completed
    if (sectionIndex > 0) {
      const prevSection = units[unitIndex].sections[sectionIndex - 1];
      return prevSection.isCompleted;
    }

    // Check if previous unit's last section is completed
    if (unitIndex > 0) {
      const prevUnit = units[unitIndex - 1];
      const lastSection = prevUnit.sections[prevUnit.sections.length - 1];
      return lastSection.isCompleted;
    }

    return false;
  };

  const handleSectionPress = (section, canAccess) => {
    if (!canAccess) {
      Alert.alert('Locked', 'Complete the previous section to unlock this one');
      return;
    }

    // Find first uncompleted node or first node
    const targetNode = section.nodes.find(n => !n.isCompleted) || section.nodes[0];
    
    if (!targetNode) {
      Alert.alert('No Nodes', 'This section has no practice nodes yet');
      return;
    }

    navigation.navigate('PracticeQuiz', { 
      userId, 
      sectionId: section.id,
      nodeId: targetNode.id,
      nodeType: targetNode.node_type,
      xpReward: targetNode.xp_reward || 10,
    });
  };

  const renderSection = (section, unitIndex, sectionIndex) => {
    const canAccess = canAccessSection(unitIndex, sectionIndex);
    const isCompleted = section.isCompleted;

    return (
      <TouchableOpacity
        key={section.id}
        style={[
          styles.sectionCircle,
          isCompleted && styles.sectionCompleted,
          !canAccess && styles.sectionLocked,
        ]}
        onPress={() => handleSectionPress(section, canAccess)}
        disabled={!canAccess}
        activeOpacity={0.7}
      >
        {isCompleted ? (
          <View style={styles.beeContainer}>
            <Image 
              source={require('../assets/bee2.png')} 
              style={styles.beeImage}
              resizeMode="contain"
            />
            <View style={styles.checkmarkBadge}>
              <Ionicons name="checkmark" size={16} color="#10b981" />
            </View>
          </View>
        ) : canAccess ? (
          <Image 
            source={require('../assets/bee2.png')} 
            style={styles.beeImage}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name="lock-closed" size={32} color="#9ca3af" />
        )}
      </TouchableOpacity>
    );
  };

  const renderUnit = (unitData, unitIndex) => {
    return (
      <View key={unitData.unit_number} style={styles.unitContainer}>
        <View style={styles.unitHeader}>
          <Text style={styles.unitTitle}>Unit {unitData.unit_number}</Text>
        </View>

        <View style={styles.sectionsPath}>
          {unitData.sections.map((section, sectionIndex) => (
            <View key={section.id} style={styles.sectionWrapper}>
              {renderSection(section, unitIndex, sectionIndex)}
              <Text style={styles.sectionLabel}>{section.title}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B3C5D" />
          <Text style={styles.loadingText}>Loading practice...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;
  
  const xpValue = user?.xp || 0;
  const xpProgress = Math.min(xpValue, XP_MAX) / XP_MAX;
  const xpLabel = `${Math.min(xpValue, XP_MAX)}/${XP_MAX} XP`;
  const streakValue = user?.streak || 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, { paddingTop: STATUSBAR_HEIGHT }]}>
        {/* Top Stats Bar (sama kayak Dashboard) */}
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

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Practice</Text>
          <Text style={styles.headerSubtitle}>Complete sections to gain XP</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {units.map((unitData, unitIndex) => (
            <View key={unitData.unit_number}>
              {renderUnit(unitData, unitIndex)}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
