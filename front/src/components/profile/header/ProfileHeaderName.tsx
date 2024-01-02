import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import StarRatingSelector from '@/components/utils/StarRatingSelector';

/**
 * The styles for the ProfileHeaderName component.
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  profilePicture: {
    borderRadius: 48,
    height: 96,
    width: 96,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 16,
  },
});

/**
 * The props for the ProfileHeaderName component.
 */
type ProfileHeaderNameProps = {
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
   * The average rating of the user.
   */
  averageRating: number;
};

/**
 * Displays the profile picture and name of a user.
 * @constructor
 */
const ProfileHeaderName: FC<ProfileHeaderNameProps> = ({
  profilePictureUrl,
  firstName,
  lastName,
  averageRating,
}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{
          uri: profilePictureUrl,
        }}
      />

      <View style={styles.textContainer}>
        <Text variant='headlineLarge'>
          {firstName} {lastName}
        </Text>

        <StarRatingSelector editable={false} rating={averageRating} />
      </View>
    </View>
  );
};

export default ProfileHeaderName;
