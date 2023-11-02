import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm, {
  AvailabilityFormData,
} from '@/components/availabilities/AvailabilityForm';
import { Availability } from '@/models/types';
import { usePostAvailabilitiesMutation } from '@/store/slice/api';

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

type AvailabilityCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityCreate'
>;

const AvailabilityCreatePage = ({
  navigation,
}: AvailabilityCreatePageProps) => {
  // Api calls
  const [postAvailability] = usePostAvailabilitiesMutation();

  // Form State
  const [formData, setFormData] = useState<AvailabilityFormData>({
    firstLine: '',
    zipCode: '',
    city: '',
    startDate: null,
    endDate: null,
    range: [0],
    categoryId: 0,
    category: '',
  });

  // Methods
  const checkPressed = useCallback(() => {
    const updatedAvailability: Partial<Availability> = {
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

    postAvailability(updatedAvailability)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, postAvailability, navigation]);

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

export default AvailabilityCreatePage;
