import React from 'react';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import AppNavigator from './mobile/navigation/AppNavigator';

export default function App() {
  // tetap load font, tapi jangan nge-block UI awal (Splash tidak butuh font)
  useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  return <AppNavigator />;
}