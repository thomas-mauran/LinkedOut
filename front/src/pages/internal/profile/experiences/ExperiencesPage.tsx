import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperiencesList from '@/components/experiences/ExperiencesList';
import { Experience } from '@/models/types';
import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from '@/store/slice/api';

import { ProfileStackParamList } from '../../ProfileNav';

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

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
});
type ExperiencesAppPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Experiences'
>;
/**
 * The internal page for testing various stuff about React Native and the installed libraries.
 * @constructor
 */
const ExperiencesPage = ({ navigation }: ExperiencesAppPageProps) => {
  // Constants

  // Hooks
  const { data: experiences, refetch } = useGetExperiencesQuery('');
  const [deleteExperience] = useDeleteExperienceMutation();

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

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Methods
  const editButtonPressed = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);
  const createButtonPressed = useCallback(() => {
    navigation.navigate('ExperienceCreate');
  }, [navigation]);

  const trashcanButtonExperience = useCallback((experience: Experience) => {
    deleteExperience(experience.id)
      .unwrap()
      .then(() => {
        refetch();
      });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExperiencesList isEditing={isEditing} navigation={navigation} />
    </ScrollView>
  );
};

export default ExperiencesPage;
