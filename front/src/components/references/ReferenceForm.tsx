import { FC, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import i18n from '@/utils/i18n';

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
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    width: '80%',
  },
  smallInput: {
    width: '45%',
  },
  textInput: {
    marginVertical: 8,
    width: '80%',
  },
  verticalCenterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

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

type ReferenceFormProps = {
  formData: ReferenceFormData;
  onFormDataUpdate: (data: ReferenceFormData) => void;
};

const ReferenceForm: FC<ReferenceFormProps> = ({
  formData,
  onFormDataUpdate,
}) => {
  // Methods
  const handleInputChange = useCallback(
    (
      key: keyof ReferenceFormData,
      value: ReferenceFormData[typeof key],
      isDigitOnly = false,
    ) => {
      if (typeof value === 'string' && isDigitOnly) {
        value = value.replace(/[^0-9]/g, '');
      }

      onFormDataUpdate({
        ...formData,
        [key]: value,
      });
    },
    [formData, onFormDataUpdate],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        <View>
          <Text variant='headlineMedium'>
            {i18n.t('profile.info.information')}
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

        <View>
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

export default ReferenceForm;
