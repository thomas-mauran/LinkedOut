import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import AvailabilitiesList from '@/components/availabilities/AvailabilitiesList';
import ProfileContactInfos from '@/components/profile/ProfileContactInfos';
import ProfileFooterButtons from '@/components/profile/ProfileFooterButtons';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Profile } from '@/models/types';
import { useGetProfileQuery } from '@/store/slice/api';

import { ProfileStackParamList } from './ProfileNav';

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
});

type ProfileAppPageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'Profile'
>;

/**
 * The internal page that has links to all the application pages.
 * @constructor
 */
const ProfilePage = ({ navigation }: ProfileAppPageProps) => {
  const { data: profile, refetch } = useGetProfileQuery();

  const editButtonPressed = useCallback(
    (newProfile: Partial<Profile>) => {
      navigation.navigate('ProfileUpdate', { ...newProfile });
    },
    [navigation],
  );

  useEffect(() => {
    // Set the action buttons in the appbar for rotating the picture
    navigation.setOptions({
      headerRight: () => (
        <>
          <Appbar.Action
            icon='pencil'
            onPress={() => {
              editButtonPressed(profile);
            }}
          />
        </>
      ),
    });
  }, [editButtonPressed, navigation, profile]);

  // Fetch data from the API
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileHeader
        firstName={profile?.firstName}
        lastName={profile?.lastName}
        shortBiography={profile?.shortBiography}
        averageRating={profile?.averageRating}
      />
      <View>
        <ProfileContactInfos phone={profile?.phone} email={profile?.email} />
        <AvailabilitiesList isEditing={false} navigation={navigation} />
        <ProfileFooterButtons
          nbExperiences={profile?.nbExperiences}
          nbReviews={profile?.nbReviews}
          navigation={navigation}
        />
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
