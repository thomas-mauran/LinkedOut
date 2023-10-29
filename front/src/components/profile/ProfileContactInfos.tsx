import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import i18n from '@/utils/i18n';

interface ProfileContactInfosProps {
  phone: string;
  email: string;
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFieldTitle: {
    marginTop: 5,
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
});

const ProfileContactInfos: React.FC<ProfileContactInfosProps> = ({
  phone,
  email,
}) => {
  return (
    <View>
      <Text variant='titleLarge' style={{ marginBottom: 5 }}>
        {i18n.t('profile.info.contact')}
      </Text>
      <Text variant='labelLarge' style={styles.textFieldTitle}>
        {i18n.t('profile.info.phoneNumber')}
      </Text>
      <Text style={styles.textFieldElement}>{phone}</Text>
      <Text variant='labelLarge' style={styles.textFieldTitle}>
        {i18n.t('profile.info.email')}
      </Text>
      <Text style={styles.textFieldElement}>{email}</Text>
    </View>
  );
};

export default ProfileContactInfos;
