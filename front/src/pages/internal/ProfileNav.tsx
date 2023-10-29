import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import { Availability, Experience, Profile, Reference } from '@/models/types';
import ExperienceCreatePage from '@/pages/internal/profile/experiences/ExperienceCreatePage ';
import ExperienceUpdatePage from '@/pages/internal/profile/experiences/ExperienceUpdatePage';
import ExperiencesPage from '@/pages/internal/profile/experiences/ExperiencesPage';
import ReferencesPage from '@/pages/internal/profile/references/ReferencesPage';
import i18n from '@/utils/i18n';

import InternalProfilePage from './profile/ProfilePage';
import ProfileUpdatePage from './profile/ProfileUpdatePage';
import AvailabilityCreatePage from './profile/availabilities/AvailabilityCreatePage';
import AvailabilityUpdatePage from './profile/availabilities/AvailabilityUpdatePage';
import ReferenceCreatePage from './profile/references/ReferenceCreatePage ';
import ReferenceUpdatePage from './profile/references/ReferenceUpdatePage';

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
