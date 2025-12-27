import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import style from './SplashScreen.style';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function SplashScreen({ navigation }) {
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
          wait(5500),
        ]);
      } catch {
        // kalau preload gagal, tetap lanjut setelah durasi splash
        await wait(5500);
      }

      if (!cancelled) navigation.replace('Login');
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