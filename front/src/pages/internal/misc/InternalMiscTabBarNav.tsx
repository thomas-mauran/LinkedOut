import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import InternalMiscTabBarFirstPage from '@/pages/internal/misc/tabbar/InternalMiscTabBarFirstPage';
import InternalMiscTabBarSecondPage from '@/pages/internal/misc/tabbar/InternalMiscTabBarSecondPage';

/**
 * The parameter list for the InternalMiscTabBarNav navigator.
 */
export type InternalMiscTabBarNavParamList = {
  InternalFirstTabBar: undefined;
  InternalSecondTabBar: undefined;
};

const InternalMiscTabBar =
  createMaterialTopTabNavigator<InternalMiscTabBarNavParamList>();

/**
 * The top tabbed navigator for testing it.
 * @constructor
 */
const InternalMiscTabBarNav = () => {
  return (
    <InternalMiscTabBar.Navigator>
      <InternalMiscTabBar.Screen
        name='InternalFirstTabBar'
        component={InternalMiscTabBarFirstPage}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='message-text-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <InternalMiscTabBar.Screen
        name='InternalSecondTabBar'
        component={InternalMiscTabBarSecondPage}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='bell-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
    </InternalMiscTabBar.Navigator>
  );
};

export default InternalMiscTabBarNav;
