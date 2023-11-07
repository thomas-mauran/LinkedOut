import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import ReferenceForm, {
  ReferenceFormData,
} from '@/components/references/ReferenceForm';
import { CreateReferenceDto } from '@/models/dtos/reference/createReferenceDto';
import { usePostReferenceMutation } from '@/store/api/referenceApiSlice';

import { ProfileStackParamList } from '../ProfileNav';

/**
 * The styles for the ReferenceCreatePage component.
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
 * The props for the ReferenceCreatePage component.
 */
type ReferenceCreatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ReferenceCreate'
>;

/**
 * Displays the page for creating a reference.
 * @constructor
 */
const ReferenceCreatePage: FC<ReferenceCreatePageProps> = ({ navigation }) => {
  // API calls
  const [postReference] = usePostReferenceMutation();

  // State
  const [formData, setFormData] = useState<ReferenceFormData>({
    companyName: '',
    firstLine: '',
    zipCode: '',
    city: '',
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  // Callbacks
  const handleConfirmPress = useCallback(() => {
    const newReference: CreateReferenceDto = {
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

    postReference(newReference)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, postReference, navigation]);

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
      <ReferenceForm formData={formData} onFormDataUpdate={setFormData} />
    </ScrollView>
  );
};

export default ReferenceCreatePage;
