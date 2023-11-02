import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import EvaluationsList from '@/components/evaluations/EvaluationsList';
import ReferencesList from '@/components/references/ReferencesList';

import { ProfileStackParamList } from '../ProfileNav';

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
});

type ReferencesAppPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'References'
>;

/**
 * The internal page for testing various stuff about React Native and the installed libraries.
 * @constructor
 */
const ReferencesPage = ({ navigation }: ReferencesAppPageProps) => {
  // Hooks
  const [isEditing, setIsEditing] = useState(false);

  // Methods
  const editButtonPressed = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const createButtonPressed = useCallback(() => {
    navigation.navigate('ReferenceUpdate', {});
  }, [navigation]);

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          {isEditing && (
            <Appbar.Action icon={'plus'} onPress={createButtonPressed} />
          )}
          <Appbar.Action
            icon={isEditing === true ? 'check' : 'pencil'}
            onPress={editButtonPressed}
          />
        </>
      ),
    });
  }, [createButtonPressed, editButtonPressed, navigation, isEditing]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ReferencesList isEditing={isEditing} navigation={navigation} />
      <EvaluationsList />
    </ScrollView>
  );
};

export default ReferencesPage;
