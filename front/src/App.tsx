import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import deepmerge from 'deepmerge';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';

import InternalTabNav from '@/pages/InternalTabNav';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = deepmerge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = deepmerge(MD3DarkTheme, DarkTheme);

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

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar style='auto' />
        <RootStack.Navigator
          initialRouteName='Internal'
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name='Internal' component={InternalTabNav} />
        </RootStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
