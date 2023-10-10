import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import deepmerge from 'deepmerge';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { Platform, useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3TypescaleKey,
  PaperProvider,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';
import { Provider } from 'react-redux';

import InternalTabNav from '@/pages/InternalTabNav';
import store from '@/store/Store';

// Theme setup
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const DefaultFontHeading = Platform.select({
  web: 'RedHatDisplay, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
  ios: 'RedHatDisplay',
  default: 'RedHatDisplay, sans-serif',
});

const FontConfig: Partial<Record<MD3TypescaleKey, Partial<MD3Type>>> = {
  displayLarge: {
    fontFamily: DefaultFontHeading,
  },
  displayMedium: {
    fontFamily: DefaultFontHeading,
  },
  displaySmall: {
    fontFamily: DefaultFontHeading,
  },
  headlineLarge: {
    fontFamily: DefaultFontHeading,
  },
  headlineMedium: {
    fontFamily: DefaultFontHeading,
  },
  headlineSmall: {
    fontFamily: DefaultFontHeading,
  },
};

const CombinedDefaultTheme = deepmerge(LightTheme, {
  ...MD3LightTheme,
  fonts: configureFonts({ config: FontConfig }),
});

const CombinedDarkTheme = deepmerge(DarkTheme, {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: FontConfig }),
});

// We want to hide the splash screen ourselves
SplashScreen.preventAutoHideAsync();

/**
 * The parameter list for the RootStack navigator.
 */
export type RootStackParamList = {
  Internal: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * The root component for this application.
 * @constructor
 */
const App = () => {
  // Switch the color scheme of the application based on the system-wide setting
  const colorScheme = useColorScheme();
  const theme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  // Load application fonts
  const [fontsLoaded, fontError] = useFonts({
    RedHatDisplay: require('$/fonts/RedHatDisplay.ttf'),
  });

  // Hide the splash screen when everything is initialized
  const shouldHideSplashScreen = fontsLoaded || !!fontError;

  const onNavigationContainerReady = useCallback(async () => {
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
        <NavigationContainer theme={theme} onReady={onNavigationContainerReady}>
          <StatusBar style='auto' />
          <RootStack.Navigator
            initialRouteName='Internal'
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name='Internal' component={InternalTabNav} />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
