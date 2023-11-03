import { FC, useCallback } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import i18n from '@/utils/i18n';

/**
 * The styles for the ProfileUpdateInfosForm component.
 */
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  nameContainer: {
    flex: 1,
  },
  profilePicture: {
    borderRadius: 48,
    height: 96,
    width: 96,
  },
  sectionTitle: {
    marginTop: 8,
  },
  textInput: {
    marginVertical: 8,
  },
});

/**
 * The data for the profile update infos form.
 */
export type ProfileUpdateInfosFormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shortBiography: string;
};

/**
 * The props for the ProfileUpdateInfosForm component.
 */
type ProfileUpdateInfosFormProps = {
  /**
   * The URL of the profile picture.
   */
  profilePictureUrl: string;

  /**
   * The data of the form.
   */
  data: ProfileUpdateInfosFormData;

  /**
   * The function to call when the form data changes.
   */
  onDataChange: (formData: ProfileUpdateInfosFormData) => void;

  /**
   * The style of the container.
   */
  style?: ViewStyle;
};

const ProfileUpdateInfosForm: FC<ProfileUpdateInfosFormProps> = ({
  profilePictureUrl,
  data,
  onDataChange,
  style,
}) => {
  // Callbacks
  const handleInputChange = useCallback(
    (
      key: keyof ProfileUpdateInfosFormData,
      value: ProfileUpdateInfosFormData[typeof key],
    ) => {
      if (typeof value === 'string' && key === 'phone') {
        value = value.replace(/^(.+)\+/g, '$1');
        value = value.replace(/[^0-9+]/g, '');
      }

      onDataChange({
        ...data,
        [key]: value,
      });
    },
    [data, onDataChange],
  );

  return (
    <View style={style}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: profilePictureUrl,
          }}
        />

        <View style={styles.nameContainer}>
          <TextInput
            label={i18n.t('profile.info.firstName')}
            style={styles.textInput}
            value={data.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />

          <TextInput
            label={i18n.t('profile.info.lastName')}
            style={styles.textInput}
            value={data.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
      </View>

      <TextInput
        label={i18n.t('profile.info.shortBiography')}
        value={data.shortBiography}
        style={styles.textInput}
        multiline
        numberOfLines={6}
        onChangeText={(value) => handleInputChange('shortBiography', value)}
      />

      <Text variant='headlineMedium' style={styles.sectionTitle}>
        {i18n.t('profile.info.contact')}
      </Text>
      <TextInput
        label={i18n.t('profile.info.phoneNumber')}
        value={data.phone}
        style={styles.textInput}
        onChangeText={(value) => handleInputChange('phone', value)}
        keyboardType={'phone-pad'}
      />
      <TextInput
        label={i18n.t('profile.info.email')}
        value={data.email}
        style={styles.textInput}
        onChangeText={(value) => handleInputChange('email', value)}
        keyboardType={'email-address'}
      />
    </View>
  );
};

export default ProfileUpdateInfosForm;
