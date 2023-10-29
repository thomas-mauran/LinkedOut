import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Availability } from '@/models/types';
import i18n from '@/utils/i18n';

interface ProfileFooterButtonsProps {
  nbExperiences: number;
  nbReviews: number;
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

const ProfileFooterButtons: React.FC<
  ProfileFooterButtonsProps & { navigation: any }
> = ({
  nbExperiences,
  nbReviews,
  navigation, // Add the navigation prop
}) => {
  const theme = useTheme();
  const isDarkTheme = theme.dark;

  const experiencesButtonPressed = useCallback(() => {
    navigation.navigate('Experiences');
  }, [navigation]);

  const referencesButtonPressed = useCallback(() => {
    navigation.navigate('References');
  }, [navigation]);

  return (
    <View>
      <TouchableRipple
        style={{
          ...styles.horizontalContainer,
          marginTop: 15,
        }}
        onPress={experiencesButtonPressed}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {i18n.t('profile.info.experiences')}
            </Text>
            <Text style={styles.textFieldElement}>
              {nbExperiences} {i18n.t('profile.info.experiences')}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={[
                isDarkTheme ? { color: 'white' } : { color: 'black' },
                { marginTop: 'auto', marginBottom: 'auto', marginRight: 10 },
              ]}
            />
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={{
          ...styles.horizontalContainer,
          marginTop: 15,
        }}
        onPress={referencesButtonPressed}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <View>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {i18n.t('profile.info.references')}
            </Text>
            <Text style={styles.textFieldElement}>
              {nbReviews} {i18n.t('profile.info.reviews')}
            </Text>
          </View>

          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={[
                isDarkTheme ? { color: 'white' } : { color: 'black' },
                { marginTop: 'auto', marginBottom: 'auto', marginRight: 10 },
              ]}
            />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ProfileFooterButtons;
