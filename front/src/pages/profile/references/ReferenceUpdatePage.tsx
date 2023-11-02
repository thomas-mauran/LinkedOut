import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ReferenceForm, {
  ReferenceFormData,
} from '@/components/references/ReferenceForm';
import { Reference } from '@/models/types';
import { usePatchReferenceMutation } from '@/store/slice/api';

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

type ReferenceUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ReferenceUpdate'
>;

const ReferenceUpdatePage = ({
  route,
  navigation,
}: ReferenceUpdatePageProps) => {
  // Api calls
  const [patchReference] = usePatchReferenceMutation();

  // Constants
  const { id, firstName, lastName, address, email, phone, company } =
    route.params as Reference;

  // Form State
  const [formData, setFormData] = useState<ReferenceFormData>({
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    firstLine: address?.firstLine ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    email: email ?? '',
    phone: phone ?? '',
    companyName: company?.name ?? '',
  });

  // Methods
  const checkPressed = useCallback(() => {
    const updatedReference: Partial<Reference> = {
      id,
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
  }, [formData, id, patchReference, navigation]);

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
        <ReferenceForm formData={formData} onFormDataUpdate={setFormData} />
      </View>
    </ScrollView>
  );
};

export default ReferenceUpdatePage;
