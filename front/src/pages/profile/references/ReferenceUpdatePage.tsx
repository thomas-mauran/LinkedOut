import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ReferenceForm, {
  ReferenceFormData,
} from '@/components/references/ReferenceForm';
import { Reference } from '@/models/types';
import {
  useGetReferenceQuery,
  usePatchReferenceMutation,
} from '@/store/slice/api';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the ReferenceUpdatePage component.
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
 * The props for the ReferenceUpdatePage component.
 */
type ReferenceUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ReferenceUpdate'
>;

/**
 * The parameters for the ReferenceUpdatePage route.
 */
export type ReferenceUpdatePageParams = {
  /**
   * The ID of the reference to update.
   */
  id: number;
};

/**
 * Displays the page for updating a reference.
 * @constructor
 */
const ReferenceUpdatePage: FC<ReferenceUpdatePageProps> = ({
  route,
  navigation,
}) => {
  // Route params
  const { id: referenceId } = route.params;

  // API calls
  const { data: reference } = useGetReferenceQuery(referenceId);
  const [patchReference] = usePatchReferenceMutation();

  // State
  const [formData, setFormData] = useState<ReferenceFormData | undefined>();

  // Callbacks
  // FIXME
  const handleConfirmPress = useCallback(() => {
    const updatedReference: Partial<Reference> = {
      id: referenceId,
      company: {
        name: formData.companyName,
      },
      address: {
        firstLine: formData.firstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      email: formData.email,
      phone: formData.phone,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    patchReference(updatedReference)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, referenceId, patchReference, navigation]);

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

  // Set the form data when the reference has been fetched
  useEffect(() => {
    if (reference === undefined || formData !== undefined) {
      return;
    }

    setFormData({
      companyName: reference.company.name,
      firstLine: reference.address.firstLine,
      zipCode: reference.address.zipCode,
      city: reference.address.city,
      email: reference.email,
      phone: reference.phone,
      firstName: reference.firstName,
      lastName: reference.lastName,
    });
  }, [formData, reference]);

  if (reference === undefined || formData === undefined) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ReferenceForm formData={formData} onFormDataUpdate={setFormData} />
    </ScrollView>
  );
};

export default ReferenceUpdatePage;
