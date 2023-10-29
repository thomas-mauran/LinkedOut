import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AvailabilitiesList from '@/components/availabilities/AvailabilitiesList';
import ProfileUpdateInfos from '@/components/profile/ProfileUpdateInfos';

import { ProfileStackParamList } from '../ProfileNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    padding: 8,
    marginLeft: 15,
    marginRight: 15,
  },
  divider: {
    marginVertical: 8,
  },

  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
  },

  profilePicture: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },

  verticalCenterContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
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

type ProfilesUpdatePageProps = NativeStackScreenProps<
  ProfileStackParamList,
  'ProfileUpdate'
>;

const ProfilesUpdatePage = ({ route, navigation }: ProfilesUpdatePageProps) => {
  // Api calls
  const { id, firstName, lastName, shortBiography, phone, email } =
    route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileUpdateInfos
        id={id}
        firstName={firstName}
        lastName={lastName}
        shortBiography={shortBiography}
        phone={phone}
        email={email}
        navigation={navigation}
      />
      <AvailabilitiesList isEditing={true} navigation={navigation} />
    </ScrollView>
  );
};

export default ProfilesUpdatePage;
