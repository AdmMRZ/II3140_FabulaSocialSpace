import React, { useContext, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function PaymentScreen({ route, navigation }) {
  const { clear: clearCart } = useCart();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const orderData = route?.params?.orderData;

  if (!orderData) {
    navigation.navigate('Checkout');
    return null;
  }

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      alert('Order placed successfully!');
    } catch (err) {
      setError('Error processing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        user={user}
        onLogout={logout}
        onCartPress={() => navigation.navigate('Checkout')}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.subtitle}>Scan QRIS to pay</Text>

        <View style={styles.card}>
          <View style={styles.qrContainer}>
            <Image
              source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Order:${orderData.table_number}_Amount:${orderData.total_amount}` }}
              style={styles.qrImage}
            />
          </View>
          
          <View style={styles.details}>
            <View style={styles.row}>
              <Text style={styles.label}>Table Number</Text>
              <Text style={styles.value}>{orderData.table_number}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount</Text>
              <Text style={styles.totalValue}>Rp {parseInt(orderData.total_amount * 1.1).toLocaleString('id-ID')}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.instruction}>
          Show this QR code to the cashier or scan with your payment app.
        </Text>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity 
          style={styles.confirmButton} 
          onPress={handleConfirm}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>I Have Paid</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  qrContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 24,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  details: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ff4757',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 16,
  },
  instruction: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  errorText: {
    color: '#ff4757',
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: '#1a1a1a',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
