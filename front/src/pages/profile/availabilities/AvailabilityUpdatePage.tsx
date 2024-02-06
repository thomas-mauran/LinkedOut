import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm, {
  AvailabilityFormData,
} from '@/components/availabilities/AvailabilityForm';
import { UpdateAvailabilityDto } from '@/models/dtos/availability/updateAvailabilityDto';
import {
  useGetAvailabilityQuery,
  usePatchAvailabilityMutation,
} from '@/store/api/availabilityApiSlice';
import { useGetJobCategoriesQuery } from '@/store/api/jobApiSlice';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the AvailabilityUpdatePage component.
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
 * The props for the AvailabilityUpdatePage component.
 */
type AvailabilityUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityUpdate'
>;

/**
 * The parameters for the AvailabilityUpdatePage route.
 */
export type AvailabilityUpdatePageParams = {
  /**
   * The ID of the availability to update.
   */
  id: string;
};

/**
 * Displays the page for updating an availability.
 * @constructor
 */
const AvailabilityUpdatePage: FC<AvailabilityUpdatePageProps> = ({
  route,
  navigation,
}) => {
  // Route params
  const { id: availabilityId } = route.params;

  // API calls
  const { data: availability } = useGetAvailabilityQuery(availabilityId);
  const { data: jobCategories } = useGetJobCategoriesQuery();
  const [patchAvailability] = usePatchAvailabilityMutation();

  // State
  const [formData, setFormData] = useState<AvailabilityFormData | undefined>();

  // Callbacks
  const handleConfirmPress = useCallback(() => {
    const updatedAvailability: UpdateAvailabilityDto = {
      id: availabilityId,
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

    patchAvailability(updatedAvailability)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [availabilityId, formData, patchAvailability, navigation]);

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

  // Set the form data when the availability has been fetched
  useEffect(() => {
    if (availability === undefined || formData !== undefined) {
      return;
    }

    setFormData({
      jobCategoryId: availability.jobCategory.id,
      startDate: availability.startDate,
      endDate: availability.endDate,
      addressFirstLine: availability.address.firstLine,
      zipCode: availability.address.zipCode,
      city: availability.address.city,
      range: availability.range,
    });
  }, [availability, formData]);

  if (
    availability === undefined ||
    jobCategories === undefined ||
    formData === undefined
  ) {
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

export default AvailabilityUpdatePage;
