import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, Text, TextInput } from 'react-native-paper';

import { Profile } from '@/models/types';
import { ProfileStackParamList } from '@/pages/profile/ProfileNav';
import { usePatchProfileMutation } from '@/store/slice/api';
import i18n from '@/utils/i18n';

type ProfileUpdateInfosFormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  shortBiography: string;
};

interface ProfileUpdateInfosFormProps {
  initialFormData: ProfileUpdateInfosFormData;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  profilePicture: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  textInput: {
    marginVertical: 8,
    width: '100%',
  },
});

const ProfileUpdateInfosForm: FC<ProfileUpdateInfosFormProps> = ({
  initialFormData,
  navigation,
}) => {
  const [patchProfile] = usePatchProfileMutation();

  // Form State
  const [formData, setFormData] = useState<ProfileUpdateInfosFormData>({
    id: initialFormData.id,
    firstName: initialFormData.firstName ?? '',
    lastName: initialFormData.lastName ?? '',
    email: initialFormData.email ?? '',
    phone: initialFormData.phone ?? '',
    shortBiography: initialFormData.shortBiography ?? '',
  });

  // To set the action buttons in the appbar for saving the changes
  const checkPressed = useCallback(() => {
    const updatedProfile: Partial<Profile> = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      shortBiography: formData.shortBiography,
      email: formData.email,
      phone: formData.phone,
    };

    patchProfile(updatedProfile)
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  }, [formData, patchProfile, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${i18n.t('profile.info.updateProfile')}`, // Change this to your desired title
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={checkPressed} />
        </>
      ),
    });
  }, [checkPressed, formData, navigation]);

  // Methods
  const handleInputChange = useCallback(
    (
      key: keyof ProfileUpdateInfosFormData,
      value: ProfileUpdateInfosFormData[typeof key],
      isDigitOnly = false,
    ) => {
      if (typeof value === 'string' && isDigitOnly) {
        value = value.replace(/[^0-9]/g, '');
      }

      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    },
    [setFormData],
  );

  return (
    <View>
      {/* TODO FETCH THE PICTURE FROM THE API */}
      <View style={styles.horizontalContainer}>
        <View>
          <Image
            style={styles.profilePicture}
            source={{
              uri: 'https://www.challenges.fr/assets/img/2021/10/03/cover-r4x3w1000-61597036b4bce-000-9nw9nv.jpg',
            }}
          />
        </View>
        <View>
          <TextInput
            label={i18n.t('profile.info.firstName')}
            style={styles.textInput}
            value={formData.firstName || ''}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
          <TextInput
            label={i18n.t('profile.info.lastName')}
            style={styles.textInput}
            value={formData.lastName || ''}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
      </View>

      <TextInput
        label={i18n.t('profile.info.shortBiography')}
        value={formData.shortBiography || ''}
        style={styles.textInput}
        multiline
        numberOfLines={4}
        onChangeText={(value) => handleInputChange('shortBiography', value)}
      />
      <View>
        <Text variant='headlineMedium'>{i18n.t('profile.info.contact')}</Text>
      </View>
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
    </View>
  );
};

export default ProfileUpdateInfosForm;
