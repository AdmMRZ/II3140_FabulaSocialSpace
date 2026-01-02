
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import { CartContext } from '../contexts/CartContext';

export default function PaymentScreen({ route, navigation }) {
  const { clear: clearCart } = useContext(CartContext) || { clear:()=>{} };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const orderData = route?.params?.orderData;
  if (!orderData) {
    navigation.navigate('Checkout');
    return null;
  }
  return (
    <View style={styles.paymentContainer}>
      <Navbar />
      <View style={styles.successContainer}>
        <Text style={styles.successTitle}>Complete Your Payment</Text>
        <View style={styles.orderDetails}>
          <View style={styles.orderInfo}><Text style={styles.orderLabel}>Table Number:</Text><Text style={styles.orderValue}>{orderData.table_number}</Text></View>
          <View style={styles.orderInfo}><Text style={styles.orderLabel}>Total Amount:</Text><Text style={styles.orderValue}>Rp {parseInt(orderData.total_amount).toLocaleString()}</Text></View>
        </View>
        <View style={styles.qrisContainer}>
          <Image
            source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Order:${orderData.table_number}_Amount:${orderData.total_amount}` }}
            style={styles.qrisImage}
          />
        </View>
        <Text style={styles.qrisHelp}>Please scan this QR code with your preferred payment app</Text>
        {!!error && <Text style={styles.statusError}>{error}</Text>}
        <View style={styles.buttonsGrid}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={async () => {
              try {
                setLoading(true);
                setError('');
                // Simulasi postOrder, bisa dihubungkan ke backend
                // await postOrder(orderData);
                clearCart();
                navigation.navigate('Menu');
              } catch (err) {
                setError('Error processing order. Please try again.');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff',fontWeight:'bold'}}>Confirm Order</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentContainer: { flex: 1, backgroundColor: '#fff' },
  successContainer: { alignItems: 'center', marginTop: 32, padding: 16 },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  orderDetails: { marginBottom: 16 },
  orderInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  orderLabel: { fontWeight: 'bold', marginRight: 8 },
  orderValue: { color: '#ff4757', fontWeight: 'bold' },
  qrisContainer: { marginVertical: 16 },
  qrisImage: { width: 200, height: 200, borderRadius: 8 },
  qrisHelp: { color: '#888', marginTop: 8, marginBottom: 16 },
  statusError: { color: '#ff4757', marginTop: 8 },
  buttonsGrid: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  actionBtn: { backgroundColor: '#ff4757', borderRadius: 8, padding: 16, alignItems: 'center', minWidth: 160 },
});
