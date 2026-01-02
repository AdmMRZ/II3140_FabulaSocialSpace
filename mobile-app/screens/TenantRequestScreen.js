
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';

export default function TenantRequestScreen() {
  const [form, setForm] = useState({ tenant_name:'', contact:'', type:'', description:'' });
  const [sent, setSent] = useState(false);

  const handleChange = (name, value) => setForm({ ...form, [name]: value });

  const handleSubmit = async () => {
    if(!form.tenant_name||!form.contact||!form.type) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      // await postTenant(form); // Uncomment if backend ready
      setSent(true);
    } catch(e) {
      alert('Failed to submit request. Please try again.');
    }
  };

  const handleReset = () => {
    setSent(false);
    setForm({ tenant_name:'', contact:'', type:'', description:'' });
  };

  return (
    <ScrollView style={styles.tenantContainer}>
      <Navbar />
      <View style={styles.tenantContent}>
        {sent ? (
          <View style={styles.successMessage}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successTitle}>Request Submitted Successfully!</Text>
            <Text style={styles.successText}>
              Thank you for your interest in becoming a tenant at Fabula Social Space. We will review your application and contact you soon.
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={handleReset}>
              <Text style={{color:'#fff'}}>Submit Another Request</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.tenantHeader}>
              <Text style={styles.tenantTitle}>Join Our Community</Text>
            </View>
            <View style={styles.tenantBenefits}>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>🎯</Text>
                <Text style={styles.benefitTitle}>Prime Location</Text>
                <Text style={styles.benefitDesc}>Strategic spot with high foot traffic</Text>
              </View>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>🤝</Text>
                <Text style={styles.benefitTitle}>Community</Text>
                <Text style={styles.benefitDesc}>Join a network of other businesses</Text>
              </View>
              <View style={styles.benefitCard}>
                <Text style={styles.benefitIcon}>📈</Text>
                <Text style={styles.benefitTitle}>Growth</Text>
                <Text style={styles.benefitDesc}>Access to a ready customer base</Text>
              </View>
            </View>
            <View style={styles.tenantForm}>
              <Text style={styles.formHeader}>Tenant Application</Text>
              <Text style={styles.formSubheader}>Fill out the form below to start your journey with us</Text>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Business Name <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} value={form.tenant_name} onChangeText={v=>handleChange('tenant_name',v)} placeholder="Business Name" />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Contact <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} value={form.contact} onChangeText={v=>handleChange('contact',v)} placeholder="Contact (WA/Email)" />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Type <Text style={styles.required}>*</Text></Text>
                <TextInput style={styles.input} value={form.type} onChangeText={v=>handleChange('type',v)} placeholder="Type of business" />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput style={[styles.input, {height:80}]} value={form.description} onChangeText={v=>handleChange('description',v)} placeholder="Description" multiline />
              </View>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={{color:'#fff',fontWeight:'bold'}}>Submit Request</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tenantContainer: { flex: 1, backgroundColor: '#fff' },
  tenantContent: { padding: 16 },
  successMessage: { alignItems: 'center', marginTop: 32 },
  successIcon: { fontSize: 48, color: '#25D366', marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  successText: { color: '#444', textAlign: 'center', marginBottom: 16 },
  backButton: { backgroundColor: '#ff4757', borderRadius: 8, padding: 12, marginTop: 16 },
  tenantHeader: { alignItems: 'center', marginBottom: 16 },
  tenantTitle: { fontSize: 28, fontWeight: 'bold', color: '#ff4757' },
  tenantBenefits: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  benefitCard: { alignItems: 'center', flex: 1, marginHorizontal: 4, backgroundColor:'#f8f9fa', borderRadius:8, padding:12 },
  benefitIcon: { fontSize: 32, marginBottom: 8 },
  benefitTitle: { fontWeight: 'bold', fontSize: 16 },
  benefitDesc: { color: '#888', fontSize: 13, textAlign: 'center' },
  tenantForm: { backgroundColor: '#fff', borderRadius: 8, padding: 16, elevation: 2 },
  formHeader: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
  formSubheader: { color: '#888', marginBottom: 16 },
  formGroup: { marginBottom: 16 },
  formLabel: { fontWeight: 'bold', marginBottom: 4 },
  required: { color: '#ff4757' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 4, padding: 8, marginTop: 4 },
  submitBtn: { backgroundColor: '#ff4757', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 8 },
});
