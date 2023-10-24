import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import ExperiencesPage from '@/pages/internal/profile/experiences/ExperiencesPage';
import ExperiencesUpdatePage from '@/pages/internal/profile/experiences/ExperiencesUpdatePage';
import ReferencesPage from '@/pages/internal/profile/references/ReferencesPage';
import { Experience } from '@/store/slice/types';
import i18n from '@/utils/i18n';

import InternalProfilePage from './profile/InternalProfilePage';

/**
 * The parameter list for the InternalProfileStack navigator.
 */

export type InternalProfileStackParamList = {
  ProfileMain: undefined;
  Experiences: undefined;
  ExperiencesUpdate: Experience;
  References: undefined;
};

const InternalProfileStack =
  createNativeStackNavigator<InternalProfileStackParamList>();

/**
 * The stack navigator for the internal Profileellaneous pages.
 * @constructor
 */
const InternalProfileNav = () => {
  return (
    <InternalProfileStack.Navigator
      initialRouteName='ProfileMain'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <InternalProfileStack.Screen
        name='ProfileMain'
        component={InternalProfilePage}
        options={{ headerTitle: 'Profil' }}
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
    </InternalProfileStack.Navigator>
  );
};

export default InternalProfileNav;
