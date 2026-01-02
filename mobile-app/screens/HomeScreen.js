
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.homeContainer}>
      <Navbar />
      {/* Hero Section */}
      <ImageBackground source={require('../assets/Inside.png')} style={styles.heroSection}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Fabula Social Space</Text>
          <Text style={styles.heroSubtitle}>A cozy space where ideas meet comfort. Perfect for work, meetings, and social gatherings.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Menu')}>
            <Text style={styles.ctaButtonText}>Explore Our Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}><Text style={styles.iconText}>🎯</Text></View>
            <Text style={styles.featureTitle}>Strategic Location</Text>
            <Text style={styles.featureDescription}>Strategically located in the heart of Dago for easy access</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}><Text style={styles.iconText}>💻</Text></View>
            <Text style={styles.featureTitle}>Work Ready</Text>
            <Text style={styles.featureDescription}>High-speed WiFi and comfortable workspaces</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}><Text style={styles.iconText}>☕</Text></View>
            <Text style={styles.featureTitle}>Great Menu</Text>
            <Text style={styles.featureDescription}>Delicious beverages to fuel your day</Text>
          </View>
        </View>

        {/* Contact Card */}
        <View style={styles.contactCard}>
          <View style={[styles.featureIcon, styles.contactIcon]}><Text style={styles.iconText}>📱</Text></View>
          <Text style={styles.contactTitle}>Connect With Us</Text>
          <View style={styles.socialLinks}>
            <TouchableOpacity style={[styles.socialLink, styles.instagram]} onPress={() => Linking.openURL('https://www.instagram.com/fabulasocialspace')}>
              <Text style={styles.socialLinkText}>Follow us on Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialLink, styles.whatsapp]} onPress={() => Linking.openURL('https://wa.me/628111700318')}>
              <Text style={styles.socialLinkText}>Chat on WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    height: 340,
    justifyContent: 'center',
    position: 'relative',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
  heroContent: {
    zIndex: 2,
    marginLeft: 32,
    marginTop: 32,
    maxWidth: 340,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: -1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 24,
    fontWeight: '400',
  },
  ctaButton: {
    backgroundColor: '#ff4757',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  featuresSection: {
    paddingVertical: 48,
    paddingHorizontal: 16,
    maxWidth: 1200,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1a1a1a',
    letterSpacing: -0.5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: '30%',
    minWidth: 120,
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,71,87,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 28,
    color: '#ff4757',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  contactCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 32,
    color: '#fff',
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 4,
  },
  contactIcon: {
    backgroundColor: '#ff4757',
    color: '#fff',
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-5deg' }],
  },
  contactTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginHorizontal: 8,
    marginBottom: 8,
    minWidth: 120,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  socialLinkText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  instagram: {
    backgroundColor: 'rgba(225,48,108,0.2)',
  },
  whatsapp: {
    backgroundColor: 'rgba(37,211,102,0.2)',
  },
});
