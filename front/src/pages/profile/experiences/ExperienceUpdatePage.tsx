import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ExperienceForm, {
  ExperienceFormData,
} from '@/components/experiences/ExperienceForm';
import { Experience } from '@/models/types';
import { usePatchExperienceMutation } from '@/store/slice/api';

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
  verticalCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

type ExperienceUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ExperienceUpdate'
>;

const ExperienceUpdatePage = ({
  route,
  navigation,
}: ExperienceUpdatePageProps) => {
  // Api calls
  const [patchExperience] = usePatchExperienceMutation();

  // Constants
  const { id, company, job, address, startDate, endDate } =
    route.params as Experience;

  // Form State
  const [formData, setFormData] = useState<ExperienceFormData>({
    jobTitle: job?.title,
    firstLine: address?.firstLine,
    zipCode: address?.zipCode,
    city: address?.city,
    companyName: company?.name,
    startDate,
    endDate,
  });

  // Methods
  const checkPressed = useCallback(() => {
    const updatedExperience: Experience = {
      id,
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
  }, [formData, id, patchExperience, navigation]);

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [checkPressed, navigation, formData]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <ExperienceForm formData={formData} onFormDataUpdate={setFormData} />
      </View>
    </ScrollView>
  );
};

export default ExperienceUpdatePage;
