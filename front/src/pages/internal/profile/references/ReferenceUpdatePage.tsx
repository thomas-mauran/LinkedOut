import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ReferenceForm from '@/components/references/ReferenceForm';
import { Reference } from '@/models/types';
import { usePatchReferenceMutation } from '@/store/slice/api';

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

type ReferenceUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ReferenceUpdate'
>;

const ReferenceUpdatePage = ({
  route,
  navigation,
}: ReferenceUpdatePageProps) => {
  // Constants
  const { id, firstName, lastName, address, email, phone, company } =
    route.params as Reference;

  // Hooks

  // Form State
  const [formData, setFormData] = useState({
    id,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    firstLine: address?.firstLine ?? '',
    zipCode: address?.zipCode ?? '',
    city: address?.city ?? '',
    email: email ?? '',
    phone: phone ?? '',
    companyName: company?.name ?? '',
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
  const [patchReference] = usePatchReferenceMutation();

  // Methods

  const checkPressed = useCallback(() => {
    const updatedReference: Partial<Reference> = {
      id: formData.id,
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
      .then((r) => {
        navigation.goBack();
      });
  }, [formData, patchReference, navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <ReferenceForm formData={formData} setFormData={setFormData} />
      </View>
    </ScrollView>
  );
};

export default ReferenceUpdatePage;
