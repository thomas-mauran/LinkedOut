import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import { Availability, Experience, Profile, Reference } from '@/models/types';
import ExperienceCreatePage from '@/pages/profile/experiences/ExperienceCreatePage';
import ExperienceUpdatePage from '@/pages/profile/experiences/ExperienceUpdatePage';
import ExperiencesPage from '@/pages/profile/experiences/ExperiencesPage';
import ReferencesPage from '@/pages/profile/references/ReferencesPage';
import i18n from '@/utils/i18n';

import InternalProfilePage from '@/pages/profile/ProfilePage';
import ProfileUpdatePage from '@/pages/profile/ProfileUpdatePage';
import AvailabilityCreatePage from '@/pages/profile/availabilities/AvailabilityCreatePage';
import AvailabilityUpdatePage from '@/pages/profile/availabilities/AvailabilityUpdatePage';
import ReferenceCreatePage from '@/pages/profile/references/ReferenceCreatePage';
import ReferenceUpdatePage from '@/pages/profile/references/ReferenceUpdatePage';

/**
 * The parameter list for the InternalProfileStack navigator.
 */

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileUpdate: Partial<Profile>;
  AvailabilityUpdate: Partial<Availability>;
  AvailabilityCreate: undefined;
  Experiences: undefined;
  ExperienceCreate: undefined;
  ExperienceUpdate: Partial<Experience>;
  References: undefined;
  ReferenceCreate: undefined;
  ReferenceUpdate: Partial<Reference>;
};

const InternalProfileStack =
  createNativeStackNavigator<ProfileStackParamList>();

/**
 * The stack navigator for the internal Profileellaneous pages.
 * @constructor
 */
const InternalProfileNav = () => {
  return (
    <InternalProfileStack.Navigator
      initialRouteName='Profile'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <InternalProfileStack.Screen
        name='Profile'
        component={InternalProfilePage}
        options={{ headerTitle: `${i18n.t('profile.info.profile')}` }}
      />
      <InternalProfileStack.Screen
        name='ProfileUpdate'
        component={ProfileUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.info.profile')}` }}
      />
      <InternalProfileStack.Screen
        name='AvailabilityUpdate'
        component={AvailabilityUpdatePage}
        options={{
          headerTitle: `${i18n.t('profile.availabilities.edit')}`,
        }}
      />
      <InternalProfileStack.Screen
        name='AvailabilityCreate'
        component={AvailabilityCreatePage}
        options={{
          headerTitle: `${i18n.t('profile.availabilities.create')}`,
        }}
      />
      <InternalProfileStack.Screen
        name='Experiences'
        component={ExperiencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.experiences')}` }}
      />
      <InternalProfileStack.Screen
        name='ExperienceCreate'
        component={ExperienceCreatePage}
        options={{ headerTitle: `${i18n.t('profile.experiences.create')}` }}
      />
      <InternalProfileStack.Screen
        name='ExperienceUpdate'
        component={ExperienceUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.experiences.edit')}` }}
      />
      <InternalProfileStack.Screen
        name='References'
        component={ReferencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.references')}` }}
      />
      <InternalProfileStack.Screen
        name='ReferenceUpdate'
        component={ReferenceUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.references.edit')}` }}
      />
      <InternalProfileStack.Screen
        name='ReferenceCreate'
        component={ReferenceCreatePage}
        options={{ headerTitle: `${i18n.t('profile.references.edit')}` }}
      />
    </InternalProfileStack.Navigator>
  );
};

export default InternalProfileNav;
