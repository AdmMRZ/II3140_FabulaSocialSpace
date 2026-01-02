import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

const expoClientId = '513713663593-g19g4o46362o3tro6hl8m5dmbc8kgjso.apps.googleusercontent.com';
const username = 'AdmMRZ';
const slug = 'fabula-mobile'; 
const redirectUri = AuthSession.makeRedirectUri({
  useProxy: true,
  path: `/${username}/${slug}`,
});

export default function Auth({ onLogin }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    redirectUri,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      onLogin(authentication);
    }
  }, [response]);

  return (
    <View style={styles.authContainer}>
      <TouchableOpacity style={styles.googleBtn} onPress={() => promptAsync()}>
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
