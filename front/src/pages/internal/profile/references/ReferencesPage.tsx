import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

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
const ReferencesPage = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text>This is the References.tsx file</Text>
    </ScrollView>
  );
};

export default ReferencesPage;
