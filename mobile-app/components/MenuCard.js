import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

const MenuCard = React.memo(({ menu }) => {
  const { cart, addToCart, updateQty, removeItem } = useCart();

  const menuId = menu.id ?? menu.menu_id;
  const cartItem = cart.find(item => item.menu_id === menuId);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(menu);
    } else {
      updateQty(menuId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQty(menuId, quantity - 1);
    } else {
      removeItem(menuId);
    }
  };

  const price = menu.price ? parseInt(menu.price) : 0;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          source={menu.image_url ? { uri: menu.image_url } : { uri: 'https://via.placeholder.com/150' }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>{menu.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {menu.description || 'Delicious item from our menu.'}
            </Text>
            <Text style={styles.price}>Rp {price.toLocaleString('id-ID')}</Text>
          </View>
          
          {quantity === 0 ? (
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qtyContainer}>
              <TouchableOpacity 
                style={styles.qtyButton} 
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.qtyButton} 
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    lineHeight: 16,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ff4757',
  },  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4757',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 16,
    textAlign: 'center',
  },  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff4757',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ff4757',
    fontWeight: '600',
    fontSize: 12,
  },
});

export default MenuCard;
