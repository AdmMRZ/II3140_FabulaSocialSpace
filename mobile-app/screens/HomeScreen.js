import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  TouchableOpacity, 
  Linking, 
  ScrollView, 
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Navbar from '../components/Navbar';
import Auth from '../components/Auth';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        user={user}
        onLogout={logout}
        onCartPress={() => navigation.navigate('Checkout')}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground 
            source={require('../assets/Inside.png')} 
            style={styles.heroImage}
            imageStyle={{ borderRadius: 24 }}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Fabula Social Space</Text>
              <Text style={styles.heroSubtitle}>
                Where ideas meet comfort.
              </Text>
              <TouchableOpacity 
                style={styles.ctaButton} 
                onPress={() => navigation.navigate('Menu')}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Auth Section (if not logged in) */}
        {!user && (
          <View style={styles.authSection}>
            <Text style={styles.authTitle}>Join the Community</Text>
            <Text style={styles.authSubtitle}>Sign in to track orders and get rewards</Text>
            <View style={styles.authButtonWrapper}>
              <Auth />
            </View>
          </View>
        )}

        {/* Features Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Why Fabula?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuresScroll}>
            <View style={styles.featureCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}>
                <Text style={styles.featureIcon}>🎯</Text>
              </View>
              <Text style={styles.featureTitle}>Strategic</Text>
              <Text style={styles.featureDesc}>Heart of Dago</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}>
                <Text style={styles.featureIcon}>💻</Text>
              </View>
              <Text style={styles.featureTitle}>Work Ready</Text>
              <Text style={styles.featureDesc}>Fast WiFi</Text>
            </View>
            <View style={styles.featureCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#fff3e0' }]}>
                <Text style={styles.featureIcon}>☕</Text>
              </View>
              <Text style={styles.featureTitle}>Great Coffee</Text>
              <Text style={styles.featureDesc}>Premium Beans</Text>
            </View>
          </ScrollView>
        </View>

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionHeader}>Visit Us</Text>
          <View style={styles.contactCard}>
            <Text style={styles.contactText}>
              Open daily from 8 AM to 10 PM.
              Come visit us for a productive day or a relaxing evening.
            </Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity 
                style={[styles.socialBtn, styles.instaBtn]} 
                onPress={() => Linking.openURL('https://www.instagram.com/fabulasocialspace')}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-instagram" size={20} color="#fff" style={styles.btnIcon} />
                <Text style={styles.socialBtnText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.socialBtn, styles.waBtn]} 
                onPress={() => Linking.openURL('https://wa.me/628111700318')}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#fff" style={styles.btnIcon} />
                <Text style={styles.socialBtnText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
  },
  heroImage: {
    height: 220,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  heroContent: {
    padding: 20,
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#ff4757',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  authSection: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    alignItems: 'center',
  },
  authTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  authSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  authButtonWrapper: {
    width: '100%',
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginLeft: 20,
    marginBottom: 16,
  },
  featuresScroll: {
    paddingLeft: 20,
  },
  featureCard: {
    backgroundColor: '#fff',
    width: 140,
    height: 160,
    padding: 16,
    borderRadius: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#888',
  },
  contactSection: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  contactCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 24,
  },
  contactText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    opacity: 0.9,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnIcon: {
    marginRight: 8,
  },
  instaBtn: {
    backgroundColor: '#E1306C',
  },
  waBtn: {
    backgroundColor: '#25D366',
  },
  socialBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
