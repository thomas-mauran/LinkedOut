import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import ExperiencesPage from '@/pages/internal/profile/experiences/ExperiencesPage';
import ExperiencesUpdatePage from '@/pages/internal/profile/experiences/ExperiencesUpdatePage';
import ReferencesPage from '@/pages/internal/profile/references/ReferencesPage';
import {
  Availability,
  Experience,
  Profile,
  Reference,
} from '@/store/slice/types';
import i18n from '@/utils/i18n';

import InternalProfilePage from './profile/ProfilePage';
import ProfileUpdatePage from './profile/ProfileUpdatePage';
import AvailabilitiesUpdatePage from './profile/availabilities/AvailabilitiesUpdatePage';
import ReferencesUpdatePage from './profile/references/ReferencesUpdatePage';

/**
 * The parameter list for the InternalProfileStack navigator.
 */

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileUpdate: Profile;
  AvailabilitiesUpdate: Availability;
  Experiences: undefined;
  ExperiencesUpdate: Experience;
  References: undefined;
  ReferencesUpdate: Reference;
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
        options={{ headerTitle: `${i18n.t('profile.info.profil')}` }}
      />
      <InternalProfileStack.Screen
        name='ProfileUpdate'
        component={ProfileUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.info.profil')}` }}
      />
      <InternalProfileStack.Screen
        name='AvailabilitiesUpdate'
        component={AvailabilitiesUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.info.experiences')}` }}
      />
      <InternalProfileStack.Screen
        name='Experiences'
        component={ExperiencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.experiences')}` }}
      />
      <InternalProfileStack.Screen
        name='ExperiencesUpdate'
        component={ExperiencesUpdatePage}
      />
      <InternalProfileStack.Screen
        name='References'
        component={ReferencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.references')}` }}
      />
      <InternalProfileStack.Screen
        name='ReferencesUpdate'
        component={ReferencesUpdatePage}
      />
    </InternalProfileStack.Navigator>
  );
};

export default InternalProfileNav;
