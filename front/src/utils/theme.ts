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

export const ColorPalette = {
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
    primary: ColorPalette.primary40,
    primaryContainer: ColorPalette.primary90,
    secondary: ColorPalette.secondary40,
    secondaryContainer: ColorPalette.secondary90,
    tertiary: ColorPalette.tertiary40,
    tertiaryContainer: ColorPalette.tertiary90,
    surface: ColorPalette.neutral99,
    surfaceVariant: ColorPalette.neutralVariant90,
    surfaceDisabled: color(ColorPalette.neutral10)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    background: ColorPalette.neutral99,
    error: ColorPalette.error40,
    errorContainer: ColorPalette.error90,
    onPrimary: ColorPalette.primary100,
    onPrimaryContainer: ColorPalette.primary10,
    onSecondary: ColorPalette.secondary100,
    onSecondaryContainer: ColorPalette.secondary10,
    onTertiary: ColorPalette.tertiary100,
    onTertiaryContainer: ColorPalette.tertiary10,
    onSurface: ColorPalette.neutral10,
    onSurfaceVariant: ColorPalette.neutralVariant30,
    onSurfaceDisabled: color(ColorPalette.neutral10)
      .alpha(opacity.level4)
      .rgb()
      .string(),
    onError: ColorPalette.error100,
    onErrorContainer: ColorPalette.error10,
    onBackground: ColorPalette.neutral10,
    outline: ColorPalette.neutralVariant50,
    outlineVariant: ColorPalette.neutralVariant80,
    inverseSurface: ColorPalette.neutral20,
    inverseOnSurface: ColorPalette.neutral95,
    inversePrimary: ColorPalette.primary80,
    shadow: ColorPalette.neutral0,
    scrim: ColorPalette.neutral0,
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
    primary: ColorPalette.primary80,
    primaryContainer: ColorPalette.primary30,
    secondary: ColorPalette.secondary80,
    secondaryContainer: ColorPalette.secondary30,
    tertiary: ColorPalette.tertiary80,
    tertiaryContainer: ColorPalette.tertiary30,
    surface: ColorPalette.neutral10,
    surfaceVariant: ColorPalette.neutralVariant30,
    surfaceDisabled: color(ColorPalette.neutral90)
      .alpha(opacity.level2)
      .rgb()
      .string(),
    background: ColorPalette.neutral10,
    error: ColorPalette.error80,
    errorContainer: ColorPalette.error30,
    onPrimary: ColorPalette.primary20,
    onPrimaryContainer: ColorPalette.primary90,
    onSecondary: ColorPalette.secondary20,
    onSecondaryContainer: ColorPalette.secondary90,
    onTertiary: ColorPalette.tertiary20,
    onTertiaryContainer: ColorPalette.tertiary90,
    onSurface: ColorPalette.neutral90,
    onSurfaceVariant: ColorPalette.neutralVariant80,
    onSurfaceDisabled: color(ColorPalette.neutral90)
      .alpha(opacity.level4)
      .rgb()
      .string(),
    onError: ColorPalette.error20,
    onErrorContainer: ColorPalette.error80,
    onBackground: ColorPalette.neutral90,
    outline: ColorPalette.neutralVariant60,
    outlineVariant: ColorPalette.neutralVariant30,
    inverseSurface: ColorPalette.neutral90,
    inverseOnSurface: ColorPalette.neutral20,
    inversePrimary: ColorPalette.primary40,
    shadow: ColorPalette.neutral0,
    scrim: ColorPalette.neutral0,
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

export const LightBadgeColorPalette = {
  orange: {
    backgroundColor: '#FFDCBE',
    textColor: '#2D1600',
  },
  green: {
    backgroundColor: '#B1F49D',
    textColor: '#002200',
  },
  red: {
    backgroundColor: '#FFDAD4',
    textColor: '#410000',
  },
};

export const DarkBadgeColorPalette = {
  orange: {
    backgroundColor: '#6A3C00',
    textColor: '#FFDCBE',
  },
  green: {
    backgroundColor: '#16520E',
    textColor: '#B1F49D',
  },
  red: {
    backgroundColor: '#7D2B20',
    textColor: '#FFDAD4',
  },
};
