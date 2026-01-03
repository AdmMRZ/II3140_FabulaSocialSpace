import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function TenantRequestScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ tenant_name:'', contact:'', type:'', description:'' });
  const [sent, setSent] = useState(false);

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    if(!form.tenant_name || !form.contact || !form.type) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSent(true);
    } catch(e) {
      Alert.alert('Error', 'Failed to submit request. Please try again.');
    }
  };

  const handleReset = () => {
    setSent(false);
    setForm({ tenant_name:'', contact:'', type:'', description:'' });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        user={user}
        onLogout={logout}
        onCartPress={() => navigation.navigate('Checkout')}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sent ? (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Request Submitted!</Text>
            <Text style={styles.successText}>
              Thank you for your interest in becoming a tenant at Fabula Social Space. We will review your application and contact you soon.
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReset}>
              <Text style={styles.primaryButtonText}>Submit Another Request</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.secondaryButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Join Our Community</Text>
              <Text style={styles.subtitle}>Become a tenant at Fabula Social Space</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.benefitsScroll}>
              <View style={styles.benefitCard}>
                <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
                  <Text style={styles.benefitIcon}>🎯</Text>
                </View>
                <Text style={styles.benefitTitle}>Prime Location</Text>
                <Text style={styles.benefitDesc}>High foot traffic area</Text>
              </View>
              <View style={styles.benefitCard}>
                <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
                  <Text style={styles.benefitIcon}>🤝</Text>
                </View>
                <Text style={styles.benefitTitle}>Community</Text>
                <Text style={styles.benefitDesc}>Network with others</Text>
              </View>
              <View style={styles.benefitCard}>
                <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
                  <Text style={styles.benefitIcon}>📈</Text>
                </View>
                <Text style={styles.benefitTitle}>Growth</Text>
                <Text style={styles.benefitDesc}>Ready customer base</Text>
              </View>
            </ScrollView>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Application Form</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Business Name <Text style={styles.required}>*</Text></Text>
                <TextInput 
                  style={styles.input} 
                  value={form.tenant_name} 
                  onChangeText={v=>handleChange('tenant_name',v)} 
                  placeholder="e.g. Fabula Coffee"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contact Info <Text style={styles.required}>*</Text></Text>
                <TextInput 
                  style={styles.input} 
                  value={form.contact} 
                  onChangeText={v=>handleChange('contact',v)} 
                  placeholder="WhatsApp or Email"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Business Type <Text style={styles.required}>*</Text></Text>
                <TextInput 
                  style={styles.input} 
                  value={form.type} 
                  onChangeText={v=>handleChange('type',v)} 
                  placeholder="e.g. F&B, Retail, Services"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                  style={[styles.input, styles.textArea]} 
                  value={form.description} 
                  onChangeText={v=>handleChange('description',v)} 
                  placeholder="Tell us about your business..."
                  placeholderTextColor="#999"
                  multiline 
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Application</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
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
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  benefitsScroll: {
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  benefitCard: {
    backgroundColor: '#fff',
    width: 140,
    padding: 16,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 20,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  required: {
    color: '#ff4757',
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
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  successContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 40,
    color: '#2e7d32',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  successText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    paddingVertical: 16,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});
