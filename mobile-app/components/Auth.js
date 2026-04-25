import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { useAuth } from '../contexts/AuthContext';

WebBrowser.maybeCompleteAuthSession();

const webClientId = '713129020648-19pclk3g243ti3mhu6l7fv7k7ll7kndc.apps.googleusercontent.com';
const iosClientId = '713129020648-19pclk3g243ti3mhu6l7fv7k7ll7kndc.apps.googleusercontent.com'; // Create iOS Client ID if needed
const androidClientId = '713129020648-rio3c03pbig7fqgkdre9vm6a2kvkj4s7.apps.googleusercontent.com'; 

export default function Auth() {
  const { loginWithGoogle } = useAuth();

  const redirectUri = makeRedirectUri({
    scheme: 'com.fabula.mobile',
    path: 'oauth2redirect/google'
  });

  const finalRedirectUri = redirectUri.includes('exp://') 
    ? 'https://auth.expo.io/@aqmarfayyaz/fabula-mobile'
    : redirectUri;

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId,
    iosClientId,
    androidClientId,
    redirectUri: finalRedirectUri,
    scopes: ['profile', 'email'],
  });

  React.useEffect(() => {
    const handleAuth = async () => {
      if (response?.type !== 'success') {
        if (response?.type === 'error') {
          Alert.alert('Login Error', response?.error?.message || 'Failed to authenticate');
        }
        return;
      }

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
        onPress={() => {
          console.log("Prompting async with redirectUri:", finalRedirectUri);
          promptAsync({ redirectUri: finalRedirectUri });
        }}
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
