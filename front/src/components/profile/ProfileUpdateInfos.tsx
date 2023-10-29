import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Appbar, Text, TextInput } from 'react-native-paper';

import { Profile } from '@/models/types';
import { usePatchProfileMutation } from '@/store/slice/api';
import i18n from '@/utils/i18n';

interface ProfileUpdateInfosProps {
  id: number;
  firstName: string;
  lastName: string;
  shortBiography: string;
  phone: string;
  email: string;
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  smallInput: {
    width: '55%',
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  textInput: {
    marginVertical: 8,
    width: '100%',
  },
  profilePicture: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});

const ProfileUpdateInfos: React.FC<
  ProfileUpdateInfosProps & { navigation: any }
> = ({ id, firstName, lastName, shortBiography, phone, email, navigation }) => {
  const [patchProfile] = usePatchProfileMutation();

  // Form State
  const [formData, setFormData] = useState({
    id,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email: email ?? '',
    phone: phone ?? '',
    shortBiography: shortBiography ?? '',
  });

  // To set the action buttons in the appbar for saving the changes
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${i18n.t('profile.info.updateProfile')}`, // Change this to your desired title
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
      handleInputChange('startDate', new Date());
      handleInputChange('endDate', new Date());
    }
  }, []);

  // To save the changes
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
      .then((r) => {
        navigation.goBack();
      });
  }, [formData, patchProfile, navigation]);

  // Methods
  const handleInputChange = (key: string, value: any, isDigitOnly = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: isDigitOnly ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  return (
    <View style={{ width: '100%' }}>
      {/* TODO FETCH THE PICTURE FROM THE API */}
      <View
        style={[
          styles.horizontalContainer,
          { width: '100%', justifyContent: 'space-between' },
        ]}
      >
        <View>
          <Image
            style={[
              styles.profilePicture,
              { marginLeft: 40, marginTop: 'auto', marginBottom: 'auto' },
            ]}
            source={{
              uri: 'https://www.challenges.fr/assets/img/2021/10/03/cover-r4x3w1000-61597036b4bce-000-9nw9nv.jpg',
            }}
          />
        </View>
        <View style={{ width: '55%' }}>
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
      <View style={{ width: '100%', marginTop: 10 }}>
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

export default ProfileUpdateInfos;
