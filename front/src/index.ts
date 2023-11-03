import { registerRootComponent } from 'expo';
import { en, fr, registerTranslation } from 'react-native-paper-dates';

import App from './App';

// Register react-native-paper-dates translations
registerTranslation('EN', en);
registerTranslation('FR', fr);

// Register the app as a root component
registerRootComponent(App);
