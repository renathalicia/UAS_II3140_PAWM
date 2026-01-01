import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigator from './mobile/navigation/AppNavigator';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts
        if (fontsLoaded) {
          // Small delay to ensure everything is loaded
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Expo splash screen tetap tampil
  }

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
