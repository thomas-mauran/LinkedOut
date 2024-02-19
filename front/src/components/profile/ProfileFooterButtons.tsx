import { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import LogoutButton from '@/components/login/LogoutButton';
import BigButton from '@/components/utils/BigButton';
import i18n from '@/utils/i18n';

/**
 * The styles for the ProfileFooterButtons component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  logoutButton: {
    marginTop: 8,
  },
});

/**
 * The props for the ProfileFooterButtons component.
 */
type ProfileFooterButtonsProps = {
  /**
   * The number of experiences the user has.
   */
  nbExperiences: number;

  /**
   * The number of reviews the user has.
   */
  nbReviews: number;

  /**
   * The function to call when the experiences button is pressed.
   */
  onExperiencesPress?: () => void;

  /**
   * The function to call when the references button is pressed.
   */
  onReferencesPress?: () => void;

  /**
   * The style of the container.
   */
  style?: ViewStyle;
};

/**
 * Displays the buttons in the footer of the profile page.
 * @constructor
 */
const ProfileFooterButtons: FC<ProfileFooterButtonsProps> = ({
  nbExperiences,
  nbReviews,
  onExperiencesPress,
  onReferencesPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <BigButton
        title={i18n.t('profile.info.experiences')}
        subtitle={i18n.t('profile.info.experiencesCount', {
          count: nbExperiences,
        })}
        onPress={onExperiencesPress}
      />

      <BigButton
        title={i18n.t('profile.info.references')}
        subtitle={i18n.t('profile.info.reviewsCount', { count: nbReviews })}
        onPress={onReferencesPress}
      />

      <LogoutButton style={styles.logoutButton} />
    </View>
  );
};

export default ProfileFooterButtons;
