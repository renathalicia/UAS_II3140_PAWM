import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import AssignmentDetailScreen from '../screens/AssignmentDetailScreen';
import PracticeQuizScreen from '../screens/PracticeQuizScreen';
import BottomTabNavigator from './ButtomTabNavigator'; // <- sesuaikan dengan nama file di repo

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        <Stack.Screen name="AssignmentDetail" component={AssignmentDetailScreen} />
        <Stack.Screen name="PracticeQuiz" component={PracticeQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}