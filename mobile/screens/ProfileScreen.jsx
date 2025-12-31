import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './ProfileScreen.style';
import { getSupabase } from '../services/supabase';
import {
  fetchUserTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  reorderTodos,
} from '../services/todosService';

export default function ProfileScreen({ navigation, route }) {
  const userId = route?.params?.userId;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [newTodoDeadline, setNewTodoDeadline] = useState(null);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadUserData();
    loadTodos();
  }, [userId]);

  const loadUserData = async () => {
    if (!userId) {
      navigation.replace('Auth');
      return;
    }

    try {
      setLoading(true);
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('users')
        .select('id, full_name, nim, level, xp, streak')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      setUser(data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat data user');
    } finally {
      setLoading(false);
    }
  };

  const loadTodos = async () => {
    if (!userId) return;
    const data = await fetchUserTodos(userId);
    setTodos(data);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              const supabase = getSupabase();
              await supabase.auth.signOut();
              navigation.replace('Auth');
            } catch (error) {
              Alert.alert('Error', 'Gagal logout');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleAddTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert('Error', 'Task name tidak boleh kosong');
      return;
    }

    const position = todos.length;
    const newTodo = await createTodo(
      userId,
      newTodoText.trim(),
      newTodoDeadline ? newTodoDeadline.toISOString() : null,
      position
    );

    setTodos([...todos, newTodo]);
    setNewTodoText('');
    setNewTodoDeadline(null);
  };

  const handleToggleTodo = async (todoId, checked) => {
    await updateTodo(todoId, { checked: !checked });
    setTodos((prev) =>
      prev.map((t) => (t.id === todoId ? { ...t, checked: !checked } : t))
    );
  };

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(todoId);
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const moveTodo = async (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= todos.length) return;

    const updated = [...todos];
    const moved = updated.splice(fromIndex, 1)[0];
    updated.splice(toIndex, 0, moved);

    setTodos(updated);
    await reorderTodos(updated);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const renderTodoItem = ({ item, index }) => (
    <View style={styles.todoItem}>
      <View style={styles.reorderButtons}>
        <TouchableOpacity
          onPress={() => moveTodo(index, index - 1)}
          disabled={index === 0}
        >
          <Ionicons
            name="chevron-up"
            size={20}
            color={index === 0 ? '#64748b' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => moveTodo(index, index + 1)}
          disabled={index === todos.length - 1}
        >
          <Ionicons
            name="chevron-down"
            size={20}
            color={index === todos.length - 1 ? '#64748b' : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => handleToggleTodo(item.id, item.checked)}
      >
        <Ionicons
          name={item.checked ? 'checkbox' : 'square-outline'}
          size={22}
          color={item.checked ? '#10b981' : '#cbd5e1'}
        />
      </TouchableOpacity>

      <View style={styles.todoContent}>
        <Text style={[styles.todoText, item.checked && styles.todoTextChecked]}>
          {item.text}
        </Text>
        {item.deadline && (
          <Text style={styles.todoDeadline}>
            📅 {new Date(item.deadline).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
        <Ionicons name="close-circle" size={22} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT =
    Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={[styles.container, { paddingTop: STATUSBAR_HEIGHT }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.avatarCircle} onPress={handleLogout}>
            <Text style={styles.avatarText}>
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.userName}>{user?.full_name || 'User'}</Text>
          <Text style={styles.userInstitute}>{user?.faculty || 'Insitut Teknologi Bandung'}</Text>
          <View style={styles.nimBadge}>
            <Text style={styles.nimText}>NIM: {user?.nim || '-'}</Text>
          </View>
        </View>

        {/* Real-time Clock */}
        <View style={styles.dateTimeRow}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>
              {currentDate.toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>
              {currentDate.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <Text style={styles.calendarTitle}>📅 Calendar </Text>

          <View style={styles.calendarHeader}>
            <TouchableOpacity
              style={styles.calendarNavBtn}
              onPress={() => navigateMonth(-1)}
            >
              <Ionicons name="chevron-back" size={18} color="#0B3C5D" />
            </TouchableOpacity>

            <Text style={styles.calendarMonthYear}>
              {currentMonth.toLocaleDateString('id-ID', {
                month: 'long',
                year: 'numeric'
              })}
            </Text>

            <TouchableOpacity
              style={styles.calendarNavBtn}
              onPress={() => navigateMonth(1)}
            >
              <Ionicons name="chevron-forward" size={18} color="#0B3C5D" />
            </TouchableOpacity>
          </View>

          <View style={styles.calendarWeekDays}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDayText}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarDays}>
            {days.map((day, index) => {
              if (!day) {
                return (
                  <View
                    key={`empty-${index}`}
                    style={[styles.calendarDay, styles.calendarDayEmpty]}
                  />
                );
              }

              const isToday =
                day.toDateString() === new Date().toDateString();
              const isSelected =
                day.toDateString() === selectedDate.toDateString();

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    isToday && styles.calendarDayToday,
                    isSelected && styles.calendarDaySelected,
                  ]}
                  onPress={() => setSelectedDate(day)}
                >
                  <Text
                    style={[
                      styles.calendarDayText,
                      isToday && styles.calendarDayTextToday,
                      isSelected && styles.calendarDayTextSelected,
                    ]}
                  >
                    {day.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* To Do List */}
        <View style={styles.todoSection}>
          <Text style={styles.todoTitle}>To Do List</Text>

          <View style={styles.todoInputCard}>
            <TextInput
              style={styles.todoInput}
              value={newTodoText}
              onChangeText={setNewTodoText}
              placeholder="Task name..."
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              style={styles.deadlineInputBtn}
              onPress={() => setShowDeadlinePicker(true)}
            >
              <View style={styles.deadlineInput}>
                <Text style={[
                  styles.deadlineInputText,
                  !newTodoDeadline && styles.deadlineInputPlaceholder
                ]}>
                  {newTodoDeadline
                    ? `📅 ${newTodoDeadline.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}`
                    : 'Pilih deadline (opsional)...'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addBtn} onPress={handleAddTodo}>
              <Text style={styles.addBtnText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {todos.length > 0 ? (
            <FlatList
              data={todos}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderTodoItem}
              scrollEnabled={false}
            />
          ) : (
            <View style={styles.emptyTodo}>
              <Ionicons name="checkbox-outline" size={48} color="rgba(255,255,255,0.3)" />
              <Text style={styles.emptyTodoText}>
                Belum ada tugas. Tambahkan tugas pertamamu!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {showDeadlinePicker && (
        <DateTimePicker
          value={newTodoDeadline || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, d) => {
            setShowDeadlinePicker(false);
            if (d) setNewTodoDeadline(d);
          }}
        />
      )}
    </SafeAreaView>
  );
}