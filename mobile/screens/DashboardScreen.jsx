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
  Modal,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './DashboardScreen.style';
import { getSupabase } from '../services/supabase';

const XP_MAX = 100;
const TOPBAR_HEIGHT = 64;

function Dropdown({ label, value, onSelect, options = [] }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (opt) => {
    setOpen(false);
    onSelect(opt.value);
  };

  const displayLabel = () => {
    if (!value) return label;
    const found = options.find((o) => o.value === value);
    return found ? found.label : String(value);
  };

  return (
    <>
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={styles.dropdownLabel}>{displayLabel()}</Text>
        <Ionicons name="chevron-down" size={18} color="#0b2b3a" />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.dropdownBackdrop} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.dropdownModal}>
            <FlatList
              data={options}
              keyExtractor={(it) => String(it.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.dropdownItem, item.value === value && styles.dropdownItemSelected]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.dropdownItemText, item.value === value && styles.dropdownItemTextSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default function DashboardScreen({ navigation, route }) {
  const userId = route?.params?.userId;
  const screenW = Dimensions.get('window').width;
  const FEATURED_CARD_WIDTH = screenW - 32;
  const FEATURED_ITEM_WIDTH = FEATURED_CARD_WIDTH + 12;

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const [featured, setFeatured] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const [materials, setMaterials] = useState([]);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [filters, setFilters] = useState({
    chapter: '',
    category: '',
    search: '',
  });
  const [searchInput, setSearchInput] = useState('');

  const featuredScrollRef = useRef(null);

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

    const [userRes, statsRes, featuredRes, chaptersRes, categoriesRes] = await Promise.all([
      supabase.from('users').select('id, full_name, level, xp, streak').eq('id', userId).maybeSingle(),
      supabase
        .from('user_practice_stats')
        .select('total_xp_earned, current_streak_days')
        .eq('user_id', userId)
        .maybeSingle(),
      supabase
        .from('featured_news')
        .select('id, title, description, image_url, link_url, content')
        .eq('is_active', true)
        .order('order_index', { ascending: true }),
      supabase.from('learning_materials').select('chapter').eq('is_active', true).not('chapter', 'is', null),
      supabase.from('learning_materials').select('category').eq('is_active', true).not('category', 'is', null),
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
      .select('id, title, description, chapter, category, level, thumbnail_url, content, date_published')
      .eq('is_active', true)
      .order('date_published', { ascending: false })
      .limit(50);

    if (filters.chapter) q = q.eq('chapter', filters.chapter);
    if (filters.category) q = q.eq('category', filters.category);

    if (filters.search) {
      const s = filters.search.replace(/,/g, '');
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
  }, [userId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
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
  }, [filters.chapter, filters.category, filters.search, userId]);

  const applySearch = () => {
    setFilters((p) => ({ ...p, search: (searchInput || '').trim() }));
  };

  const clearSearch = () => {
    setSearchInput('');
    setFilters((p) => ({ ...p, search: '' }));
  };

  // useMomentum end instead of onScroll; avoid frequent state updates while user is dragging
  const onFeaturedMomentumEnd = (event) => {
    const scrollX = event.nativeEvent?.contentOffset?.x ?? 0;
    const newIndex = Math.round(scrollX / FEATURED_ITEM_WIDTH);
    if (newIndex >= 0 && newIndex < featured.length && newIndex !== featuredIndex) {
      setFeaturedIndex(newIndex);
    }
  };

  const renderMaterialItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.materialCard}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('MaterialDetail', { materialId: item.id })}
      >
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

  const chapterOptionsForDropdown = [
    { label: 'Semua Bab', value: '' },
    ...(chapterOptions.length
      ? chapterOptions.map((c) => ({ label: c, value: c }))
      : Array.from({ length: 9 }, (_, i) => ({ label: `Chapter ${i + 1}`, value: `Chapter ${i + 1}` }))),
  ];

  const defaultCategories = ['Grammar', 'Listening', 'Reading', 'Speaking', 'Vocabulary'];
  const categoryOptionsForDropdown = [
    { label: 'Semua Kategori', value: '' },
    ...(categoryOptions.length
      ? categoryOptions.map((c) => ({ label: c, value: c }))
      : defaultCategories.map((c) => ({ label: c, value: c }))),
  ];

  // Memoize header to avoid re-creating on every render (prevent ScrollView reset)
  const ScrollableHeader = useMemo(() => {
    return (
      <View>
        <View style={styles.headerBlock}>
          <Text style={styles.helloText} numberOfLines={1}>
            Halo, {user?.full_name ?? 'User'}
          </Text>
          <Text style={styles.subGreeting}>Selamat datang di Lingobee</Text>
        </View>

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
              blurOnSubmit={Platform.OS === 'ios' ? false : true}
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

        {featured?.length ? (
          <View style={styles.featuredWrap}>
            <ScrollView
              ref={featuredScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              onMomentumScrollEnd={onFeaturedMomentumEnd} // use momentum end
              decelerationRate="fast"
              snapToInterval={FEATURED_ITEM_WIDTH}
              snapToAlignment="start"
              disableIntervalMomentum={true}
            >
              {featured.map((item) => (
                <TouchableOpacity
                  key={String(item.id)}
                  style={[styles.featuredCard, { width: FEATURED_CARD_WIDTH, marginRight: 12 }]}
                  activeOpacity={0.95}
                  onPress={() => navigation.navigate('NewsDetail', { newsId: item.id })}
                >
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

                    <View style={styles.readBtn}>
                      <Text style={styles.readBtnText}>Baca</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.dotsRow}>
              {featured.map((_, idx) => (
                <View key={idx} style={[styles.dot, idx === featuredIndex && styles.dotActive]} />
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.materiHeader}>
          <Text style={styles.sectionTitle}>Materi</Text>

          <View style={styles.filterRow}>
            <Dropdown
              label="Semua Bab"
              value={filters.chapter}
              options={chapterOptionsForDropdown}
              onSelect={(v) => setFilters((p) => ({ ...p, chapter: v }))}
            />

            <Dropdown
              label="Semua Kategori"
              value={filters.category}
              options={categoryOptionsForDropdown}
              onSelect={(v) => setFilters((p) => ({ ...p, category: v }))}
            />
          </View>
        </View>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featured, user, searchInput, featuredIndex, FEATURED_CARD_WIDTH, filters.chapter, filters.category]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0063a3" />
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;
  const TOPBAR_TOTAL = TOPBAR_HEIGHT + STATUSBAR_HEIGHT;

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
      </View>

      <FlatList
        data={materials}
        keyExtractor={(it) => String(it.id)}
        numColumns={2}
        columnWrapperStyle={styles.materialGridRow}
        contentContainerStyle={[styles.listContent, { paddingTop: TOPBAR_TOTAL + 12 }]}
        ListHeaderComponent={ScrollableHeader}
        renderItem={renderMaterialItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada materi untuk filter/pencarian ini.</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}