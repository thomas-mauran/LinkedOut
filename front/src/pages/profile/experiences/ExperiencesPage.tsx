import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceList from '@/components/experiences/ExperienceList';
import { Experience } from '@/models/types';
import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from '@/store/api/experienceApiSlice';
import i18n from '@/utils/i18n';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the ExperiencesPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the ExperiencesPage component.
 */
type ExperiencesPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Experiences'
>;

/**
 * Displays the experiences page for the current user.
 * @constructor
 */
const ExperiencesPage: FC<ExperiencesPageProps> = ({ navigation }) => {
  // API calls
  const { data: experiences, refetch } = useGetExperiencesQuery();
  const [deleteExperience] = useDeleteExperienceMutation();

  // State
  const [isEditing, setIsEditing] = useState(false);

  // Callbacks
  const handleEditPress = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleCreatePress = useCallback(() => {
    navigation.navigate('ExperienceCreate');
  }, [navigation]);

  const handleEditExperiencePress = useCallback(
    (experience: Partial<Experience>) => {
      navigation.navigate('ExperienceUpdate', {
        id: experience.id,
      });
    },
    [navigation],
  );

  const handleDeleteExperiencePress = useCallback(
    (experience: Partial<Experience>) => {
      Alert.alert(
        i18n.t('profile.experiences.delete'),
        i18n.t('profile.experiences.deleteConfirm'),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.delete'),
            onPress: () => deleteExperience(experience.id),
            style: 'destructive',
          },
        ],
      );
    },
    [deleteExperience],
  );

  // Set the header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {isEditing && (
            <Appbar.Action icon={'plus'} onPress={handleCreatePress} />
          )}
          <Appbar.Action
            icon={isEditing === true ? 'check' : 'pencil'}
            onPress={handleEditPress}
          />
        </>
      ),
    });
  }, [handleCreatePress, handleEditPress, navigation, isEditing]);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (experiences === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExperienceList
        experiences={experiences}
        isEditing={isEditing}
        onItemEditPress={handleEditExperiencePress}
        onItemDeletePress={handleDeleteExperiencePress}
      />
    </ScrollView>
  );
};

export default ExperiencesPage;
