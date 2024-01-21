import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import SplashHandler from '@/SplashHandler';
import { store } from '@/store/store';
import { DarkTheme, LightTheme } from '@/utils/theme';

/**
 * The root component for this application.
 * @constructor
 */
const App = () => {
  // Switch the color scheme of the application based on the system-wide setting
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SplashHandler />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
