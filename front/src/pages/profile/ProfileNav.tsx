import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import AdminUserDeletionPage from '@/pages/administration/AdminUserDeletionPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ProfileUpdatePage from '@/pages/profile/ProfileUpdatePage';
import AvailabilityCreatePage from '@/pages/profile/availabilities/AvailabilityCreatePage';
import AvailabilityUpdatePage, {
  AvailabilityUpdatePageParams,
} from '@/pages/profile/availabilities/AvailabilityUpdatePage';
import ExperienceCreatePage from '@/pages/profile/experiences/ExperienceCreatePage';
import ExperienceUpdatePage, {
  ExperienceUpdatePageParams,
} from '@/pages/profile/experiences/ExperienceUpdatePage';
import ExperiencesPage from '@/pages/profile/experiences/ExperiencesPage';
import ReferenceCreatePage from '@/pages/profile/references/ReferenceCreatePage';
import ReferenceUpdatePage, {
  ReferenceUpdatePageParams,
} from '@/pages/profile/references/ReferenceUpdatePage';
import ReferencesPage from '@/pages/profile/references/ReferencesPage';
import i18n from '@/utils/i18n';

/**
 * The parameter list for the ProfileNav navigator.
 */
export type ProfileStackParamList = {
  Profile: undefined;
  ProfileUpdate: undefined;
  AvailabilityCreate: undefined;
  AvailabilityUpdate: AvailabilityUpdatePageParams;
  Experiences: undefined;
  ExperienceCreate: undefined;
  ExperienceUpdate: ExperienceUpdatePageParams;
  References: undefined;
  ReferenceCreate: undefined;
  ReferenceUpdate: ReferenceUpdatePageParams;
  AdminUserDeletion: undefined;
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

/**
 * The stack navigator for the profile pages.
 * @constructor
 */
const ProfileNav = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName='Profile'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <ProfileStack.Screen
        name='Profile'
        component={ProfilePage}
        options={{ headerTitle: `${i18n.t('profile.profile')}` }}
      />
      <ProfileStack.Screen
        name='ProfileUpdate'
        component={ProfileUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.profile')}` }}
      />

      <ProfileStack.Screen
        name='AvailabilityCreate'
        component={AvailabilityCreatePage}
        options={{
          headerTitle: `${i18n.t('profile.availabilities.create')}`,
        }}
      />
      <ProfileStack.Screen
        name='AvailabilityUpdate'
        component={AvailabilityUpdatePage}
        options={{
          headerTitle: `${i18n.t('profile.availabilities.edit')}`,
        }}
      />

      <ProfileStack.Screen
        name='Experiences'
        component={ExperiencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.experiences')}` }}
      />
      <ProfileStack.Screen
        name='ExperienceCreate'
        component={ExperienceCreatePage}
        options={{ headerTitle: `${i18n.t('profile.experiences.create')}` }}
      />
      <ProfileStack.Screen
        name='ExperienceUpdate'
        component={ExperienceUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.experiences.edit')}` }}
      />

      <ProfileStack.Screen
        name='References'
        component={ReferencesPage}
        options={{ headerTitle: `${i18n.t('profile.info.references')}` }}
      />
      <ProfileStack.Screen
        name='ReferenceCreate'
        component={ReferenceCreatePage}
        options={{ headerTitle: `${i18n.t('profile.references.create')}` }}
      />
      <ProfileStack.Screen
        name='ReferenceUpdate'
        component={ReferenceUpdatePage}
        options={{ headerTitle: `${i18n.t('profile.references.edit')}` }}
      />

      <ProfileStack.Screen
        name='AdminUserDeletion'
        component={AdminUserDeletionPage}
        options={{ headerTitle: `${i18n.t('admin.userDeletion.headerTitle')}` }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNav;
