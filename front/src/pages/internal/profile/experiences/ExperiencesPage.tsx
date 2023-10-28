import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Divider, IconButton, Text } from 'react-native-paper';

import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from '@/store/slice/api';
import { Experience } from '@/store/slice/types';

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

  const [isEdited, setIsEdited] = useState(false);

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          {isEdited && (
            <Appbar.Action icon={'plus'} onPress={createButtonPressed} />
          )}
          <Appbar.Action
            icon={isEdited === true ? 'check' : 'pencil'}
            onPress={editButtonPressed}
          />
        </>
      ),
    });
  }, [navigation, isEdited]);

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Methods
  const editButtonPressed = useCallback(() => {
    setIsEdited((prev) => !prev);
  }, []);
  const createButtonPressed = useCallback(() => {
    navigation.navigate('ExperiencesUpdate', {});
  }, [navigation]);

  const editButtonExperience = useCallback(
    (experience: Experience) => {
      navigation.navigate('ExperiencesUpdate', { ...experience });
    },
    [navigation],
  );

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
      {experiences?.map((experience) => (
        <View key={experience.id} style={{ width: '100%' }}>
          <View style={styles.horizontalContainer}>
            <View style={{ marginLeft: 5 }}>
              <Text variant='labelLarge' style={styles.textFieldTitle}>
                {experience.job.title}
              </Text>
              <Text style={styles.textFieldElement}>
                {new Date(experience.startDate).toLocaleDateString('en-US')} -
                {new Date(experience.endDate).toLocaleDateString('en-US')}
              </Text>
              <Text style={styles.textFieldElement}>
                {experience.address.firstLine}, {experience.address.city},{' '}
                {experience.address.zipCode}
              </Text>
            </View>
            {isEdited && (
              <View style={styles.horizontalContainer}>
                <IconButton
                  icon='pencil'
                  style={styles.editBtnInline}
                  onPress={() => editButtonExperience(experience)}
                />
                <IconButton
                  icon='trash-can'
                  style={styles.editBtnInline}
                  onPress={() => trashcanButtonExperience(experience)}
                />
              </View>
            )}
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ExperiencesPage;
