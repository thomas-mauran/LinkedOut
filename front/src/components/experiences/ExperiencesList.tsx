import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC, useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { Experience } from '@/models/types';
import { ProfileStackParamList } from '@/pages/profile/ProfileNav';
import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

interface ExperiencesListProps {
  isEditing?: boolean;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
  editBtnInline: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  textFieldTitle: {
    marginTop: 5,
  },
});

const ExperiencesList: FC<ExperiencesListProps> = ({
  isEditing,
  navigation,
}) => {
  const [deleteExperience] = useDeleteExperienceMutation();
  const { data: experiences, refetch } = useGetExperiencesQuery('');

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const editButtonExperience = useCallback(
    (experience: Partial<Experience>) => {
      navigation.navigate('ExperienceUpdate', { ...experience });
    },
    [navigation],
  );

  const trashcanButtonExperience = useCallback(
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
            onPress: () => {
              deleteExperience(experience.id)
                .unwrap()
                .then(() => {
                  refetch();
                });
            },
          },
        ],
      );
    },
    [deleteExperience, refetch],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {experiences?.map((experience) => (
        <View key={experience.id} style={styles.horizontalContainer}>
          <View>
            <View style={styles.horizontalContainer}>
              <View>
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
            </View>
          </View>
          {isEditing && (
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
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ExperiencesList;
