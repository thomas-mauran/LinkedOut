import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FC, useCallback, useEffect } from 'react';
import { Appbar } from 'react-native-paper';

import ProfileContents from '@/components/profile/ProfileContents';
import { useGetAvailabilitiesQuery } from '@/store/api/availabilityApiSlice';
import {
  useGetProfilePictureQuery,
  useGetProfileQuery,
} from '@/store/api/profileApiSlice';

import { ProfileStackParamList } from './ProfileNav';

/**
 * The props for the ProfilePage component.
 */
type ProfilePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;

/**
 * Displays the profile page for the current user.
 * @constructor
 */
const ProfilePage: FC<ProfilePageProps> = ({ navigation }) => {
  // API calls
  const { data: profile, refetch: refetchProfile } = useGetProfileQuery();
  const { data: profilePicture } = useGetProfilePictureQuery();
  const { data: availabilities, refetch: refetchAvailabilities } =
    useGetAvailabilitiesQuery();

  // Callbacks
  const handleEditPress = useCallback(() => {
    navigation.navigate('ProfileUpdate');
  }, [navigation]);

  const handleExperiencesPress = useCallback(() => {
    navigation.navigate('Experiences');
  }, [navigation]);

  const handleReferencesPress = useCallback(() => {
    navigation.navigate('References');
  }, [navigation]);

  // Set the header button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action
            icon='pencil'
            onPress={() => {
              handleEditPress();
            }}
          />
        </>
      ),
    });
  }, [handleEditPress, navigation]);

  // Fetch data from the API when the page is focused
  useFocusEffect(
    useCallback(() => {
      refetchProfile();
      refetchAvailabilities();
    }, [refetchAvailabilities, refetchProfile]),
  );

  if (profile === undefined || availabilities === undefined) {
    return null;
  }

  return (
    <ProfileContents
      profile={profile}
      profilePictureUrl={profilePicture}
      availabilities={availabilities}
      onExperiencesPress={handleExperiencesPress}
      onReferencesPress={handleReferencesPress}
    />
  );
};

export default ProfilePage;
