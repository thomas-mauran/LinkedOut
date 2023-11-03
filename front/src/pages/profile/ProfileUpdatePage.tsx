import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilityList from '@/components/availabilities/AvailabilityList';
import ProfileUpdateInfosForm, {
  ProfileUpdateInfosFormData,
} from '@/components/profile/ProfileUpdateInfosForm';
import { Availability, Profile } from '@/models/types';
import {
  useDeleteAvailabilitiesMutation,
  useGetAvailabilitiesQuery,
  useGetProfileQuery,
  usePatchProfileMutation,
} from '@/store/slice/api';
import i18n from '@/utils/i18n';

import { ProfileStackParamList } from './ProfileNav';

/**
 * The styles for the ProfileUpdatePage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
});

/**
 * The props for the ProfileUpdatePage component.
 */
type ProfilesUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileUpdate'
>;

/**
 * Displays the page for updating the profile of the current user.
 * @constructor
 */
const ProfilesUpdatePage = ({ navigation }: ProfilesUpdatePageProps) => {
  // API calls
  const { data: profile } = useGetProfileQuery();
  const { data: availabilities } = useGetAvailabilitiesQuery();
  const [patchProfile] = usePatchProfileMutation();
  const [deleteAvailability] = useDeleteAvailabilitiesMutation();

  // State
  const [formData, setFormData] = useState<
    ProfileUpdateInfosFormData | undefined
  >();

  // Callbacks
  const handleConfirmPress = useCallback(() => {
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
  }, [formData, navigation, patchProfile]);

  const handleCreateAvailabilityPress = useCallback(() => {
    navigation.navigate('AvailabilityCreate');
  }, [navigation]);

  const handleEditAvailabilityPress = useCallback(
    (availability: Availability) => {
      navigation.navigate('AvailabilityUpdate', { id: availability.id });
    },
    [navigation],
  );

  const handleDeleteAvailabilityPress = useCallback(
    (availability: Availability) => {
      Alert.alert(
        i18n.t('profile.availabilities.delete'),
        i18n.t('profile.availabilities.deleteConfirm'),
        [
          {
            text: i18n.t('common.cancel'),
            style: 'cancel',
          },
          {
            text: i18n.t('common.delete'),
            onPress: () => deleteAvailability(availability.id),
            style: 'destructive',
          },
        ],
      );
    },
    [deleteAvailability],
  );

  // Set the header button
  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${i18n.t('profile.info.updateProfile')}`, // Change this to your desired title
      headerRight: () => (
        <>
          <Appbar.Action icon='check' onPress={handleConfirmPress} />
        </>
      ),
    });
  }, [handleConfirmPress, navigation]);

  // Set the form data when the profile has been fetched
  useEffect(() => {
    if (profile === undefined || formData !== undefined) {
      return;
    }

    setFormData(profile);
  }, [formData, profile]);

  if (
    availabilities === undefined ||
    profile === undefined ||
    formData === undefined
  ) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileUpdateInfosForm
        profilePictureUrl={`${process.env.EXPO_PUBLIC_API_URL}/profile/photo`}
        data={formData}
        onDataChange={setFormData}
      />

      <AvailabilityList
        availabilities={availabilities}
        isEditing={true}
        onCreatePress={handleCreateAvailabilityPress}
        onItemEditPress={handleEditAvailabilityPress}
        onItemDeletePress={handleDeleteAvailabilityPress}
      />
    </ScrollView>
  );
};

export default ProfilesUpdatePage;
