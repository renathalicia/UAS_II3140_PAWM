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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './NewsDetailScreen.style';
import { getSupabase } from '../services/supabase';

export default function NewsDetailScreen({ navigation, route }) {
  const newsId = route?.params?.newsId;
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('featured_news')
          .select('*')
          .eq('id', newsId)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('Berita tidak ditemukan');

        if (mounted) setNews(data);
      } catch (e) {
        Alert.alert('Error', e?.message || 'Gagal memuat berita');
        navigation.goBack();
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [newsId, navigation]);

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
        <Text style={styles.headerTitle}>Berita</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentInner}>
        {/* COVER IMAGE */}
        <View style={styles.coverWrap}>
          {news?.image_url ? (
            <Image source={{ uri: news.image_url }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverImagePlaceholder} />
          )}
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{news?.title || 'Tanpa Judul'}</Text>
          <Text style={styles.description}>{news?.description || ''}</Text>

          <View style={styles.divider} />

          <Text style={styles.contentText}>{news?.content || 'Konten tidak tersedia.'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
