import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';

export default function Navbar({ user, onLogout, onCartPress }) {
  const { totalItems } = useCart();
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.left} 
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.7}
        >
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.brand} numberOfLines={1}>
            Fabula Social Space
          </Text>
        </TouchableOpacity>
        <View style={styles.right}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={onCartPress}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalItems}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 8,
  },
  brand: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1a1a1a',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4757',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
