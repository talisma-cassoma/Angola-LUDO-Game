import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { persistor, store } from '$redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from '$navigation/RootNavigator';
import { View, Text, ActivityIndicator, StyleSheet, Animated, Image } from 'react-native';
import * as Updates from 'expo-updates';
import { IMAGES } from '$assets/index';

const App = () => {

  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(true);

  useEffect(() => {
    async function onFetchUpdateAsync() {
      if (__DEV__) {
        // Skip OTA checks during local Metro development
        setIsCheckingForUpdate(false);
        return;
      }

      try {
        // 1. Check if a newer bundle is available on the EAS server
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          // 2. Download the bundle to the device storage
          await Updates.fetchUpdateAsync();

          // 3. Immediately reload the application to launch the new code
          await Updates.reloadAsync();
        }
      } catch (error) {
        // Fall back gracefully if network requests fail or time out
        console.error("Error fetching EAS update:", error);
      } finally {
        setIsCheckingForUpdate(false);
      }
    }

    onFetchUpdateAsync();
  }, []);

  // Show a placeholder UI while checking and downloading code updates
  if (isCheckingForUpdate) {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.imgContainer, { transform: [{ scale: 1 }] }]}
        >
          <Image resizeMode={'contain'} source={IMAGES.Logo} style={styles.img} />
        </Animated.View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Checking for critical updates...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  )
}


export default App


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 10, fontSize: 16 },
  imgContainer: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '80%',
    height: undefined,
    aspectRatio: 1
  },
});