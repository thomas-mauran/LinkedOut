import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet } from 'react-native';

import AvailabilitiesList from '@/components/availabilities/AvailabilitiesList';
import ProfileUpdateInfosForm from '@/components/profile/ProfileUpdateInfosForm';

import { ProfileStackParamList } from './ProfileNav';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
    marginLeft: 15,
    marginRight: 15,
    padding: 8,
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

  const initialFormData = {
    id,
    firstName,
    lastName,
    shortBiography,
    phone,
    email,
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ProfileUpdateInfosForm
        initialFormData={initialFormData}
        navigation={navigation}
      />
      <AvailabilitiesList isEditing={true} navigation={navigation} />
    </ScrollView>
  );
};

export default ProfilesUpdatePage;
