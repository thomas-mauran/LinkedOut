import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';

import InternalProfilePage from './profile/InternalProfilePage';

/**
 * The parameter list for the InternalProfileStack navigator.
 */
export type InternalProfileStackParamList = {
  ProfileMain: undefined;
  ProfileAppBar: undefined;
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
    </InternalProfileStack.Navigator>
  );
};

export default InternalProfileNav;
