import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function FlashScreen({ onFinish }) {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const bgOpacity = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  
  const [statusText, setStatusText] = useState('Initializing...');

  useEffect(() => {
    // 1. Initial entry animation
    const entryAnimation = Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]);

    // 2. Continuous pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Start entry animation
    entryAnimation.start(() => {
      // Start pulse after entry
      pulseAnimation.start();
    });

    // 3. Simulated/Real API Loading
    const loadApis = async () => {
      try {
        setStatusText('Connecting to services...');
        // Actually fetch the URL to "load all apis"
        await fetch('https://tmp.geotree.io/');
        setStatusText('Finalizing...');
      } catch (e) {
        console.warn('API load error', e);
        setStatusText('Ready');
      }
    };

    // Wait for BOTH the API to load AND a minimum display time of 2.5 seconds
    Promise.all([
      loadApis(),
      new Promise(resolve => setTimeout(resolve, 2500)),
    ]).then(() => {
      setStatusText('Welcome');
      
      // 4. Exit animation
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        if (onFinish) onFinish();
      });
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0a2f2b" />

      {/* Background circles for depth */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.circle3} />

      {/* Logo area */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [
              { scale: logoScale },
              { scale: pulse } // combine initial scale with pulse
            ],
            opacity: logoOpacity,
          },
        ]}
      >
        <Image
          source={require('../assets/icon.png')}
          style={styles.logoImage}
        />
        {/* <Text style={styles.appName}>TrainGeo</Text> */}
      </Animated.View>
      
      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslateY }],
          },
        ]}
      >
        {statusText}
      </Animated.Text>

      {/* Bottom branding */}
      <Animated.Text style={[styles.footer, { opacity: taglineOpacity }]}>
        Loading required resources
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a2f2b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width,
    height,
    zIndex: 999,
  },
  circle1: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#14b8a6',
    opacity: 0.15,
    top: -80,
    right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#6366f1',
    opacity: 0.12,
    bottom: -60,
    left: -60,
  },
  circle3: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#10b981',
    opacity: 0.1,
    top: '40%',
    left: -150,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 110,
    height: 110,
    borderRadius: 28,
    marginBottom: 20,
    shadowColor: '#14b8a6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
    textShadowColor: 'rgba(20, 184, 166, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#e2e8f0',
    letterSpacing: 0.5,
    marginTop: 12,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    fontSize: 13,
    color: '#2dd4bf',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
});