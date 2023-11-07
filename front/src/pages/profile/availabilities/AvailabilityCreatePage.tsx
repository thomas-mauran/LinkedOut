import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm, {
  AvailabilityFormData,
} from '@/components/availabilities/AvailabilityForm';
import { CreateAvailabilityDto } from '@/models/dtos/availability/createAvailabilityDto';
import { usePostAvailabilitiesMutation } from '@/store/api/availabilityApiSlice';
import { useGetJobCategoriesQuery } from '@/store/api/jobApiSlice';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the AvailabilityCreatePage component.
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
 * The props for the AvailabilityCreatePage component.
 */
type AvailabilityCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityCreate'
>;

/**
 * Displays the page for creating an availability.
 * @constructor
 */
const AvailabilityCreatePage: FC<AvailabilityCreatePageProps> = ({
  navigation,
}) => {
  // API calls
  const { data: jobCategories } = useGetJobCategoriesQuery();
  const [postAvailability] = usePostAvailabilitiesMutation();

  // State
  const [formData, setFormData] = useState<AvailabilityFormData>({
    jobCategoryId: 0,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    addressFirstLine: '',
    zipCode: '',
    city: '',
    range: 1,
  });

  // Callbacks
  const handleConfirmPress = useCallback(() => {
    const newAvailability: CreateAvailabilityDto = {
      address: {
        firstLine: formData.addressFirstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      jobCategoryId: formData.jobCategoryId,
      startDate: formData.startDate,
      endDate: formData.endDate,
      range: formData.range,
    };

    postAvailability(newAvailability)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, postAvailability, navigation]);

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

  if (jobCategories === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <AvailabilityForm
        jobCategories={jobCategories}
        formData={formData}
        onFormDataUpdate={setFormData}
      />
    </ScrollView>
  );
};

export default AvailabilityCreatePage;
