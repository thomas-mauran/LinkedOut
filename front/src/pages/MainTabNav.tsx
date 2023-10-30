import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfilePage from '@/pages/profile/ProfileNav';

/**
 * The parameter list for the ProfileTab navigator.
 */

export type ProfileTabParamList = {
  ProfilePage: undefined;
};

const ProfileTab = createMaterialBottomTabNavigator<ProfileTabParamList>();

/**
 * The tabbed navigator for the internal pages.
 * @constructor
 */
const MainTabNav = () => {
  return (
    <ProfileTab.Navigator>
      <ProfileTab.Screen
        name='ProfilePage'
        component={ProfilePage}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={24} />
          ),
        }}
      />
    </ProfileTab.Navigator>
  );
};

export default MainTabNav;
