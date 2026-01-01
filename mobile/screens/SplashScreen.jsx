import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated } from 'react-native';
import { Asset } from 'expo-asset';
import style from './SplashScreen.style';

const SPLASH_MIN_MS = 3000;

export default function SplashScreen({ navigation }) {
  const didNavigateRef = useRef(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let cancelled = false;

    const preloadAssets = async () => {
      try {
        // Preload semua assets yang dibutuhkan
        await Asset.loadAsync([
          require('../assets/splashscreen.gif'),
          require('../assets/itb-foto.png'),
          require('../assets/itb-logo.png'),
          require('../assets/logo-lingobee.png'),
          require('../assets/bee2.png'),
        ]);

        if (!cancelled) {
          setAssetsLoaded(true);
        }
      } catch (error) {
        console.error('Error loading assets:', error);
        if (!cancelled) {
          setAssetsLoaded(true); // Tetap lanjut meskipun ada error
        }
      }
    };

    preloadAssets();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!assetsLoaded) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (cancelled || didNavigateRef.current) return;

      // Fade out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (cancelled || didNavigateRef.current) return;
        
        didNavigateRef.current = true;
        navigation.replace('Auth');
      });
    }, SPLASH_MIN_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [assetsLoaded, navigation, fadeAnim]);

  return (
    <Animated.View style={[style.container, { opacity: fadeAnim }]}>
      <Image
        source={require('../assets/splashscreen.gif')}
        style={style.image}
        fadeDuration={0}
        resizeMode="cover"
      />
    </Animated.View>
  );
}