import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import i18n from '@/utils/i18n';

/**
 * The styles for the ReferenceForm component.
 */
const styles = StyleSheet.create({
  cityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cityItem: {
    flex: 1,
  },
  container: {
    gap: 16,
  },
});

/**
 * The data for the reference form.
 */
export type ReferenceFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  firstLine: string;
  zipCode: string;
  city: string;
};

/**
 * The props for the ReferenceForm component.
 */
type ReferenceFormProps = {
  formData: ReferenceFormData;
  onFormDataUpdate: (data: ReferenceFormData) => void;
};

/**
 * The form for creating or updating a reference.
 * @constructor
 */
const ReferenceForm: FC<ReferenceFormProps> = ({
  formData,
  onFormDataUpdate,
}) => {
  // Callbacks
  const handleInputChange = useCallback(
    (key: keyof ReferenceFormData, value: ReferenceFormData[typeof key]) => {
      if (typeof value === 'string') {
        switch (key) {
          case 'zipCode':
            value = value.replace(/[^0-9]/g, '');
            break;

          case 'phone':
            value = value.replace(/^(.+)\+/g, '$1');
            value = value.replace(/[^0-9+]/g, '');
            break;
        }
      }

      onFormDataUpdate({
        ...formData,
        [key]: value,
      });
    },
    [formData, onFormDataUpdate],
  );

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium'>{i18n.t('profile.info.information')}</Text>

      <TextInput
        label={i18n.t('profile.info.firstName')}
        value={formData.firstName}
        onChangeText={(value) => handleInputChange('firstName', value)}
      />

      <TextInput
        label={i18n.t('profile.info.lastName')}
        value={formData.lastName}
        onChangeText={(value) => handleInputChange('lastName', value)}
      />

      <TextInput
        label={i18n.t('profile.info.phoneNumber')}
        value={formData.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />

      <TextInput
        label={i18n.t('profile.info.email')}
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <Text variant='headlineMedium'>{i18n.t('profile.company.company')}</Text>

      <TextInput
        label={i18n.t('profile.company.companyName')}
        value={formData.companyName}
        onChangeText={(value) => handleInputChange('companyName', value)}
      />

      <TextInput
        label={i18n.t('profile.address.firstLine')}
        value={formData.firstLine}
        onChangeText={(value) => handleInputChange('firstLine', value)}
      />

      <View style={styles.cityContainer}>
        <TextInput
          label={i18n.t('profile.address.zipCode')}
          value={formData.zipCode}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('zipCode', value)}
        />

        <TextInput
          label={i18n.t('profile.address.city')}
          value={formData.city}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('city', value)}
        />
      </View>
    </View>
  );
};

export default ReferenceForm;
