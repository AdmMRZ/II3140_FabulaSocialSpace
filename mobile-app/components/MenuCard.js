import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useDrop } from '../contexts/DropContext';
import Draggable from 'react-native-draggable';

export default function MenuCard({ menu }) {
  const { addToCart } = useCart();
  const { tryDrop } = useDrop();

  return (
    <Draggable
      x={0}
      y={0}
      renderSize={100}
      renderColor="transparent"
      renderText=""
      isCircle={false}
      shouldReverse={true}
      children={
        <TouchableOpacity style={styles.card}>
          <Image
            source={menu.image_url ? { uri: menu.image_url } : { uri: 'https://via.placeholder.com/150' }}
            style={styles.image}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{menu.name}</Text>
            <Text style={styles.price}>Rp{menu.price}</Text>
            <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(menu)}>
              <Text style={styles.addBtnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      }
      onShortPressRelease={() => addToCart(menu)}
      onDragRelease={(e, gestureState) => {
        // gestureState.moveX/moveY are screen coords
        const x = gestureState.moveX;
        const y = gestureState.moveY;
        try {
          if (tryDrop) tryDrop(menu, x, y);
        } catch (err) {
          // ignore
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    color: '#888',
    marginBottom: 8,
  },
  addBtn: {
    backgroundColor: '#3c4043',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
