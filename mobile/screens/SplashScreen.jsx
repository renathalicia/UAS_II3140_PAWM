import React, { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import style from './SplashScreen.style';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const SPLASH_MIN_MS = 5500;

export default function SplashScreen({ navigation }) {
  const didNavigateRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await Promise.all([
          Asset.loadAsync([
            require('../assets/splashscreen.gif'),
            require('../assets/itb-foto.png'),
            require('../assets/itb-logo.png'),
            require('../assets/logo-lingobee.png'),
          ]),
          wait(SPLASH_MIN_MS),
        ]);
      } catch {
        // kalau preload gagal, tetap lanjut setelah durasi splash minimum
        await wait(SPLASH_MIN_MS);
      }

      if (cancelled) return;
      if (didNavigateRef.current) return;

      didNavigateRef.current = true;
      navigation.replace('Auth');
    })();

    return () => {
      cancelled = true;
    };
  }, [navigation]);

  return (
    <View style={style.container}>
      <Image
        source={require('../assets/splashscreen.gif')}
        style={style.image}
        fadeDuration={0}
      />
    </View>
  );
}