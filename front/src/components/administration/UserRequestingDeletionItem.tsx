import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';

import ProfileHeaderDescription from '@/components/profile/header/ProfileHeaderDescription';
import { Profile } from '@/models/entities/profile';

/**
 * The styles for the UserRequestingDeletionItem component.
 */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
});

/**
 * The props for the UserRequestingDeletionList component.
 */
type UserRequestingDeletionItemProps = {
  /**
   * The profile to display.
   */
  profile: Profile;

  /**
   * The function to call when an item is pressed.
   */
  onItemPress?: (profile: Profile) => void;
};

/**
 * Displays a user requesting their deletion.
 * @constructor
 */
export const UserRequestingDeletionItem: FC<
  UserRequestingDeletionItemProps
> = ({ profile, onItemPress }) => {
  return (
    <TouchableRipple onPress={() => onItemPress?.(profile)}>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text variant='headlineSmall'>
            {profile.firstName} {profile.lastName}
          </Text>
          <ProfileHeaderDescription shortBiography={profile.shortBiography} />
        </View>

        <View style={styles.iconContainer}>
          <Icon size={30} source='trash-can-outline' />
        </View>
      </View>
    </TouchableRipple>
  );
};

export default UserRequestingDeletionItem;
