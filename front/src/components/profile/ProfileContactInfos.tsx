import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import i18n from '@/utils/i18n';

/**
 * The styles for the ProfileContactInfos component.
 */
const styles = StyleSheet.create({
  itemTitle: {
    marginTop: 8,
  },
  title: {
    marginBottom: 2,
  },
});

/**
 * The props for the ProfileContactInfos component.
 */
type ProfileContactInfosProps = {
  /**
   * The phone number of the user.
   */
  phone: string;

  /**
   * The email of the user.
   */
  email: string;
};

/**
 * Displays the contact information of a user.
 * @constructor
 */
const ProfileContactInfos: FC<ProfileContactInfosProps> = ({
  phone,
  email,
}) => {
  return (
    <View>
      <Text variant='headlineMedium' style={styles.title}>
        {i18n.t('profile.info.contact')}
      </Text>

      <Text variant='labelLarge' style={styles.itemTitle}>
        {i18n.t('profile.info.phoneNumber')}
      </Text>
      <Text>{phone}</Text>

      <Text variant='labelLarge' style={styles.itemTitle}>
        {i18n.t('profile.info.email')}
      </Text>
      <Text>{email}</Text>
    </View>
  );
};

export default ProfileContactInfos;
