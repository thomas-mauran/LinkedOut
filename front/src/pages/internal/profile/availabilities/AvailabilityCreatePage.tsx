import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm from '@/components/availabilities/AvailabilityForm';
import { Availability } from '@/models/types';
import { usePostAvailabilitiesMutation } from '@/store/slice/api';

import { ProfileStackParamList } from '../../ProfileNav';

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
  divider: {
    marginVertical: 8,
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 8,
  },

  editBtnInline: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  textInput: {
    marginVertical: 8,
    width: '80%',
  },

  verticalCenterContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallInput: {
    width: '45%',
  },
});

type AvailabilityCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityCreate'
>;

const AvailabilityCreatePage = ({
  route,
  navigation,
}: AvailabilityCreatePageProps) => {
  // Constants

  // Form State
  const [formData, setFormData] = useState({
    firstLine: '',
    zipCode: '',
    city: '',
    startDate: null,
    endDate: null,
    range: [0],
    categoryId: 0,
    category: '',
  });

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [navigation, formData]);

  // Api calls
  const [postAvailability] = usePostAvailabilitiesMutation();

  // Methods

  const checkPressed = useCallback(() => {
    const updatedAvailability: Partial<Availability> = {
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      category: {
        category: formData.category,
        id: formData.categoryId,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      range: formData.range[0],
    };

    postAvailability(updatedAvailability)
      .unwrap()
      .then((r) => {
        navigation.goBack();
      });
  }, [formData, postAvailability, navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <AvailabilityForm formData={formData} setFormData={setFormData} />
      </View>
    </ScrollView>
  );
};

export default AvailabilityCreatePage;
