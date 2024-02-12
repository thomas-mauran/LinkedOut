import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import JobOffersNav from '@/pages/jobOffer/JobOfferNav';
import MessagingNav from '@/pages/messaging/MessagingNav';
import ProfileNav from '@/pages/profile/ProfileNav';
import i18n from '@/utils/i18n';

import JobOffersApplicationNav from './jobOffer/JobOfferApplicationNav';

/**
 * The parameter list for the MainTab navigator.
 */

export type MainTabParamList = {
  Home: undefined;
  Applications: undefined;
  Messages: undefined;
  ProfileNav: undefined;
};

const MainTab = createMaterialBottomTabNavigator<MainTabParamList>();

/**
 * The tabbed navigator for the main pages.
 * @constructor
 */
const MainTabNav = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name='Home'
        component={JobOffersNav}
        options={{
          tabBarLabel: i18n.t('home.home'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='home-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <MainTab.Screen
        name='Applications'
        component={JobOffersApplicationNav}
        options={{
          tabBarLabel: i18n.t('applications.applications'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='inbox-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <MainTab.Screen
        name='Messages'
        component={MessagingNav}
        options={{
          tabBarLabel: i18n.t('messaging.messages'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='message-text-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <MainTab.Screen
        name='ProfileNav'
        component={ProfileNav}
        options={{
          tabBarLabel: i18n.t('profile.profile'),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-circle-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNav;
