import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function CheckoutScreen({ navigation }) {
  const { cart, updateQty, removeItem, totalPrice } = useCart();
  const { user, logout } = useAuth();
  const [table, setTable] = useState('');
  const [error, setError] = useState('');

  const handleCheckout = () => {
    if (!table.trim()) {
      setError('Please enter your table number');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    const orderData = {
      table_number: parseInt(table),
      items: cart.map(i => ({ menu_id: i.menu_id, quantity: i.quantity })),
      total_amount: totalPrice
    };
    
    navigation.navigate('Payment', { orderData });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        user={user}
        onLogout={logout}
        onCartPress={() => {}}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Checkout</Text>
        
        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <TouchableOpacity 
              style={styles.browseButton}
              onPress={() => navigation.navigate('Menu')}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.cartList}>
              {cart.map(item => (
                <View key={item.menu_id} style={styles.cartItem}>
                  <Image 
                    source={item.image_url ? { uri: item.image_url } : { uri: 'https://via.placeholder.com/150' }} 
                    style={styles.itemImage} 
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.itemPrice}>Rp {parseInt(item.price).toLocaleString('id-ID')}</Text>
                    
                    <View style={styles.controls}>
                      <View style={styles.qtyControl}>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQty(item.menu_id, Math.max(1, item.quantity - 1))}
                        >
                          <Text style={styles.qtyBtnText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.qtyText}>{item.quantity}</Text>
                        <TouchableOpacity 
                          style={styles.qtyBtn} 
                          onPress={() => updateQty(item.menu_id, item.quantity + 1)}
                        >
                          <Text style={styles.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <TouchableOpacity onPress={() => removeItem(item.menu_id)}>
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Table Number</Text>
                <TextInput
                  style={[styles.input, error && !table ? styles.inputError : null]}
                  value={table}
                  onChangeText={(t) => {
                    setTable(t);
                    setError('');
                  }}
                  placeholder="e.g. 12"
                  keyboardType="numeric"
                  maxLength={3}
                />
                {!!error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              <View style={styles.divider} />
              
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Subtotal</Text>
                <Text style={styles.rowValue}>Rp {totalPrice.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Tax (10%)</Text>
                <Text style={styles.rowValue}>Rp {(totalPrice * 0.1).toLocaleString('id-ID')}</Text>
              </View>
              <View style={[styles.row, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>Rp {(totalPrice * 1.1).toLocaleString('id-ID')}</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
            <Text style={styles.checkoutButtonPrice}>Rp {(totalPrice * 1.1).toLocaleString('id-ID')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginVertical: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  browseButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  cartList: {
    marginBottom: 24,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  itemPrice: {
    fontSize: 14,
    color: '#ff4757',
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    padding: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  removeText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1a1a1a',
  },
  inputError: {
    borderColor: '#ff4757',
  },
  errorText: {
    color: '#ff4757',
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#666',
  },
  rowValue: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ff4757',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  checkoutButton: {
    backgroundColor: '#ff4757',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  checkoutButtonPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    opacity: 0.9,
  },
});
