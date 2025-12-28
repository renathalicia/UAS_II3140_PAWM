import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './AuthScreen.style';
import { login, register } from '../services/authService';

export default function AuthScreen() {
  const navigation = useNavigation();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';

  // slider animation (0 = login, 1 = register)
  const slideAnim = useRef(new Animated.Value(0)).current;

  // measure switch width so translateX is numeric
  const [switchWidth, setSwitchWidth] = useState(0);
  const sliderWidth = useMemo(() => switchWidth / 2, [switchWidth]);

  const translateX = useMemo(() => {
    const toX = Number.isFinite(sliderWidth) ? sliderWidth : 0;
    return slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, toX],
    });
  }, [slideAnim, sliderWidth]);

  const switchMode = (target) => {
    if (target === mode) return;

    setMode(target);
    Animated.spring(slideAnim, {
      toValue: target === 'login' ? 0 : 1,
      useNativeDriver: false,
    }).start();
  };

  /* ===== FORM STATES ===== */
  const [fullName, setFullName] = useState('');
  const [nim, setNim] = useState('');
  const [fakultas, setfakultas] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const user = await login(nim, password);

        // Pindah ke Dashboard + kirim userId (karena login kamu pakai table users)
        navigation.replace('Dashboard', { userId: user.id });
      } else {
        await register({ fullName, nim, password });

        Alert.alert('Registrasi berhasil', 'Silakan login');
        switchMode('login');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  // ===== Slot atas harus sejajar antara login & register =====
  const slot1Label = isRegister ? 'Nama Lengkap' : 'NIM';
  const slot1Value = isRegister ? fullName : nim;
  const slot1OnChange = isRegister ? setFullName : setNim;
  const slot1Placeholder = isRegister ? 'Masukkan Nama Lengkap' : 'Masukkan NIM';
  const slot1KeyboardType = isRegister ? 'default' : 'numeric';

  const slot2Label = isRegister ? 'NIM' : 'Password';
  const slot2Value = isRegister ? nim : password;
  const slot2OnChange = isRegister ? setNim : setPassword;
  const slot2Placeholder = isRegister ? 'Masukkan NIM' : 'Masukkan Password';
  const slot2KeyboardType = isRegister ? 'numeric' : 'default';
  const slot2Secure = isLogin;

  return (
    <ImageBackground
      source={require('../assets/itb-foto.png')}
      style={styles.background}
      resizeMode="cover"
      fadeDuration={0}
    >
      <View style={styles.overlay}>
        {/* ===== ZONA ATAS ===== */}
        <View style={styles.topSection}>
          <Image
            source={require('../assets/itb-logo.png')}
            style={styles.logoITB}
            fadeDuration={0}
          />
        </View>

        {/* ===== ZONA TENGAH ===== */}
        <View style={styles.middleSection}>
          {/* ===== SWITCH ===== */}
          <View
            style={styles.switchContainer}
            onLayout={(e) => setSwitchWidth(e.nativeEvent.layout.width)}
          >
            <Animated.View
              style={[
                styles.slider,
                {
                  width: sliderWidth || '50%',
                  transform: [{ translateX }],
                },
              ]}
            />

            <TouchableOpacity style={styles.tab} onPress={() => switchMode('login')}>
              <Text style={[styles.tabText, isLogin ? styles.tabTextActive : styles.tabTextInactive]}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab} onPress={() => switchMode('register')}>
              <Text style={[styles.tabText, isRegister ? styles.tabTextActive : styles.tabTextInactive]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* ===== FORM ===== */}
          <View style={styles.form}>
            {/* Slot 1 */}
            <Text style={styles.label}>{slot1Label}</Text>
            <TextInput
              style={styles.input}
              value={slot1Value}
              onChangeText={slot1OnChange}
              placeholder={slot1Placeholder}
              keyboardType={slot1KeyboardType}
              autoCapitalize="none"
            />

            {/* Slot 2 */}
            <Text style={styles.label}>{slot2Label}</Text>
            <TextInput
              style={styles.input}
              value={slot2Value}
              onChangeText={slot2OnChange}
              placeholder={slot2Placeholder}
              keyboardType={slot2KeyboardType}
              secureTextEntry={slot2Secure}
              autoCapitalize="none"
            />

            {/* Slot 3: Fakultas (register only, tapi tetap ambil tempat saat login) */}
            <View pointerEvents={isRegister ? 'auto' : 'none'} style={!isRegister && styles.invisible}>
              <Text style={styles.label}>Fakultas</Text>
              <TextInput
                style={styles.input}
                value={fakultas}
                onChangeText={setfakultas}
                placeholder="Masukkan Fakultas"
              />
            </View>

            {/* Slot 4: Password (register only, tapi tetap ambil tempat saat login) */}
            <View pointerEvents={isRegister ? 'auto' : 'none'} style={!isRegister && styles.invisible}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan Password"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submitText}>{isLogin ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ===== ZONA BAWAH ===== */}
        <View style={styles.bottomSection}>
          <Image
            source={require('../assets/logo-lingobee.png')}
            style={styles.logoBee}
            fadeDuration={0}
          />
        </View>
      </View>
    </ImageBackground>
  );
}