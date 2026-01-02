
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { CartContext } from '../contexts/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, updateQty, removeItem, totalPrice } = useContext(CartContext) || { cart: [], updateQty:()=>{}, removeItem:()=>{}, totalPrice:0 };
  const [table, setTable] = useState('');
  const [error, setError] = useState('');

  return (
    <ScrollView style={styles.checkout}>
      <Navbar />
      <Text style={styles.header}>Your Cart</Text>
      <View style={styles.checkoutMain}>
        <View style={{flex:1}}>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}><Text>Your cart is empty.</Text></View>
          ) : (
            <View style={styles.cartList}>
              {cart.map(item => (
                <View key={item.menu_id} style={styles.cartItem}>
                  <View style={styles.cartItemLeft}>
                    <Image source={item.image ? {uri: item.image} : { uri: 'https://via.placeholder.com/150' }} style={styles.cartThumb} />
                    <View>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemMeta}>Qty: {item.quantity} • Rp {item.price?.toLocaleString?.() || item.price}</Text>
                    </View>
                  </View>
                  <View style={styles.cartItemControls}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.menu_id, Math.max(1, item.quantity-1))}><Text>-</Text></TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.menu_id, item.quantity+1)}><Text>+</Text></TouchableOpacity>
                    <Text style={styles.cartPrice}>Rp {(item.price * item.quantity)?.toLocaleString?.() || (item.price * item.quantity)}</Text>
                    <TouchableOpacity style={styles.removeBtn} onPress={() => removeItem(item.menu_id)}><Text>Remove</Text></TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}><Text>Items</Text><Text>{cart.length}</Text></View>
          <View style={styles.summaryRow}><Text>Subtotal</Text><Text>Rp {totalPrice?.toLocaleString?.() || totalPrice}</Text></View>
          <View style={{height:12}} />
          <View style={styles.inputGroup}>
            <Text>Table Number <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.tableInput}
              value={table}
              onChangeText={t => { setTable(t); setError(''); }}
              placeholder="e.g. 12"
              keyboardType="numeric"
            />
            {!!error && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <View style={styles.summaryRow}><Text style={{fontWeight:'bold'}}>Total</Text><Text style={styles.totalAmount}>Rp {totalPrice?.toLocaleString?.() || totalPrice}</Text></View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => {
              if (!table) { setError('Table number is required'); return; }
              if (!cart.length) { setError('Cart is empty'); return; }
              const orderData = {
                table_number: parseInt(table),
                items: cart.map(i=>({menu_id:i.menu_id, quantity:i.quantity})),
                total_amount: totalPrice
              };
              navigation.navigate('Payment', { orderData });
            }}
          >
            <Text style={{color:'#fff',fontWeight:'bold'}}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  checkout: { flex: 1, backgroundColor: '#fff' },
  header: { textAlign: 'center', marginVertical: 20, fontSize: 24, fontWeight: 'bold' },
  checkoutMain: { flexDirection: 'row', padding: 16 },
  emptyCart: { alignItems: 'center', marginTop: 32 },
  cartList: {},
  cartItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, backgroundColor:'#f8f9fa', borderRadius:8, padding:8 },
  cartItemLeft: { flexDirection: 'row', alignItems: 'center', flex:1 },
  cartThumb: { width: 48, height: 48, borderRadius: 8, marginRight: 12 },
  cartItemName: { fontWeight: 'bold', fontSize: 16 },
  cartItemMeta: { color: '#888', fontSize: 13 },
  cartItemControls: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  qtyBtn: { backgroundColor: '#eee', borderRadius: 4, padding: 4, marginHorizontal: 2 },
  qtyText: { minWidth: 24, textAlign: 'center' },
  cartPrice: { marginHorizontal: 8, fontWeight: 'bold' },
  removeBtn: { backgroundColor: '#ff4757', borderRadius: 4, padding: 4, marginLeft: 4 },
  summary: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginLeft: 16, minWidth: 200, elevation: 2 },
  summaryTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  inputGroup: { marginVertical: 8 },
  required: { color: '#ff4757' },
  tableInput: { borderWidth: 1, borderColor: '#eee', borderRadius: 4, padding: 8, marginTop: 4 },
  errorText: { color: '#ff4757', marginTop: 4 },
  totalAmount: { color: '#ff4757', fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#ff4757', borderRadius: 8, padding: 12, marginTop: 16, alignItems: 'center' },
});
