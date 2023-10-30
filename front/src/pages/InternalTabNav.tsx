import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InternalMiscNav from '@/pages/internal/InternalMiscNav';
import InternalPagesPage from '@/pages/internal/InternalPagesPage';
import ProfilePage from '@/pages/profile/ProfileNav';

/**
 * The parameter list for the InternalTab navigator.
 */

export type InternalTabParamList = {
  InternalPages: undefined;
  InternalMisc: undefined;
  InternalProfile: undefined;
};

const InternalTab = createMaterialBottomTabNavigator<InternalTabParamList>();

/**
 * The tabbed navigator for the internal pages.
 * @constructor
 */
const InternalTabNav = () => {
  return (
    <InternalTab.Navigator>
      <InternalTab.Screen
        name='InternalPages'
        component={InternalPagesPage}
        options={{
          tabBarLabel: 'Pages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='layers' color={color} size={24} />
          ),
        }}
      />
      <InternalTab.Screen
        name='InternalMisc'
        component={InternalMiscNav}
        options={{
          tabBarLabel: 'Miscellaneous',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='test-tube' color={color} size={24} />
          ),
        }}
      />
      <InternalTab.Screen
        name='InternalProfile'
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={24} />
          ),
        }}
      />
    </InternalTab.Navigator>
  );
};

export default InternalTabNav;
