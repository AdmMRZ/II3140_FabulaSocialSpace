
import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useDrop } from '../contexts/DropContext';

export default function Navbar({ user, onLogout, onCartPress }) {
  const cartRef = useRef(null);
  const { totalItems } = useCart();
  const { registerZone, unregisterZone } = useDrop();

  const onLayoutCart = () => {
    if (!cartRef.current) return;
    cartRef.current.measure((fx, fy, width, height, px, py) => {
      registerZone('cart', { x: px, y: py, width, height });
    });
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.left}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.brand}>Fabula Social Space</Text>
      </View>
      <View style={styles.right}>
        {/* Drop area for cart */}
        <TouchableOpacity
          ref={cartRef}
          style={styles.link}
          onPress={onCartPress}
          onLayout={onLayoutCart}
        >
          <Text style={styles.linkText}>Cart</Text>
          {totalItems > 0 && <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>{totalItems}</Text></View>}
        </TouchableOpacity>
        {user ? (
          <View style={styles.profile}>
            <Image source={{ uri: user.picture }} style={styles.profilePic} />
            <View>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
            <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}><Text style={styles.logoutText}>Logout</Text></TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#3c4043',
  },
  cartBadge: {
    backgroundColor: '#3c4043',
    borderRadius: 8,
    marginLeft: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  profileName: {
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#888',
    fontSize: 12,
  },
  logoutBtn: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: '#f1f3f4',
    borderRadius: 4,
  },
  logoutText: {
    color: '#3c4043',
    fontWeight: 'bold',
  },
});
