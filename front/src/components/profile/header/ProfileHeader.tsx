import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import ProfileHeaderDescription from '@/components/profile/header/ProfileHeaderDescription';
import ProfileHeaderName from '@/components/profile/header/ProfileHeaderName';
import i18n from '@/utils/i18n';

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

      <Button icon='file-document' mode={'contained-tonal'}>
        {i18n.t('profile.info.downloadResume')}
      </Button>
    </View>
  );
};

export default ProfileHeader;
