import base64 from 'base-64';
import { registerRootComponent } from 'expo';
import { en, fr, registerTranslation } from 'react-native-paper-dates';

import App from './App';

// Polyfill for atob and btoa
global.atob = base64.decode;
global.btoa = base64.encode;

// Register react-native-paper-dates translations
registerTranslation('EN', en);
registerTranslation('FR', fr);

// Register the app as a root component
registerRootComponent(App);
