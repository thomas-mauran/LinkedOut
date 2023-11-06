import { NavigationContainer } from '@react-navigation/native';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import RootNavigator from '@/RootNavigator';
import { store } from '@/store/Store';
import { DarkTheme, LightTheme } from '@/utils/theme';

import { api } from './store/slice/api';

// We want to hide the splash screen ourselves
SplashScreen.preventAutoHideAsync();

/**
 * The root component for this application.
 * @constructor
 */
const App = () => {
  // Switch the color scheme of the application based on the system-wide setting
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  // Load application fonts
  const [fontsLoaded, fontError] = useFonts({
    RedHatDisplay: require('$/fonts/RedHatDisplay.ttf'),
  });

  // Hide the splash screen when everything is initialized
  const shouldHideSplashScreen = fontsLoaded || !!fontError;

  const handleNavigationContainerReady = useCallback(async () => {
    if (shouldHideSplashScreen) {
      await SplashScreen.hideAsync();
    }
  }, [shouldHideSplashScreen]);

  if (!shouldHideSplashScreen) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ApiProvider api={api}>
          <NavigationContainer
            theme={theme}
            onReady={handleNavigationContainerReady}
          >
            <StatusBar style='auto' />
            <RootNavigator />
          </NavigationContainer>
        </ApiProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
