import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityForm from '@/components/availabilities/AvailabilityForm';
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

type AvailabilityUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'AvailabilityUpdate'
>;

const AvailabilityUpdatePage = ({
  route,
  navigation,
}: AvailabilityUpdatePageProps) => {
  // Constants
  const { id, address, startDate, endDate, range, category } =
    route.params as Availability;

  // Form State
  const [formData, setFormData] = useState({
    id,
    firstLine: address?.firstLine,
    zipCode: address?.zipCode,
    city: address?.city,
    startDate,
    endDate,
    range: [range ?? 0],
    categoryId: category?.id,
    category: category?.category,
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
  const [patchAvailability] = usePatchAvailabilitiesMutation();

  // Methods

  const checkPressed = useCallback(() => {
    const updatedAvailability: Availability = {
      id: formData.id,
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

    patchAvailability(updatedAvailability)
      .unwrap()
      .then((r) => {
        navigation.goBack();
      });
  }, [formData, patchAvailability, navigation]);

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

export default AvailabilityUpdatePage;
