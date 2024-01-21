import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InternalTabNav from '@/pages/InternalTabNav';
import LoginNav from '@/pages/LoginNav';
import { useAppSelector } from '@/store/hooks';

/**
 * The parameter list for the RootStack navigator.
 */
export type RootStackParamList = {
  Internal: undefined;
  Login: undefined;
  Main: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * The stack navigator at the root of the entire application.
 * @constructor
 */
const RootNavigator = () => {
  // Store hooks
  const authState = useAppSelector((state) => state.auth.state);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {authState === 'authenticated' ? (
        <RootStack.Screen name='Main' component={InternalTabNav} />
      ) : (
        <RootStack.Screen name='Login' component={LoginNav} />
      )}

      <RootStack.Screen name='Internal' component={InternalTabNav} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
