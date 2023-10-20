import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import color from 'color';
import deepmerge from 'deepmerge';
import { Platform } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3TypescaleKey,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import { MD3Type } from 'react-native-paper/lib/typescript/types';
import { MD3Colors } from 'react-native-paper/src/styles/themes/v3/tokens';

// Get the theme from react-navigation
const {
  LightTheme: AdaptedNavigationLightTheme,
  DarkTheme: AdaptedNavigationDarkTheme,
} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// Custom palette
const opacity = {
  level1: 0.08,
  level2: 0.12,
  level3: 0.16,
  level4: 0.38,
};

const palette = {
  primary100: '#ffffff',
  primary99: '#fffbff',
  primary98: '#fff8f5',
  primary95: '#ffeee2',
  primary90: '#ffdcc1',
  primary80: '#ffb778',
  primary70: '#f1963a',
  primary60: '#d17c21',
  primary50: '#b26300',
  primary40: '#8e4e00',
  primary35: '#7d4400',
  primary30: '#6c3a00',
  primary25: '#5c3100',
  primary20: '#4c2700',
  primary10: '#2e1500',
  primary0: '#000000',
  secondary100: '#ffffff',
  secondary99: '#fffbff',
  secondary98: '#fff8f5',
  secondary95: '#ffeee2',
  secondary90: '#ffdcc1',
  secondary80: '#e2c0a5',
  secondary70: '#c6a58b',
  secondary60: '#a98b72',
  secondary50: '#8e725a',
  secondary40: '#735943',
  secondary35: '#664d38',
  secondary30: '#5a422d',
  secondary25: '#4d3723',
  secondary20: '#412c19',
  secondary10: '#2a1706',
  secondary0: '#000000',
  tertiary100: '#ffffff',
  tertiary99: '#fcffde',
  tertiary98: '#f6ffc7',
  tertiary95: '#edf6bf',
  tertiary90: '#dfe7b2',
  tertiary80: '#c3cb98',
  tertiary70: '#a7b07e',
  tertiary60: '#8d9566',
  tertiary50: '#737b4e',
  tertiary40: '#5a6238',
  tertiary35: '#4f562d',
  tertiary30: '#434a22',
  tertiary25: '#383f18',
  tertiary20: '#2d330e',
  tertiary10: '#181e00',
  tertiary0: '#000000',
  neutral100: '#ffffff',
  neutral99: '#fffbff',
  neutral98: '#fff8f5',
  neutral95: '#faefe8',
  neutral90: '#ece0da',
  neutral80: '#cfc4be',
  neutral70: '#b3a9a3',
  neutral60: '#988f89',
  neutral50: '#7e7570',
  neutral40: '#655d58',
  neutral35: '#58514c',
  neutral30: '#4c4541',
  neutral25: '#413a36',
  neutral20: '#352f2b',
  neutral10: '#201b17',
  neutral0: '#000000',
  neutralVariant100: '#ffffff',
  neutralVariant99: '#fffbff',
  neutralVariant98: '#fff8f5',
  neutralVariant95: '#ffeee2',
  neutralVariant90: '#f2dfd1',
  neutralVariant80: '#d6c3b6',
  neutralVariant70: '#b9a89b',
  neutralVariant60: '#9e8e82',
  neutralVariant50: '#837469',
  neutralVariant40: '#6a5c51',
  neutralVariant35: '#5d5046',
  neutralVariant30: '#51443a',
  neutralVariant25: '#453930',
  neutralVariant20: '#3a2e25',
  neutralVariant10: '#231a11',
  neutralVariant0: '#000000',
  error100: '#ffffff',
  error99: '#fffbff',
  error98: '#fff8f7',
  error95: '#ffedea',
  error90: '#ffdad6',
  error80: '#ffb4ab',
  error70: '#ff897d',
  error60: '#ff5449',
  error50: '#de3730',
  error40: '#ba1a1a',
  error35: '#a80710',
  error30: '#93000a',
  error25: '#7e0007',
  error20: '#690005',
  error10: '#410002',
  error0: '#000000',
};

// Set up the fonts
const DefaultFontHeading = Platform.select({
  web: 'RedHatDisplay',
  ios: 'RedHatDisplay',
  default: 'RedHatDisplay',
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

// Set up the theme
export const LightTheme = deepmerge(AdaptedNavigationLightTheme, {
  ...MD3LightTheme,
  colors: {
    primary: palette.primary40,
    primaryContainer: palette.primary90,
    secondary: palette.secondary40,
    secondaryContainer: palette.secondary90,
    tertiary: palette.tertiary40,
    tertiaryContainer: palette.tertiary90,
    surface: palette.neutral99,
    surfaceVariant: palette.neutralVariant90,
    surfaceDisabled: color(palette.neutral10)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    background: palette.neutral99,
    error: palette.error40,
    errorContainer: palette.error90,
    onPrimary: palette.primary100,
    onPrimaryContainer: palette.primary10,
    onSecondary: palette.secondary100,
    onSecondaryContainer: palette.secondary10,
    onTertiary: palette.tertiary100,
    onTertiaryContainer: palette.tertiary10,
    onSurface: palette.neutral10,
    onSurfaceVariant: palette.neutralVariant30,
    onSurfaceDisabled: color(palette.neutral10)
      .alpha(opacity.level4)
      .rgb()
      .string(),
    onError: palette.error100,
    onErrorContainer: palette.error10,
    onBackground: palette.neutral10,
    outline: palette.neutralVariant50,
    outlineVariant: palette.neutralVariant80,
    inverseSurface: palette.neutral20,
    inverseOnSurface: palette.neutral95,
    inversePrimary: palette.primary80,
    shadow: palette.neutral0,
    scrim: palette.neutral0,
    backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.primary99` used as background
      level1: '#fbf6f9', // palette.primary40, alpha 0.05
      level2: '#f8f3f6', // palette.primary40, alpha 0.08
      level3: '#f6eff2', // palette.primary40, alpha 0.11
      level4: '#f5eef1', // palette.primary40, alpha 0.12
      level5: '#f3ecef', // palette.primary40, alpha 0.14
    },
  },
  fonts: configureFonts({ config: FontConfig }),
});

export const DarkTheme = deepmerge(AdaptedNavigationDarkTheme, {
  ...MD3DarkTheme,
  colors: {
    primary: palette.primary80,
    primaryContainer: palette.primary30,
    secondary: palette.secondary80,
    secondaryContainer: palette.secondary30,
    tertiary: palette.tertiary80,
    tertiaryContainer: palette.tertiary30,
    surface: palette.neutral10,
    surfaceVariant: palette.neutralVariant30,
    surfaceDisabled: color(palette.neutral90)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    background: palette.neutral10,
    error: palette.error80,
    errorContainer: palette.error30,
    onPrimary: palette.primary20,
    onPrimaryContainer: palette.primary90,
    onSecondary: palette.secondary20,
    onSecondaryContainer: palette.secondary90,
    onTertiary: palette.tertiary20,
    onTertiaryContainer: palette.tertiary90,
    onSurface: palette.neutral90,
    onSurfaceVariant: palette.neutralVariant80,
    onSurfaceDisabled: color(palette.neutral90)
      .alpha(opacity.level4)
      .rgb()
      .string(),
    onError: palette.error20,
    onErrorContainer: palette.error80,
    onBackground: palette.neutral90,
    outline: palette.neutralVariant60,
    outlineVariant: palette.neutralVariant30,
    inverseSurface: palette.neutral90,
    inverseOnSurface: palette.neutral20,
    inversePrimary: palette.primary40,
    shadow: palette.neutral0,
    scrim: palette.neutral0,
    backdrop: color(MD3Colors.neutralVariant20).alpha(0.4).rgb().string(),
    elevation: {
      level0: 'transparent',
      // Note: Color values with transparency cause RN to transfer shadows to children nodes
      // instead of View component in Surface. Providing solid background fixes the issue.
      // Opaque color values generated with `palette.neutral10` used as background
      level1: '#2e2016', // palette.primary40, alpha 0.05
      level2: '#342216', // palette.primary40, alpha 0.08
      level3: '#3a2515', // palette.primary40, alpha 0.11
      level4: '#3c2515', // palette.primary40, alpha 0.12
      level5: '#3f2715', // palette.primary40, alpha 0.14
    },
  },
  fonts: configureFonts({ config: FontConfig }),
});
