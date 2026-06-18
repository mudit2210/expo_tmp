import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import FlashScreen from './project/flash_screen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <FlashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <WebView 
        source={{ uri: 'https://tmp.geotree.io/' }} 
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
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
