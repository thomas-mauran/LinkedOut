import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FC, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ProfileStackParamList } from '@/pages/profile/ProfileNav';
import i18n from '@/utils/i18n';

interface ProfileFooterButtonsProps {
  nbExperiences: number;
  nbReviews: number;
  navigation: NativeStackNavigationProp<ProfileStackParamList>;
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
  },
  textFieldElement: {
    marginBottom: 2,
    marginTop: 2,
  },
  textFieldTitle: {
    marginTop: 5,
  },
});

const ProfileFooterButtons: FC<ProfileFooterButtonsProps> = ({
  nbExperiences,
  nbReviews,
  navigation, // Add the navigation prop
}) => {
  const theme = useTheme();

  const experiencesButtonPressed = useCallback(() => {
    navigation.navigate('Experiences');
  }, [navigation]);

  const referencesButtonPressed = useCallback(() => {
    navigation.navigate('References');
  }, [navigation]);

  return (
    <View>
      <TouchableRipple
        style={styles.horizontalContainer}
        onPress={experiencesButtonPressed}
      >
        <View>
          <View>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {i18n.t('profile.info.experiences')}
            </Text>
            <Text style={styles.textFieldElement}>
              {nbExperiences} {i18n.t('profile.info.experiences')}
            </Text>
          </View>

          <View>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={{ color: theme.colors.onSurface }}
            />
          </View>
        </View>
      </TouchableRipple>
      <TouchableRipple
        style={styles.horizontalContainer}
        onPress={referencesButtonPressed}
      >
        <View>
          <View>
            <Text variant='labelLarge' style={styles.textFieldTitle}>
              {i18n.t('profile.info.references')}
            </Text>
            <Text style={styles.textFieldElement}>
              {nbReviews} {i18n.t('profile.info.reviews')}
            </Text>
          </View>

          <View>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              style={{ color: theme.colors.onSurface }}
            />
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ProfileFooterButtons;
