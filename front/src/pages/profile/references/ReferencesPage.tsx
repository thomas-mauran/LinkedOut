import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import EvaluationsList from '@/components/evaluations/EvaluationsList';
import ReferencesList from '@/components/references/ReferencesList';
import {
  useDeleteReferenceMutation,
  useGetEvaluationsQuery,
} from '@/store/slice/api';

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
  divider: {
    marginVertical: 8,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
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
  // Constants

  // Hooks
  const [deleteReference] = useDeleteReferenceMutation();
  const { data: evaluations } = useGetEvaluationsQuery('');

  const [isEditing, setIsEditing] = useState(false);

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
  }, [navigation, isEditing]);

  // Methods
  const editButtonPressed = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);
  const createButtonPressed = useCallback(() => {
    navigation.navigate('ReferenceUpdate', {});
  }, [navigation]);

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
