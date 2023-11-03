import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceForm, {
  ExperienceFormData,
} from '@/components/experiences/ExperienceForm';
import { Experience } from '@/models/types';
import { usePostExperienceMutation } from '@/store/slice/api';

import { ProfileStackParamList } from '../ProfileNav';

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
const ExperienceCreatePage = ({ navigation }: ExperienceCreatePageProps) => {
  // API calls
  const [postExperience] = usePostExperienceMutation();

  // State
  const [formData, setFormData] = useState<ExperienceFormData>({
    jobTitle: '',
    firstLine: '',
    zipCode: '',
    city: '',
    companyName: '',
    startDate: null,
    endDate: null,
  });

  // Callbacks
  // FIXME
  const handleConfirmPress = useCallback(() => {
    const updatedExperience: Partial<Experience> = {
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

    postExperience(updatedExperience)
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ExperienceForm formData={formData} onFormDataUpdate={setFormData} />
    </ScrollView>
  );
};

export default ExperienceCreatePage;
