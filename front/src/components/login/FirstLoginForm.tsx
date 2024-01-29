import { FC, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';

import DatePicker from '@/components/utils/DatePicker';
import { Gender } from '@/models/entities/profile';
import i18n from '@/utils/i18n';

/**
 * The styles for the AvailabilityForm component.
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
 * The data for the first login form.
 */
export type FirstLoginFormData = {
  firstName: string;
  lastName: string;
  gender: Gender;
  birthday: string;
  nationality: string;
  addressFirstLine: string;
  zipCode: string;
  city: string;
  phone: string;
  email: string;
  shortBiography: string;
};

/**
 * The props for the AvailabilityForm component.
 */
type FirstLoginFormProps = {
  /**
   * The data for the form.
   */
  formData: FirstLoginFormData;

  /**
   * The function to call when the form data is updated.
   */
  onFormDataUpdate: (
    key: keyof FirstLoginFormData,
    value: FirstLoginFormData[typeof key],
  ) => void;

  /**
   * The function to call when the form is submitted.
   */
  onFormSubmit: () => void;
};

/**
 * Displays the form for filling out the user profile during the first login.
 * @constructor
 */
const AvailabilityForm: FC<FirstLoginFormProps> = ({
  formData,
  onFormDataUpdate,
  onFormSubmit,
}) => {
  // State
  const [birthdayDate, setBirthdayDate] = useState(new Date(formData.birthday));

  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [nationalityDropdownVisible, setNationalityDropdownVisible] =
    useState(false);

  // Callbacks
  const handleInputChange = useCallback(
    (key: keyof FirstLoginFormData, value: FirstLoginFormData[typeof key]) => {
      if (typeof value === 'string') {
        if (key === 'phone') {
          value = value.replace(/^(.+)\+/g, '$1');
          value = value.replace(/[^0-9+]/g, '');
        } else if (key === 'gender' || key === 'zipCode') {
          value = value.replace(/[^0-9]/g, '');
        }
      }

      onFormDataUpdate(key, value);
    },
    [onFormDataUpdate],
  );

  const handleBirthdayDateChange = useCallback(
    (date: Date) => {
      setBirthdayDate(date);
      onFormDataUpdate('birthday', date.toISOString());
    },
    [onFormDataUpdate],
  );

  return (
    <View style={styles.container}>
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

      <DropDown
        label={i18n.t('profile.info.gender')}
        visible={genderDropdownVisible}
        showDropDown={() => setGenderDropdownVisible(true)}
        onDismiss={() => setGenderDropdownVisible(false)}
        value={formData.gender}
        setValue={(value) => handleInputChange('gender', value)}
        list={[
          { label: i18n.t('common.unknown'), value: 0 },
          { label: i18n.t('profile.info.genders.male'), value: 1 },
          { label: i18n.t('profile.info.genders.female'), value: 2 },
          { label: i18n.t('common.unspecified'), value: 9 },
        ]}
      />

      <DatePicker
        date={birthdayDate}
        onDateUpdate={handleBirthdayDateChange}
        text={i18n.t('profile.info.birthday')}
      />

      <DropDown
        label={i18n.t('profile.info.nationality')}
        visible={nationalityDropdownVisible}
        showDropDown={() => setNationalityDropdownVisible(true)}
        onDismiss={() => setNationalityDropdownVisible(false)}
        value={formData.nationality}
        setValue={(value) => handleInputChange('nationality', value)}
        list={[
          { label: i18n.t('common.unknown'), value: 'UNK' },
          { label: i18n.t('nationalities.belarus'), value: 'BLR' },
          { label: i18n.t('nationalities.france'), value: 'FRA' },
          { label: i18n.t('nationalities.germany'), value: 'DEU' },
        ]}
      />

      <TextInput
        label={i18n.t('profile.address.firstLine')}
        value={formData.addressFirstLine}
        onChangeText={(value) => handleInputChange('addressFirstLine', value)}
      />

      <View style={styles.cityContainer}>
        <TextInput
          label={i18n.t('profile.address.zipCode')}
          value={formData.zipCode}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('zipCode', value)}
          keyboardType={'numeric'}
        />

        <TextInput
          label={i18n.t('profile.address.city')}
          value={formData.city}
          style={styles.cityItem}
          onChangeText={(value) => handleInputChange('city', value)}
        />
      </View>

      <TextInput
        label={i18n.t('profile.info.phoneNumber')}
        value={formData.phone}
        onChangeText={(value) => handleInputChange('phone', value)}
      />

      <TextInput
        label={i18n.t('profile.info.email')}
        value={formData.email}
        onChangeText={(value) => handleInputChange('email', value)}
        autoComplete={'email'}
        inputMode={'email'}
        keyboardType={'email-address'}
        textContentType={'emailAddress'}
      />

      <TextInput
        label={i18n.t('profile.info.shortBiography')}
        value={formData.shortBiography}
        multiline
        numberOfLines={6}
        onChangeText={(value) => handleInputChange('shortBiography', value)}
      />

      <Button mode={'contained'} onPress={onFormSubmit}>
        {i18n.t('common.submit')}
      </Button>
    </View>
  );
};

export default AvailabilityForm;
