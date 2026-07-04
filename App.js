import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, StatusBar, View, AppState } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import FlashScreen from './project/flash_screen';

// --- CHOOSE YOUR WEB ENVIRONMENT ---

// Option A: Local Development (Uncomment this and comment out Option B)
// Note: Replace with your computer's local IP address and Vite server port (default 5173) to test local changes on a physical device.
// const WEB_URL = 'http://192.168.1.49:5173/'; // Or 'http://192.168.X.X:5173/' http://localhost:5173 

// Option B: Production (Default)
const WEB_URL = 'https://tmp.geotree.io/';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const webViewRef = useRef(null);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        webViewRef.current?.reload();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <WebView 
          ref={webViewRef}
          source={{ uri: WEB_URL }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          cacheEnabled={false}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          onLoadEnd={() => setWebViewLoaded(true)}
        />
      </SafeAreaView>
      {showSplash && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 999 }]}>
          <FlashScreen 
            onFinish={() => setShowSplash(false)} 
            isReadyToUnmount={webViewLoaded} 
          />
        </View>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webview: {
    flex: 1,
  },
});
