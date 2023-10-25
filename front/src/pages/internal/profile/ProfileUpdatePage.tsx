import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import * as React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Text, TextInput } from 'react-native-paper';

import TextField from '@/components/TextField';
import {
  useDeleteAvailabilitiesMutation,
  useGetAvailabilitiesQuery,
  usePatchProfileMutation,
} from '@/store/slice/api';
import { Availability, Profile } from '@/store/slice/types';
import i18n from '@/utils/i18n';

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
    width: '90%',
  },
  profilePicture: {
    borderRadius: 50,
    width: 100,
    height: 100,
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

type ProfilesUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileUpdate'
>;

const ProfilesUpdatePage = ({ route, navigation }: ProfilesUpdatePageProps) => {
  // Constants
  const { id, firstName, lastName, email, phone, shortBiography } =
    route.params as Profile;

  // Hooks

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

  // Api calls
  const [patchProfile] = usePatchProfileMutation();
  const { data: availabilities, refetch } = useGetAvailabilitiesQuery('');
  const [deleteAvailability] = useDeleteAvailabilitiesMutation();

  // To check if we are creating or updating
  useEffect(() => {
    if (id === undefined) {
      handleInputChange('startDate', new Date());
      handleInputChange('endDate', new Date());
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Methods
  const handleInputChange = (key: string, value: any, isDigitOnly = false) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: isDigitOnly ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  // To save the changes
  const checkPressed = useCallback(() => {
    const updatedProfile: Profile = {
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
        console.log(r);
        navigation.goBack();
      });
  }, [formData, patchProfile, navigation]);

  const editButtonAvailability = useCallback(
    (availability: Availability) => {
      navigation.navigate('AvailabilitiesUpdate', { ...availability });
    },
    [navigation, availabilities],
  );

  const trashcanButtonAvailability = useCallback(
    (availability: Availability) => {
      deleteAvailability(availability.id)
        .unwrap()
        .then(() => {
          refetch();
        });
    },
    [],
  );

  const createButtonAvailability = useCallback(() => {
    navigation.navigate('AvailabilitiesUpdate', {});
  }, [navigation]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.verticalCenterContainer}>
        {/* TODO FETCH THE PICTURE FROM THE API */}
        <View style={[styles.horizontalContainer, { width: '100%' }]}>
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
        <View style={{ width: '100%', marginTop: 10, marginLeft: '10%' }}>
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
        {/* TODO: Select file for CV */}
        <View style={{ width: '100%', marginTop: 10, marginLeft: '10%' }}>
          <View style={[styles.horizontalContainer, { width: '100%' }]}>
            <Text variant='headlineMedium'>
              {i18n.t('profile.info.availabilities')}
            </Text>
            <IconButton
              icon='plus'
              style={[styles.editBtnInline, { marginRight: 30 }]}
              onPress={() => createButtonAvailability()}
            />
          </View>
          {availabilities?.map((availability) => (
            <View key={availability.id} style={{ width: '100%' }}>
              <View style={[styles.horizontalContainer]}>
                <View style={{ width: '80%' }}>
                  <TextField
                    style={{ marginLeft: 5 }}
                    title={availability.category.category}
                    list={[
                      `${new Date(availability.startDate).toLocaleDateString(
                        'apiS',
                      )} - ${new Date(availability.endDate).toLocaleDateString(
                        'apiS',
                      )}`,
                      `${availability?.address.firstLine}, ${availability?.address.city}, ${availability?.address.zipCode}`,
                    ]}
                  />
                </View>

                <View
                  style={[
                    styles.horizontalContainer,
                    {
                      width: '20%',
                    },
                  ]}
                >
                  <IconButton
                    icon='pencil'
                    style={styles.editBtnInline}
                    onPress={() => editButtonAvailability(availability)}
                  />
                  <IconButton
                    icon='trash-can'
                    style={styles.editBtnInline}
                    onPress={() => trashcanButtonAvailability(availability)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilesUpdatePage;
