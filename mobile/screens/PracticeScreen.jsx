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

  const canAccessNode = (section, nodeIndex) => {
    // First node in first section of first unit is always accessible
    if (nodeIndex === 0) {
      return section.canAccess;
    }

    // Check if previous node is completed
    const prevNode = section.nodes[nodeIndex - 1];
    return prevNode.isCompleted;
  };

  const handleNodePress = (section, node, canAccess) => {
    if (!canAccess) {
      Alert.alert('Locked', 'Complete the previous stage to unlock this one');
      return;
    }

    navigation.navigate('PracticeQuiz', { 
      userId, 
      sectionId: section.id,
      nodeId: node.id,
      nodeType: node.node_type,
      xpReward: node.xp_reward || 10,
    });
  };

  const getNodeIcon = (node, canAccess) => {
    if (node.isCompleted) {
      return (
        <View style={styles.nodeCompleted}>
          <Ionicons name="checkmark" size={24} color="#10b981" />
        </View>
      );
    }

    if (!canAccess) {
      return (
        <View style={styles.nodeLocked}>
          <Ionicons name="lock-closed" size={20} color="#9ca3af" />
        </View>
      );
    }

    // Current active node
    return (
      <View style={styles.nodeActive}>
        <Ionicons name="play" size={20} color="#ffffff" />
      </View>
    );
  };

  const renderNode = (section, node, nodeIndex) => {
    const canAccess = canAccessNode(section, nodeIndex);
    const isCompleted = node.isCompleted;

    return (
      <TouchableOpacity
        key={node.id}
        style={[
          styles.nodeCircle,
          isCompleted && styles.nodeCircleCompleted,
          !canAccess && styles.nodeCircleLocked,
          canAccess && !isCompleted && styles.nodeCircleActive,
        ]}
        onPress={() => handleNodePress(section, node, canAccess)}
        disabled={!canAccess}
        activeOpacity={0.7}
      >
        <Image 
          source={require('../assets/bee2.png')} 
          style={styles.beeImage}
          resizeMode="contain"
        />
        {getNodeIcon(node, canAccess)}
      </TouchableOpacity>
    );
  };

  const renderSection = (section, unitIndex, sectionIndex) => {
    const nodes = section.nodes || [];
    const completedCount = nodes.filter(n => n.isCompleted).length;
    const totalCount = nodes.length;

    // Determine section color based on unit
    const sectionColors = ['#c084fc', '#fbbf24', '#34d399', '#60a5fa'];
    const colorIndex = unitIndex % sectionColors.length;
    const sectionColor = section.color || sectionColors[colorIndex];

    return (
      <View key={section.id} style={styles.sectionContainer}>
        {/* Section Header */}
        <View style={[styles.sectionHeader, { backgroundColor: sectionColor }]}>
          <View style={styles.sectionHeaderLeft}>
            {section.section_number && section.unit_number && (
              <Text style={styles.sectionHeaderText}>
                SECTION {section.section_number}, UNIT {section.unit_number}
              </Text>
            )}
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        </View>

        {/* Nodes Path */}
        <View style={styles.nodesPath}>
          {/* Big Bee on the left */}
          <Image 
            source={require('../assets/bee2.png')} 
            style={styles.beeLarge}
            resizeMode="contain"
          />

          {/* Nodes arranged in a path */}
          <View style={styles.nodesGrid}>
            {nodes.map((node, nodeIndex) => (
              <View key={node.id} style={styles.nodeWrapper}>
                {renderNode(section, node, nodeIndex)}
              </View>
            ))}
          </View>
        </View>

        {/* Progress Indicator */}
        {totalCount > 0 && (
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>
              {completedCount}/{totalCount} completed
            </Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${(completedCount / totalCount) * 100}%`,
                    backgroundColor: sectionColor 
                  }
                ]} 
              />
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderUnit = (unitData, unitIndex) => {
    return (
      <View key={`unit-${unitData.unit_number}-${unitIndex}`} style={styles.unitContainer}>
        {unitData.sections.map((section, sectionIndex) => {
          // Add canAccess property to section
          const canAccessSection = 
            (unitIndex === 0 && sectionIndex === 0) ||
            (sectionIndex > 0 && unitData.sections[sectionIndex - 1].isCompleted) ||
            (unitIndex > 0 && units[unitIndex - 1].sections[units[unitIndex - 1].sections.length - 1].isCompleted);

          return renderSection({ ...section, canAccess: canAccessSection }, unitIndex, sectionIndex);
        })}
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

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;
  const TOPBAR_HEIGHT = 64;
  const TOPBAR_TOTAL = TOPBAR_HEIGHT + STATUSBAR_HEIGHT + 8;
  
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: TOPBAR_TOTAL + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Practice</Text>
          <Text style={styles.headerSubtitle}>Complete sections to gain XP</Text>
        </View>

        {units.map((unitData, unitIndex) => (
          <View key={`unit-${unitData.unit_number}-${unitIndex}`}>
            {renderUnit(unitData, unitIndex)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
