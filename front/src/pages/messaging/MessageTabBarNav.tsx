import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NotificationListPage from '../notifications/NotificationlListPage';
import MessageChannelListPage from './MessageChannelListPage';

/**
 * The styles for the MessageTabBarNav component.
 */
const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});

/**
 * The parameter list for the MessageTabBarNav navigator.
 */
export type MessageTabBarNavParamList = {
  MessagesTabBar: undefined;
  NotificationsTabBar: undefined;
};

const MessagingTabBar =
  createMaterialTopTabNavigator<MessageTabBarNavParamList>();

/**
 * The top tabbed navigator for testing it.
 * @constructor
 */
const MessageTabBarNav = () => {
  const insets = useSafeAreaInsets();

  return (
    <MessagingTabBar.Navigator
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        styles.container,
      ]}
    >
      <MessagingTabBar.Screen
        name='MessagesTabBar'
        component={MessageChannelListPage}
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
      <MessagingTabBar.Screen
        name='NotificationsTabBar'
        component={NotificationListPage}
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
    </MessagingTabBar.Navigator>
  );
};

export default MessageTabBarNav;
