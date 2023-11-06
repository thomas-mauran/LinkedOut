import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InternalTabNav from '@/pages/InternalTabNav';
import MainTabNav from '@/pages/MainTabNav';

/**
 * The parameter list for the RootStack navigator.
 */
export type RootStackParamList = {
  Internal: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * The stack navigator at the root of the entire application.
 * @constructor
 */
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName='Internal'
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen name='Internal' component={InternalTabNav} />
      <RootStack.Screen name='Main' component={MainTabNav} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
