import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ route }) {
  const title = route?.params?.title || 'Screen';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title} Screen</Text>
      <Text style={styles.subtext}>(Coming Soon)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fa',
  },
  text: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0B3C5D',
  },
  subtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#6b7280',
  },
});