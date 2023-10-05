import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { InternalMiscStackParamList } from '@/pages/internal/InternalMiscNav';

type InternalMiscPageProps = NativeStackScreenProps<
  InternalMiscStackParamList,
  'MiscMain'
>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
  },
  headline: {
    fontStyle: 'italic',
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>This is the InternalMiscPage.tsx file</Text>

      <Text variant='headlineMedium' style={styles.headline}>
        Navigation
      </Text>
      <Button mode='contained-tonal' onPress={appBarButtonPress}>
        RNPaper AppBar
      </Button>
    </ScrollView>
  );
};

export default InternalMiscPage;
