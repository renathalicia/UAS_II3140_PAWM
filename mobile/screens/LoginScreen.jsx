import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import styles from './LoginScreen.style';
import { login } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!nim || !password) {
      Alert.alert('Error', 'NIM dan password wajib diisi');
      return;
    }

    try {
      const user = await login(nim, password);
      Alert.alert('Login berhasil', `Selamat datang ${user.full_name}`);
    } catch (error) {
      Alert.alert('Login gagal', error.message);
    }
  };

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

          <View style={styles.switch}>
            <TouchableOpacity style={styles.activeBtn}>
              <Text style={styles.activeText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inactiveBtn}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.inactiveText}>Register</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>NIM</Text>
          <TextInput
            style={styles.input}
            value={nim}
            onChangeText={setNim}
            placeholder="Masukkan NIM"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Masukkan Password"
          />

          <TouchableOpacity style={styles.submit} onPress={handleLogin}>
            <Text style={styles.activeText}>Login</Text>
          </TouchableOpacity>

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
