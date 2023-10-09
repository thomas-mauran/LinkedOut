import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/PaperNavigationBar';
import InternalMiscAppBarPage from '@/pages/internal/misc/InternalMiscAppBarPage';
import InternalMiscPage from '@/pages/internal/misc/InternalMiscPage';
import InternalMiscTabBarNav from '@/pages/internal/misc/InternalMiscTabBarNav';

/**
 * The parameter list for the InternalMiscStack navigator.
 */
export type InternalMiscStackParamList = {
  MiscMain: undefined;
  MiscAppBar: undefined;
  MiscTabBar: undefined;
};

const InternalMiscStack =
  createNativeStackNavigator<InternalMiscStackParamList>();

/**
 * The stack navigator for the internal miscellaneous pages.
 * @constructor
 */
const InternalMiscNav = () => {
  return (
    <InternalMiscStack.Navigator
      initialRouteName='MiscMain'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <InternalMiscStack.Screen
        name='MiscMain'
        component={InternalMiscPage}
        options={{ headerTitle: 'Miscellaneous' }}
      />
      <InternalMiscStack.Screen
        name='MiscAppBar'
        component={InternalMiscAppBarPage}
        options={{ headerTitle: 'Miscellaneous > RNPaper AppBar' }}
      />
      <InternalMiscStack.Screen
        name='MiscTabBar'
        component={InternalMiscTabBarNav}
        options={{ headerTitle: 'Miscellaneous > TabBar' }}
      />
    </InternalMiscStack.Navigator>
  );
};

export default InternalMiscNav;
