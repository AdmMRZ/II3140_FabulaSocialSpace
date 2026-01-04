import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function Splash({ navigation }) {
  const { width, height } = useWindowDimensions();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const textOpacityAnim = useRef(new Animated.Value(0)).current;
  const buttonOpacityAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0.8)).current;
  
  // Animated values for decorative elements
  const circle1Anim = useRef(new Animated.Value(0)).current;
  const circle2Anim = useRef(new Animated.Value(0)).current;
  const circle3Anim = useRef(new Animated.Value(0)).current;
  
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          damping: 10,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Text animation with delay
    Animated.timing(textOpacityAnim, {
      toValue: 1,
      duration: 800,
      delay: 600,
      useNativeDriver: true,
    }).start();

    // Button animation with delay
    Animated.parallel([
      Animated.timing(buttonOpacityAnim, {
        toValue: 1,
        duration: 600,
        delay: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        delay: 1200,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setAnimationComplete(true);
    });

    // Decorative circles animation
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(circle1Anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(circle1Anim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(circle2Anim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(circle2Anim, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(circle3Anim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(circle3Anim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const handleGetStarted = () => {
    try {
      console.log('Get Started pressed, animation complete:', animationComplete);
      if (animationComplete) {
        navigation.replace('Home');
      } else {
        // Force navigate even if animation not complete
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback: try navigate instead of replace
      navigation.navigate('Home');
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const minDim = Math.min(width, height);
  const isLandscape = width > height;

  const circle1Style = {
    width: minDim * 0.6,
    height: minDim * 0.6,
    top: -minDim * 0.2,
    right: -minDim * 0.2,
  };
  const circle2Style = {
    width: minDim * 0.5,
    height: minDim * 0.5,
    bottom: -minDim * 0.15,
    left: -minDim * 0.15,
  };
  const circle3Style = {
    width: minDim * 0.4,
    height: minDim * 0.4,
    top: height * 0.4,
    right: -minDim * 0.1,
  };

  const logoWrapperStyle = {
    borderRadius: minDim * 0.25,
    padding: 20,
  };

  const logoStyle = {
    width: minDim * 0.4,
    height: minDim * 0.4,
    borderRadius: minDim * 0.2,
  };

  return (
    <View style={styles.container}>
      {/* Decorative Background Circles */}
      <Animated.View
        style={[
          styles.decorativeCircle,
          styles.circle1,
          circle1Style,
          {
            opacity: circle1Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.1, 0.3, 0.1],
            }),
            transform: [
              {
                scale: circle1Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1.2],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle,
          styles.circle2,
          circle2Style,
          {
            opacity: circle2Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.1, 0.25, 0.1],
            }),
            transform: [
              {
                scale: circle2Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.decorativeCircle,
          styles.circle3,
          circle3Style,
          {
            opacity: circle3Anim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.15, 0.35, 0.15],
            }),
            transform: [
              {
                scale: circle3Anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1.1],
                }),
              },
            ],
          },
        ]}
      />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <View style={[styles.logoWrapper, logoWrapperStyle]}>
            <Image
              source={require('../assets/logo.png')}
              style={[styles.logo, logoStyle]}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.textContainer, { opacity: textOpacityAnim }]}
        >
          <Text style={styles.title}>Fabula Social Space</Text>
          <Text style={styles.subtitle}>Where ideas meet comfort</Text>
          <View style={styles.divider} />
          <Text style={styles.description}>
            A cozy place to work, connect, and create
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: buttonOpacityAnim,
              transform: [{ scale: buttonScaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.9}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <View style={styles.buttonIcon}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          style={[styles.tapHint, { opacity: buttonOpacityAnim }]}
        >
          Tap to continue your journey
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: '#6366f1',
  },
  circle1: {},
  circle2: {
    backgroundColor: '#8b5cf6',
  },
  circle3: {
    backgroundColor: '#ec4899',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoWrapper: {
    backgroundColor: '#f9fafb',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 15,
  },
  logo: {},
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6366f1',
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 15,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: '#6366f1',
    borderRadius: 2,
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight: 10,
  },
  buttonIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tapHint: {
    marginTop: 20,
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    letterSpacing: 0.5,
  },
});
