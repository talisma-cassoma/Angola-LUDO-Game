import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';

import { persistor, store } from '$redux/store';
import RootNavigator from '$navigation/RootNavigator';
import { IMAGES } from '$assets/index';

const OTA_TIMEOUT = 15000; // 15 segundos

const App = () => {
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(true);
  const [status, setStatus] = useState('Verificando atualizações...');

  useEffect(() => {
    let mounted = true;

    const checkForUpdates = async () => {
      if (__DEV__) {
        if (mounted) {
          setIsCheckingForUpdate(false);
        }
        return;
      }

      try {
        setStatus('Verificando atualizações...');

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Tempo limite excedido ao verificar OTA.'));
          }, OTA_TIMEOUT);
        });

        const update = await Promise.race([
          Updates.checkForUpdateAsync(),
          timeoutPromise,
        ]) as Updates.UpdateCheckResult;

        if (update.isAvailable) {
          setStatus('Baixando atualização...');

          await Updates.fetchUpdateAsync();

          setStatus('Aplicando atualização...');

          await Updates.reloadAsync();

          return;
        }

        setStatus('Aplicação atualizada.');
      } catch (error) {
        console.error('Erro ao verificar OTA:', error);

        if (mounted) {
          setStatus('Não foi possível verificar atualizações.');
        }
      } finally {
        if (mounted) {
          setTimeout(() => {
            setIsCheckingForUpdate(false);
          }, 500);
        }
      }
    };

    checkForUpdates();

    return () => {
      mounted = false;
    };
  }, []);

  if (isCheckingForUpdate) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            source={IMAGES.Logo}
            style={styles.logo}
          />
        </View>

        <ActivityIndicator
          size="large"
          color="#0066FF"
          style={styles.loader}
        />

        <Text style={styles.text}>
          {status}
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },

  logoContainer: {
    width: '80%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  loader: {
    marginTop: 20,
  },

  text: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});