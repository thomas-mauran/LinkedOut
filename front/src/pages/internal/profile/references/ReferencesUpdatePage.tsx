import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

import {
  usePatchReferenceMutation,
  usePostReferenceMutation,
} from '@/store/slice/api';
import { Reference } from '@/store/slice/types';
import i18n from '@/utils/i18n';

import { InternalProfileStackParamList } from '../../InternalProfileNav';

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

type ReferencesUpdatePageProps = NativeStackScreenProps<
  InternalProfileStackParamList,
  'ReferencesUpdate'
>;

const ReferencesUpdatePage = ({
  route,
  navigation,
}: ReferencesUpdatePageProps) => {
  // Constants
  const { id, firstName, lastName, address, email, phone, company } =
    route.params as Reference;

  let [isCreate, setIsCreate] = useState(false);

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
      headerTitle: `${
        isCreate
          ? i18n.t('profile.reference.referenceCreate')
          : i18n.t('profile.reference.referenceEdit')
      }`, // Change this to your desired title
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [navigation, formData]);

  // To check if we are creating or updating
  useEffect(() => {
    if (id === undefined) {
      setIsCreate(true);
      handleInputChange('startDate', new Date());
      handleInputChange('endDate', new Date());
    }
  }, []);

  // Api calls
  const [patchReference] = usePatchReferenceMutation();
  const [postReference] = usePostReferenceMutation();

  const [open, setOpen] = React.useState(false);

  // Methods
  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleInputChange = (key: string, value: any, isDigitOnly = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: isDigitOnly ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  // To save the changes
  const checkPressed = useCallback(() => {
    const updatedReference: Reference = {
      id: formData.id ?? null,
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
    if (isCreate === true) {
      postReference(updatedReference)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    } else {
      patchReference(updatedReference)
        .unwrap()
        .then((r) => {
          navigation.goBack();
        });
    }
  }, [formData, patchReference, navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <View style={{ width: '100%', marginTop: 10, marginLeft: '20%' }}>
          <Text variant='headlineMedium'>
            {i18n.t('profile.info.informations')}
          </Text>
        </View>
        <TextInput
          label={i18n.t('profile.info.firstName')}
          value={formData.firstName || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
        <TextInput
          label={i18n.t('profile.info.lastName')}
          value={formData.lastName || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />

        <TextInput
          label={i18n.t('profile.info.phoneNumber')}
          value={formData.phone || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('phone', value, true)}
        />
        <TextInput
          label={i18n.t('profile.info.email')}
          value={formData.email || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('email', value)}
        />

        <View style={{ width: '100%', marginTop: 20, marginLeft: '20%' }}>
          <Text variant='headlineMedium'>
            {i18n.t('profile.company.company')}
          </Text>
        </View>
        <TextInput
          label={i18n.t('profile.company.companyName')}
          value={formData.companyName || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('companyName', value)}
        />
        <TextInput
          label={i18n.t('profile.address.firstLine')}
          value={formData.firstLine || ''}
          style={styles.textInput}
          onChangeText={(value) => handleInputChange('firstLine', value)}
        />
        <View style={styles.horizontalContainer}>
          <TextInput
            label={i18n.t('profile.address.zipCode')}
            value={formData.zipCode || ''}
            style={styles.smallInput}
            onChangeText={(value) => handleInputChange('zipCode', value, true)}
          />
          <TextInput
            label={i18n.t('profile.address.city')}
            value={formData.city || ''}
            style={styles.smallInput}
            onChangeText={(value) => handleInputChange('city', value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ReferencesUpdatePage;
