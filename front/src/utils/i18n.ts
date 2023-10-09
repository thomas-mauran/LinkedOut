import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en_US from '$/translations/en_US.json';
import fr_FR from '$/translations/fr_FR.json';

const i18n = new I18n({
  'en-US': en_US,
  'fr-FR': fr_FR,
});

i18n.defaultLocale = 'en-US';
i18n.locale = getLocales()[0].languageTag;
i18n.enableFallback = true;

export default i18n;
