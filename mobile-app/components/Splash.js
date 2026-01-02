import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Splash({ navigation }) {
  React.useEffect(() => {
    const t = setTimeout(() => navigation.replace('Home'), 2000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.replace('Home')}>
      <View style={styles.vignette} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.tag}>Fabula Social Space</Text>
      <Text style={styles.hint}>Tap to continue</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  tag: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  hint: {
    color: '#888',
    fontSize: 16,
  },
});
