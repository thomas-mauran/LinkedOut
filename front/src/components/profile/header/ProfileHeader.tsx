import { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import ProfileShareResumeButton from '@/components/profile/ProfileShareResumeButton';
import ProfileHeaderDescription from '@/components/profile/header/ProfileHeaderDescription';
import ProfileHeaderName from '@/components/profile/header/ProfileHeaderName';

/**
 * The styles for the ProfileHeader component.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 12,
    justifyContent: 'flex-start',
  },
});

/**
 * The props for the ProfileHeader component.
 */
type ProfileHeaderProps = {
  /**
   * The URL of the profile picture.
   */
  profilePictureUrl: string;

  /**
   * The first name of the user.
   */
  firstName: string;

  /**
   * The last name of the user.
   */
  lastName: string;

  /**
   * The short biography of the user.
   */
  shortBiography: string;

  /**
   * The average rating of the user.
   */
  averageRating: number;
};

/**
 * Displays the header of a profile.
 * @constructor
 */
const ProfileHeader: FC<ProfileHeaderProps> = ({
  profilePictureUrl,
  firstName,
  lastName,
  shortBiography,
  averageRating,
}) => {
  return (
    <View style={styles.container}>
      <ProfileHeaderName
        profilePictureUrl={profilePictureUrl}
        firstName={firstName}
        lastName={lastName}
        averageRating={averageRating}
      />

      <ProfileHeaderDescription shortBiography={shortBiography} />
      <ProfileShareResumeButton />
    </View>
  );
};

export default ProfileHeader;
