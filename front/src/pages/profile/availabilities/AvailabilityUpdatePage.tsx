import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm, {
  AvailabilityFormData,
} from '@/components/availabilities/AvailabilityForm';
import { Availability } from '@/models/types';
import {
  useGetAvailabilityQuery,
  useGetJobCategoriesQuery,
  usePatchAvailabilitiesMutation,
} from '@/store/slice/api';

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
  id: number;
};

/**
 * Displays the page for updating an availability.
 * @constructor
 */
const AvailabilityUpdatePage = ({
  route,
  navigation,
}: AvailabilityUpdatePageProps) => {
  // Route params
  const { id: availabilityId } = route.params;

  // API calls
  const { data: availability } = useGetAvailabilityQuery(availabilityId);
  const { data: jobCategories } = useGetJobCategoriesQuery();
  const [patchAvailability] = usePatchAvailabilitiesMutation();

  // State
  const [formData, setFormData] = useState<AvailabilityFormData | undefined>();

  // Callbacks
  // FIXME
  const handleConfirmPress = useCallback(() => {
    const updatedAvailability: Availability = {
      id: availabilityId,
      address: {
        firstLine: formData.addressFirstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      jobCategory: {
        id: formData.jobCategoryId,
        category: '',
      },
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
