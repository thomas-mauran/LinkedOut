import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';

import RootNavigator from '@/RootNavigator';
import { init } from '@/store/features/authenticationSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { DarkTheme, LightTheme } from '@/utils/theme';

// We want to hide the splash screen ourselves
SplashScreen.preventAutoHideAsync();

/**
 * Handles hiding the splash screen when the application is ready.
 * @constructor
 */
const SplashHandler = () => {
  // Application theme
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  // Store hooks
  const authState = useAppSelector((state) => state.auth.state);
  const dispatch = useAppDispatch();

  // Load application fonts
  const [fontsLoaded, fontError] = useFonts({
    RedHatDisplay: require('$/fonts/RedHatDisplay.ttf'),
  });

  // Init the authentication store slice
  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  // Hide the splash screen when everything is initialized
  const shouldHideSplashScreen =
    (fontsLoaded || !!fontError) && authState !== 'unknown';

  const handleNavigationContainerReady = useCallback(async () => {
    if (shouldHideSplashScreen) {
      await SplashScreen.hideAsync();
    }
  }, [shouldHideSplashScreen]);

  if (!shouldHideSplashScreen) {
    return null;
  }

  return (
    <NavigationContainer theme={theme} onReady={handleNavigationContainerReady}>
      <StatusBar style='auto' />
      <RootNavigator />
    </NavigationContainer>
  );
};

export default SplashHandler;
