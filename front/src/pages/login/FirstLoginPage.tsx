import { FC, useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import FirstLoginForm, {
  FirstLoginFormData,
} from '@/components/login/FirstLoginForm';
import LogoutButton from '@/components/login/LogoutButton';
import { CreateProfileDto } from '@/models/dtos/profile/createProfileDto';
import { usePutProfileMutation } from '@/store/api/profileApiSlice';
import i18n from '@/utils/i18n';

/**
 * The styles for the FirstLoginPage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * Displays the page for creating the profile a first time.
 * @constructor
 */
const FirstLoginPage: FC = () => {
  // API calls
  const [putProfile] = usePutProfileMutation();

  // State
  const [formData, setFormData] = useState<FirstLoginFormData>({
    firstName: '',
    lastName: '',
    gender: 0,
    birthday: new Date().toISOString(),
    nationality: 'FRA',
    addressFirstLine: '',
    zipCode: '',
    city: '',
    phone: '',
    email: '',
    shortBiography: '',
  });

  // Callbacks
  const handleFormSubmit = useCallback(() => {
    const birthdayTimeIndex = formData.birthday.indexOf('T');

    const newProfile: CreateProfileDto = {
      address: {
        firstLine: formData.addressFirstLine,
        zipCode: formData.zipCode,
        city: formData.city,
      },
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      birthday: formData.birthday.slice(0, birthdayTimeIndex),
      nationality: formData.nationality,
      phone: formData.phone,
      email: formData.email,
      shortBiography: formData.shortBiography,
    };

    putProfile(newProfile);
  }, [formData, putProfile]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text variant={'displaySmall'}>{i18n.t('profile.create')}</Text>

      <FirstLoginForm
        formData={formData}
        onFormDataUpdate={(key, value) =>
          setFormData((prev) => ({ ...prev, [key]: value }))
        }
        onFormSubmit={handleFormSubmit}
      />

      <LogoutButton mode={'contained-tonal'} />
    </ScrollView>
  );
};

export default FirstLoginPage;
