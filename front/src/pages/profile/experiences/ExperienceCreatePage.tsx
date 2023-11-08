import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceForm, {
  ExperienceFormData,
} from '@/components/experiences/ExperienceForm';
import { CreateExperienceDto } from '@/models/dtos/experience/createExperienceDto';
import { usePostExperienceMutation } from '@/store/api/experienceApiSlice';

import { ProfileStackParamList } from '../ProfileNav';
import { useGetJobsQuery } from '@/store/api/jobApiSlice';

/**
 * The styles for the ExperienceCreatePage component.
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
 * The props for the ExperienceCreatePage component.
 */
type ExperienceCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ExperienceCreate'
>;

/**
 * Displays the page for creating an experience.
 * @constructor
 */
const ExperienceCreatePage: FC<ExperienceCreatePageProps> = ({
  navigation,
}) => {
  // API calls
  const { data: jobs } = useGetJobsQuery();
  const [postExperience] = usePostExperienceMutation();

  // State
  const [formData, setFormData] = useState<ExperienceFormData>({
    jobId: '',
    firstLine: '',
    zipCode: '',
    city: '',
    companyName: '',
    startDate: null,
    endDate: null,
  });

  // Callbacks
  const handleConfirmPress = useCallback(() => {
    const newExperience: CreateExperienceDto = {
      company: {
        name: formData.companyName,
      },
      jobId: '',
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
    };

    postExperience(newExperience)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, postExperience, navigation]);

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

  if (jobs === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExperienceForm         
      jobs={jobs}
      formData={formData} 
      onFormDataUpdate={setFormData} />
    </ScrollView>
  );
};

export default ExperienceCreatePage;
