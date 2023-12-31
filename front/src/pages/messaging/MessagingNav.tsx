import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import i18n from '@/utils/i18n';

import MessageChannelPage, {
  MessageChannelPageParams,
} from './MessageChannelPage';
import MessageTabBarNav from './MessageTabBarNav';

/**
 * The parameter list for the MessagingNav navigator.
 */
export type MessagingStackParamList = {
  MessageChannelList: undefined;
  MessageChannel: MessageChannelPageParams;
  MessageTabBar: undefined;
};

const MessagingStack = createNativeStackNavigator<MessagingStackParamList>();

/**
 * The stack navigator for the messaging pages.
 * @constructor
 */
const MessagingNav = () => {
  return (
    <MessagingStack.Navigator
      initialRouteName='MessageTabBar'
      screenOptions={{
        header: (props) => <PaperNavigationBar {...props} />,
        headerShown: false,
      }}
    >
      <MessagingStack.Screen
        name='MessageChannel'
        component={MessageChannelPage}
        options={{
          headerTitle: `${i18n.t('messaging.info.messageChannel')}`,
          headerShown: true, // Show header for this screen
        }}
      />
      <MessagingStack.Screen
        name='MessageTabBar'
        component={MessageTabBarNav}
      />
    </MessagingStack.Navigator>
  );
};

export default MessagingNav;
