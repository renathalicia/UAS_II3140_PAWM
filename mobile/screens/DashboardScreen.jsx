import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import styles from './DashboardScreen.style';
import { getSupabase } from '../services/supabase';

const XP_MAX = 100;

export default function DashboardScreen({ navigation, route }) {
  const userId = route?.params?.userId;

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null); // users: id, full_name, level, xp, streak
  const [stats, setStats] = useState(null); // user_practice_stats (optional)

  const [featured, setFeatured] = useState([]); // featured_news
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const [materials, setMaterials] = useState([]); // learning_materials
  const [chapterOptions, setChapterOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [filters, setFilters] = useState({
    chapter: '',
    category: '',
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');

  const featuredListRef = useRef(null);
  const screenW = Dimensions.get('window').width;

  const xpValue = useMemo(() => {
    const raw = user?.xp ?? stats?.total_xp_earned ?? 0;
    return Number.isFinite(raw) ? raw : 0;
  }, [user?.xp, stats?.total_xp_earned]);

  const xpLabel = useMemo(() => `${Math.min(xpValue, XP_MAX)}/${XP_MAX} XP`, [xpValue]);

  const xpProgress = useMemo(() => {
    const v = Math.min(Math.max(xpValue, 0), XP_MAX);
    return XP_MAX === 0 ? 0 : v / XP_MAX;
  }, [xpValue]);

  const streakValue = useMemo(() => {
    const raw = user?.streak ?? stats?.current_streak_days ?? 0;
    return Number.isFinite(raw) ? raw : 0;
  }, [user?.streak, stats?.current_streak_days]);

  const fetchInitial = async () => {
    if (!userId) {
      navigation.replace('Auth');
      return;
    }

    const supabase = getSupabase();

    const [
      userRes,
      statsRes,
      featuredRes,
      chaptersRes,
      categoriesRes,
    ] = await Promise.all([
      supabase
        .from('users')
        .select('id, full_name, level, xp, streak')
        .eq('id', userId)
        .maybeSingle(),

      supabase
        .from('user_practice_stats')
        .select('total_xp_earned, current_streak_days')
        .eq('user_id', userId)
        .maybeSingle(),

      supabase
        .from('featured_news')
        .select('id, title, description, image_url, link_url')
        .eq('is_active', true)
        .order('order_index', { ascending: true }),

      // distinct-like (ambil semua lalu unique di client; schema fixed)
      supabase
        .from('learning_materials')
        .select('chapter')
        .eq('is_active', true)
        .not('chapter', 'is', null),

      supabase
        .from('learning_materials')
        .select('category')
        .eq('is_active', true)
        .not('category', 'is', null),
    ]);

    if (userRes.error) throw userRes.error;
    if (statsRes.error) throw statsRes.error;
    if (featuredRes.error) throw featuredRes.error;
    if (chaptersRes.error) throw chaptersRes.error;
    if (categoriesRes.error) throw categoriesRes.error;

    setUser(userRes.data || null);
    setStats(statsRes.data || null);
    setFeatured(featuredRes.data || []);

    const chapters = [...new Set((chaptersRes.data || []).map((r) => r.chapter).filter(Boolean))].sort();
    const categories = [...new Set((categoriesRes.data || []).map((r) => r.category).filter(Boolean))].sort();

    setChapterOptions(chapters);
    setCategoryOptions(categories);
  };

  const fetchMaterials = async () => {
    const supabase = getSupabase();

    let q = supabase
      .from('learning_materials')
      .select('id, title, description, chapter, category, thumbnail_url, date_published')
      .eq('is_active', true)
      .order('date_published', { ascending: false })
      .limit(50);

    if (filters.chapter) q = q.eq('chapter', filters.chapter);
    if (filters.category) q = q.eq('category', filters.category);

    // search ke title (dan fallback description bila mau)
    if (filters.search) {
      // PostgREST OR: title ILIKE or description ILIKE
      const s = filters.search.replace(/,/g, ''); // hindari comma bikin or() error
      q = q.or(`title.ilike.%${s}%,description.ilike.%${s}%`);
    }

    const { data, error } = await q;
    if (error) throw error;

    setMaterials(data || []);
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        await fetchInitial();
        await fetchMaterials();
      } catch (e) {
        console.error('Dashboard init error:', e);
        Alert.alert('Error', e?.message || 'Gagal memuat dashboard');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // jangan refetch ketika init masih loading pertama kali
        if (!userId) return;
        await fetchMaterials();
      } catch (e) {
        console.error('Materials fetch error:', e);
        if (mounted) Alert.alert('Error', e?.message || 'Gagal memuat materi');
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.chapter, filters.category, filters.search, userId]);

  const applySearch = () => {
    setFilters((p) => ({ ...p, search: (searchInput || '').trim() }));
  };

  const clearSearch = () => {
    setSearchInput('');
    setFilters((p) => ({ ...p, search: '' }));
  };

  const onFeaturedScroll = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const itemW = styles.featuredCardWidth; // not usable here (styles is object)
    // hitung index pakai lebar card yang kita pakai di render
    const CARD_W = Math.round(screenW - 32); // padding 16 kiri-kanan
    const idx = Math.round(x / CARD_W);
    setFeaturedIndex(Math.max(0, Math.min(idx, (featured?.length || 1) - 1)));
  };

  const renderFeaturedItem = ({ item }) => {
    const CARD_W = Math.round(screenW - 32);

    return (
      <View style={[styles.featuredCard, { width: CARD_W }]}>
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.featuredImage} />
        ) : (
          <View style={styles.featuredImage} />
        )}

        <View style={styles.featuredContent}>
          <Text style={styles.featuredTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.featuredDesc} numberOfLines={3}>
            {item.description}
          </Text>

          <TouchableOpacity style={styles.readBtn} activeOpacity={0.85}>
            <Text style={styles.readBtnText}>Baca</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMaterialItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.materialCard} activeOpacity={0.9}>
        <View style={styles.materialImageWrap}>
          {item.thumbnail_url ? (
            <Image source={{ uri: item.thumbnail_url }} style={styles.materialImage} />
          ) : (
            <View style={styles.materialImagePlaceholder} />
          )}
        </View>

        <View style={styles.materialBody}>
          <Text style={styles.materialTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.materialDesc} numberOfLines={2}>
            {item.description || ''}
          </Text>
          <Text style={styles.materialMeta} numberOfLines={1}>
            {(item.chapter || '—') + ' • ' + (item.category || '—')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const Header = () => (
    <View>
      {/* Safe top padding: tidak mentok notch/status bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.menuBtn}
          onPress={() => (navigation?.openDrawer ? navigation.openDrawer() : null)}
          activeOpacity={0.8}
        >
          <Ionicons name="menu" size={22} color="#111" />
        </TouchableOpacity>

        <View style={styles.topStats}>
          <View style={styles.topStatItem}>
            <Ionicons name="flame" size={16} color="#ff7a00" />
            <Text style={styles.topStatText}>{streakValue}</Text>
          </View>

          <View style={styles.topStatItem}>
            <Text style={styles.topStatLabel}>Lvl</Text>
            <Text style={styles.topStatText}>{user?.level ?? 1}</Text>
          </View>

          <View style={styles.xpWrap}>
            <View style={styles.xpBar}>
              <View style={[styles.xpFill, { width: `${Math.round(xpProgress * 100)}%` }]} />
            </View>
            <Text style={styles.xpText}>{xpLabel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.headerBlock}>
        <Text style={styles.helloText} numberOfLines={1}>
          Halo, {user?.full_name ?? 'User'}
        </Text>
        <Text style={styles.subGreeting}>Selamat datang di Lingobee</Text>
      </View>

      {/* Search bar dulu (sebelum featured) */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputWrap}>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="Cari sesuatu..."
            placeholderTextColor="#9aa3ad"
            style={styles.searchInput}
            returnKeyType="search"
            onSubmitEditing={applySearch}
          />
          {searchInput?.length ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearBtn} hitSlop={10}>
              <Ionicons name="close-circle" size={18} color="#9aa3ad" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={applySearch} activeOpacity={0.85}>
          <Ionicons name="search" size={18} color="#0b2b3a" />
        </TouchableOpacity>
      </View>

      {/* Featured carousel horizontal (tanpa judul "Berita Utama") */}
      {featured?.length ? (
        <View style={styles.featuredWrap}>
          <FlatList
            ref={featuredListRef}
            data={featured}
            keyExtractor={(it) => it.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={onFeaturedScroll}
            scrollEventThrottle={16}
            renderItem={renderFeaturedItem}
          />

          <View style={styles.dotsRow}>
            {featured.map((_, idx) => (
              <View key={idx} style={[styles.dot, idx === featuredIndex && styles.dotActive]} />
            ))}
          </View>
        </View>
      ) : null}

      {/* Materi + filter */}
      <View style={styles.materiHeader}>
        <Text style={styles.sectionTitle}>Materi</Text>

        <View style={styles.filterRow}>
          <View style={styles.pickerPill}>
            <Picker
              selectedValue={filters.chapter}
              onValueChange={(v) => setFilters((p) => ({ ...p, chapter: v }))}
            >
              <Picker.Item label="Semua Bab" value="" />
              {chapterOptions.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerPill}>
            <Picker
              selectedValue={filters.category}
              onValueChange={(v) => setFilters((p) => ({ ...p, category: v }))}
            >
              <Picker.Item label="Semua Kategori" value="" />
              {categoryOptions.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );

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
      <FlatList
        data={materials}
        keyExtractor={(it) => it.id}
        numColumns={2}
        columnWrapperStyle={styles.materialGridRow}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={Header}
        renderItem={renderMaterialItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Tidak ada materi untuk filter/pencarian ini.
          </Text>
        }
      />
    </SafeAreaView>
  );
}