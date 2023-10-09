import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';

import { InternalMiscStackParamList } from '@/pages/internal/InternalMiscNav';
import i18n from '@/utils/i18n';

type InternalMiscPageProps = NativeStackScreenProps<
  InternalMiscStackParamList,
  'MiscMain'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 8,
  },
  divider: {
    marginVertical: 8,
    width: '100%',
  },
});

/**
 * The internal page for testing various stuff about React Native and the installed libraries.
 * @constructor
 */
const InternalMiscPage = ({ navigation }: InternalMiscPageProps) => {
  const appBarButtonPress = useCallback(() => {
    navigation.navigate('MiscAppBar');
  }, [navigation]);

  const tabBarButtonPress = useCallback(() => {
    navigation.navigate('MiscTabBar');
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>This is the InternalMiscPage.tsx file</Text>

      <Divider style={styles.divider} />
      <Text variant='headlineMedium'>Localization</Text>
      <Text>This text is NOT localized</Text>
      <Text>{i18n.t('internal.translatedText')}</Text>

      <Divider style={styles.divider} />
      <Text variant='headlineMedium'>Text styles</Text>
      <Text variant='displayLarge'>displayLarge</Text>
      <Text variant='displayMedium'>displayMedium</Text>
      <Text variant='displaySmall'>displaySmall</Text>
      <Text variant='headlineLarge'>headlineLarge</Text>
      <Text variant='headlineMedium'>headlineMedium</Text>
      <Text variant='headlineSmall'>headlineSmall</Text>
      <Text variant='titleLarge'>titleLarge</Text>
      <Text variant='titleMedium'>titleMedium</Text>
      <Text variant='titleSmall'>titleSmall</Text>
      <Text variant='bodyLarge'>bodyLarge</Text>
      <Text variant='bodyMedium'>bodyMedium</Text>
      <Text variant='bodySmall'>bodySmall</Text>
      <Text variant='labelLarge'>labelLarge</Text>
      <Text variant='labelMedium'>labelMedium</Text>
      <Text variant='labelSmall'>labelSmall</Text>

      <Divider style={styles.divider} />
      <Text variant='headlineMedium'>Navigation</Text>
      <Button mode='contained-tonal' onPress={appBarButtonPress}>
        RNPaper AppBar
      </Button>
      <Button mode='contained-tonal' onPress={tabBarButtonPress}>
        TabView & PagerView
      </Button>
    </ScrollView>
  );
};

export default InternalMiscPage;
