import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MaterialDetailScreen.style';
import { getSupabase } from '../services/supabase';

export default function MaterialDetailScreen({ navigation, route }) {
  const materialId = route?.params?.materialId;
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('learning_materials')
          .select('*')
          .eq('id', materialId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Materi tidak ditemukan');

        if (mounted) setMaterial(data);
      } catch (e) {
        Alert.alert('Error', e?.message || 'Gagal memuat materi');
        navigation.goBack();
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [materialId, navigation]);

  const openContentUrl = () => {
    if (material?.content) {
      Linking.openURL(material.content).catch(() => {
        Alert.alert('Error', 'Tidak dapat membuka link');
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0063a3" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Materi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentInner}>
        {/* COVER IMAGE */}
        <View style={styles.coverWrap}>
          {material?.thumbnail_url ? (
            <Image source={{ uri: material.thumbnail_url }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverImagePlaceholder} />
          )}
        </View>

        <View style={styles.body}>
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{material?.chapter || '—'}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{material?.category || '—'}</Text>
            {material?.level ? (
              <>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>Level {material.level}</Text>
              </>
            ) : null}
          </View>

          <Text style={styles.title}>{material?.title || 'Tanpa Judul'}</Text>
          <Text style={styles.description}>{material?.description || ''}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Konten Materi</Text>
          <Text style={styles.contentText}>
            {material?.content ? material.content : 'Konten belum tersedia.'}
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
