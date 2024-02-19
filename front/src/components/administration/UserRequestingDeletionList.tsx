import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import UserRequestingDeletionItem from '@/components/administration/UserRequestingDeletionItem';
import { Profile } from '@/models/entities/profile';

/**
 * The styles for the ExperienceList component.
 */
const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 8,
    width: '100%',
  },
  itemContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
});

/**
 * The props for the UserRequestingDeletionList component.
 */
type UserRequestingDeletionListProps = {
  /**
   * The list of profiles to display.
   */
  profiles: Profile[];

  /**
   * The function to call when an item is pressed.
   */
  onItemPress?: (profile: Profile) => void;
};

/**
 * Displays a list of users requesting their deletion.
 * @constructor
 */
const UserRequestingDeletionList: FC<UserRequestingDeletionListProps> = ({
  profiles,
  onItemPress,
}) => {
  return (
    <View>
      {profiles?.map((profile) => (
        <View key={profile.id} style={styles.itemContainer}>
          <UserRequestingDeletionItem
            profile={profile}
            onItemPress={onItemPress}
          />

          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
  );
};

export default UserRequestingDeletionList;
