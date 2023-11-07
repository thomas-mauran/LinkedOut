import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceForm, {
  ExperienceFormData,
} from '@/components/experiences/ExperienceForm';
import { Experience } from '@/models/types';
import {
  useGetExperienceQuery,
  usePatchExperienceMutation,
} from '@/store/api/experienceApiSlice';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the ExperienceUpdatePage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the ExperienceUpdatePage component.
 */
type ExperienceUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ExperienceUpdate'
>;

/**
 * The parameters for the ExperienceUpdatePage route.
 */
export type ExperienceUpdatePageParams = {
  /**
   * The ID of the experience to update.
   */
  id: number;
};

/**
 * Displays the page for updating an experience.
 * @constructor
 */
const ExperienceUpdatePage: FC<ExperienceUpdatePageProps> = ({
  route,
  navigation,
}) => {
  // Route params
  const { id: experienceId } = route.params;

  // API calls
  const { data: experience } = useGetExperienceQuery(experienceId);
  const [patchExperience] = usePatchExperienceMutation();

  // State
  const [formData, setFormData] = useState<ExperienceFormData | undefined>();

  // Callbacks
  // FIXME
  const handleConfirmPress = useCallback(() => {
    const updatedExperience: Experience = {
      id: experienceId,
      company: {
        name: formData.companyName,
      },
      job: {
        title: formData.jobTitle,
      },
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    patchExperience(updatedExperience)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [experienceId, formData, patchExperience, navigation]);

  // Set the header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={handleConfirmPress} />
        </>
      ),
    });
  }, [handleConfirmPress, navigation, formData]);

  // Set the form data when the experience has been fetched
  useEffect(() => {
    if (experience === undefined || formData !== undefined) {
      return;
    }

    setFormData({
      jobTitle: experience.job.title,
      startDate: experience.startDate,
      endDate: experience.endDate,
      companyName: experience.company.name,
      firstLine: experience.address.firstLine,
      zipCode: experience.address.zipCode,
      city: experience.address.city,
    });
  }, [experience, formData]);

  if (experience === undefined || formData === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExperienceForm formData={formData} onFormDataUpdate={setFormData} />
    </ScrollView>
  );
};

export default ExperienceUpdatePage;
