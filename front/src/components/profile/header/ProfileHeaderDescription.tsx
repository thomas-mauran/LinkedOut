import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

/**
 * The styles for the ProfileHeaderDescription component.
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  description: {
    marginLeft: 8,
  },
  divider: {
    height: '100%',
    width: 4,
  },
});

/**
 * The props for the ProfileHeaderDescription component.
 */
type ProfileHeaderDescriptionProps = {
  /**
   * The short biography of the user.
   */
  shortBiography: string;
};

/**
 * The short biography of the user.
 * @constructor
 */
const ProfileHeaderDescription: FC<ProfileHeaderDescriptionProps> = ({
  shortBiography,
}) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.description}>{shortBiography}</Text>
    </View>
  );
};

export default ProfileHeaderDescription;
