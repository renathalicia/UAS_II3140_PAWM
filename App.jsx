import React from 'react';
import { View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import AppNavigator from './mobile/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  // Saat font belum siap, tetap tampilkan splash GIF (jadi tidak blank / tidak loncat)
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <Image
          source={require('./mobile/assets/splashscreen.gif')}
          style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
          fadeDuration={0}
        />
      </View>
    );
  }

  // Setelah font siap, Navigator tetap mulai dari Splash screen (lihat AppNavigator: initialRouteName="Splash")
  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}