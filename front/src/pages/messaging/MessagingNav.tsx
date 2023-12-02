import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import i18n from '@/utils/i18n';

import MessagingListPage from './MessageChannelListPage';

/**
 * The parameter list for the MessagingNav navigator.
 */
export type MessagingStackParamList = {
  MessageChannelList: undefined;
};

const MessagingStack = createNativeStackNavigator<MessagingStackParamList>();

/**
 * The stack navigator for the messaging pages.
 * @constructor
 */
const MessagingNav = () => {
  return (
    <MessagingStack.Navigator
      initialRouteName='MessageChannelList'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <MessagingStack.Screen
        name='MessageChannelList'
        component={MessagingListPage}
        options={{ headerTitle: `${i18n.t('messaging.info.messageChannel')}` }}
      />
    </MessagingStack.Navigator>
  );
};

export default MessagingNav;
