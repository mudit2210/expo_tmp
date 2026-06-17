import React, { useState } from 'react';
import FlashScreen from './project/flash_screen';
import AppNavigator from './project/route';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <FlashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <AppNavigator />;
}
