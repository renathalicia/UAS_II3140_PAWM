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

  return (
    <View style={{ flex: 1 }}>
      <AppNavigator />
    </View>
  );
}
