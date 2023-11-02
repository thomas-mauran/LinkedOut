import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm, {
  AvailabilityFormData,
} from '@/components/availabilities/AvailabilityForm';
import { Availability } from '@/models/types';
import { usePatchAvailabilitiesMutation } from '@/store/slice/api';

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

type AvailabilityUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityUpdate'
>;

const AvailabilityUpdatePage = ({
  route,
  navigation,
}: AvailabilityUpdatePageProps) => {
  // Api calls
  const [patchAvailability] = usePatchAvailabilitiesMutation();

  // Constants
  const { id, address, startDate, endDate, range, jobCategory } =
    route.params as Availability;

  // Form State
  const [formData, setFormData] = useState<AvailabilityFormData>({
    firstLine: address?.firstLine,
    zipCode: address?.zipCode,
    city: address?.city,
    startDate,
    endDate,
    range: [range ?? 0],
    categoryId: jobCategory?.id,
    category: jobCategory?.category,
  });

  // Methods
  const checkPressed = useCallback(() => {
    const updatedAvailability: Availability = {
      id,
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      jobCategory: {
        category: formData.category,
        id: formData.categoryId,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      range: formData.range[0],
    };

    patchAvailability(updatedAvailability)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, id, patchAvailability, navigation]);

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
        <AvailabilityForm formData={formData} onFormDataUpdate={setFormData} />
      </View>
    </ScrollView>
  );
};

export default AvailabilityUpdatePage;
