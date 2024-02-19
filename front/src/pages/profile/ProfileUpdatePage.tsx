import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

import AvailabilityList from '@/components/availabilities/AvailabilityList';
import ProfileUpdateInfosForm, {
  ProfileUpdateInfosFormData,
} from '@/components/profile/ProfileUpdateInfosForm';
import { UpdateProfileDto } from '@/models/dtos/profile/updateProfileDto';
import { Availability } from '@/models/entities/availability';
import {
  useDeleteAvailabilityMutation,
  useGetAvailabilitiesQuery,
} from '@/store/api/availabilityApiSlice';
import {
  useGetProfilePictureQuery,
  useGetProfileQuery,
  usePatchProfileMutation,
  useRequestDeletionMutation,
} from '@/store/api/profileApiSlice';
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
  requestDeletionButton: {
    marginTop: 8,
  },
});

/**
 * The props for the ProfileUpdatePage component.
 */
type ProfileUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileUpdate'
>;

/**
 * Displays the page for updating the profile of the current user.
 * @constructor
 */
const ProfileUpdatePage: FC<ProfileUpdatePageProps> = ({ navigation }) => {
  // API calls
  const { data: profile } = useGetProfileQuery();
  const { data: profilePicture } = useGetProfilePictureQuery();
  const { data: availabilities } = useGetAvailabilitiesQuery();
  const [patchProfile] = usePatchProfileMutation();
  const [deleteAvailability] = useDeleteAvailabilityMutation();
  const [requestDeletion] = useRequestDeletionMutation();

  // State
  const [formData, setFormData] = useState<
    ProfileUpdateInfosFormData | undefined
  >();

  // Callbacks
  const handleConfirmPress = useCallback(() => {
    const updatedProfile: UpdateProfileDto = {
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

  const handleRequestDeletionPress = useCallback(() => {
    Alert.alert(
      i18n.t('profile.requestDeletion.title'),
      i18n.t('profile.requestDeletion.message'),
      [
        {
          text: i18n.t('common.cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('profile.requestDeletion.confirm'),
          onPress: () => requestDeletion(),
          style: 'destructive',
        },
      ],
    );
  }, [requestDeletion]);

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
        profilePictureUrl={profilePicture}
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

      <Button
        mode='contained-tonal'
        onPress={handleRequestDeletionPress}
        style={styles.requestDeletionButton}
        disabled={profile.deletionRequested}
      >
        {profile.deletionRequested
          ? i18n.t('profile.requestDeletion.buttonDisabled')
          : i18n.t('profile.requestDeletion.button')}
      </Button>
    </ScrollView>
  );
};

export default ProfileUpdatePage;
