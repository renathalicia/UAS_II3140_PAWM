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

import styles from './RegisterScreen.style';
import { register } from '../services/authService';

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!fullName || !nim || !password) {
      Alert.alert('Error', 'Semua field wajib diisi');
      return;
    }

    try {
      await register({ fullName, nim, password });
      Alert.alert('Registrasi berhasil', 'Silakan login');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Registrasi gagal', error.message);
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

          {/* Switch */}
          <View style={styles.switch}>
            <TouchableOpacity
              style={styles.inactiveBtn}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.inactiveText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activeBtn}>
              <Text style={styles.activeText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Masukkan Nama Lengkap"
          />

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

          <TouchableOpacity style={styles.submit} onPress={handleRegister}>
            <Text style={styles.activeText}>Register</Text>
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
