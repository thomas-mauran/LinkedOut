import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, IconButton, Text } from 'react-native-paper';

import { Experience } from '@/models/types';
import {
  useDeleteExperienceMutation,
  useGetExperiencesQuery,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

interface ExperiencesListProps {
  isEditing?: boolean;
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

  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  divider: {
    marginVertical: 8,
  },
});

const ExperiencesList: React.FC<ExperiencesListProps & { navigation: any }> = ({
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
    [navigation, experiences],
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
            onPress: () => handleDelete(experience),
          },
        ],
      );
    },
    [],
  );

  const handleDelete = (experience: Partial<Experience>) => {
    deleteExperience(experience.id)
      .unwrap()
      .then(() => {
        refetch();
      });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {experiences?.map((experience) => (
        <View key={experience.id} style={styles.horizontalContainer}>
          <View style={{ width: '80%' }}>
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
            </View>
          </View>
          {isEditing && (
            <View
              style={[
                styles.horizontalContainer,
                {
                  justifyContent: 'space-around',
                  width: '20%',
                },
              ]}
            >
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
