import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useAuth } from '../contexts/AuthContext';

const expoClientId = '513713663593-105v397t19as7opec1o30nllvn8vd04m.apps.googleusercontent.com';
const androidClientId = expoClientId;
const iosClientId = expoClientId;
const username = 'AdmMRZ';
const slug = 'fabula-mobile'; 
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
  path: `/${username}/${slug}`,
});

export default function Auth() {
  const { loginWithGoogle } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    androidClientId,
    iosClientId,
    redirectUri,
  });

  React.useEffect(() => {
    const handleAuth = async () => {
      if (response?.type !== 'success') return;

      // Try to get an id_token or accessToken and forward to backend
      const credential =
        response.params?.id_token ||
        response.authentication?.idToken ||
        response.authentication?.accessToken;

      if (!credential) {
        Alert.alert('Login failed', 'No token returned from Google.');
        return;
      }

      const result = await loginWithGoogle(credential);
      if (!result.ok) {
        Alert.alert('Login failed', result.error || 'Unable to login with Google');
      }
    };

    handleAuth();
  }, [response, loginWithGoogle]);

  return (
    <View style={styles.authContainer}>
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={() => promptAsync({ useProxy: true })}
        disabled={!request}
        activeOpacity={0.8}
      >
        <Image source={require('../assets/google.png')} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  authContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 4,
  },
  googleIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  googleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3c4043',
  },
});
