import { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AvailabilityList from '@/components/availabilities/AvailabilityList';
import ProfileContactInfos from '@/components/profile/ProfileContactInfos';
import ProfileFooterButtons from '@/components/profile/ProfileFooterButtons';
import ProfileHeader from '@/components/profile/header/ProfileHeader';
import BigButton from '@/components/utils/BigButton';
import { Availability } from '@/models/entities/availability';
import { Profile } from '@/models/entities/profile';
import i18n from '@/utils/i18n';

/**
 * The styles for the ProfilePage component.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  footerButtons: {
    alignSelf: 'stretch',
    marginTop: 12,
  },
});

/**
 * The props for the Profile component.
 */
type ProfileProps = {
  /**
   * The profile to display.
   */
  profile: Profile;

  /**
   * The URL of the profile picture.
   */
  profilePictureUrl: string;

  /**
   * The list of availabilities to display.
   */
  availabilities: Availability[];

  /**
   * Whether to show access to the administration panel.
   */
  showAdmin: boolean;

  /**
   * The function to call when the experiences button is pressed.
   */
  onExperiencesPress?: () => void;

  /**
   * The function to call when the references button is pressed.
   */
  onReferencesPress?: () => void;

  /**
   * The function to call when the admin button is pressed.
   */
  onAdminPress?: () => void;
};

/**
 * Displays the profile of a user.
 * @constructor
 */
const ProfileContents: FC<ProfileProps> = ({
  profile,
  profilePictureUrl,
  availabilities,
  showAdmin,
  onExperiencesPress,
  onReferencesPress,
  onAdminPress,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileHeader
        profilePictureUrl={profilePictureUrl}
        firstName={profile.firstName}
        lastName={profile.lastName}
        shortBiography={profile.shortBiography}
        averageRating={profile.averageRating}
      />

      <ProfileContactInfos phone={profile.phone} email={profile.email} />
      <AvailabilityList availabilities={availabilities} isEditing={false} />

      <ProfileFooterButtons
        nbExperiences={profile.nbExperiences}
        nbReviews={profile.nbReviews}
        onExperiencesPress={onExperiencesPress}
        onReferencesPress={onReferencesPress}
        style={styles.footerButtons}
      />

      {showAdmin && (
        <BigButton
          title={i18n.t('profile.admin.buttonTitle')}
          subtitle={i18n.t('profile.admin.buttonSubtitle')}
          onPress={onAdminPress}
        />
      )}
    </ScrollView>
  );
};

export default ProfileContents;
