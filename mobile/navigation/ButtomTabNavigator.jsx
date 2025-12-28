import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/DashboardScreen';
import styles from './ButtomTabNavigator.style';
// placeholder screens (akan dibuat menyusul)
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ route }) {
  const userId = route?.params?.userId;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#0B3C5D',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Assignment') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Practice') {
            iconName = focused ? 'extension-puzzle' : 'extension-puzzle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            <View style={styles.iconWrap}>
              {focused && <View style={styles.activeBubble} />}
              <Ionicons name={iconName} size={24} color={color} style={{ zIndex: 2 }} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        initialParams={{ userId }}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Assignment"
        component={PlaceholderScreen}
        initialParams={{ userId, title: 'Assignment' }}
        options={{ tabBarLabel: 'Assignment' }}
      />
      <Tab.Screen
        name="Practice"
        component={PlaceholderScreen}
        initialParams={{ userId, title: 'Practice' }}
        options={{ tabBarLabel: 'Practice' }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        initialParams={{ userId, title: 'Profile' }}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

