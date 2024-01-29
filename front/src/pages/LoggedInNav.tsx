import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MainTabNav from '@/pages/MainTabNav';
import FirstLoginPage from '@/pages/login/FirstLoginPage';
import { useGetProfileQuery } from '@/store/api/profileApiSlice';

/**
 * The parameter list for the LoggedInNav navigator.
 */

export type LoggedInStackParamList = {
  FirstLogin: undefined;
  Main: undefined;
};

const LoggedInStack = createNativeStackNavigator<LoggedInStackParamList>();

/**
 * The stack navigator for the logged in guard.
 * @constructor
 */
const LoggedInNav = () => {
  // Safe area
  const insets = useSafeAreaInsets();

  // API calls
  const { isError, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return null;
  }

  return (
    <LoggedInStack.Navigator screenOptions={{ headerShown: false }}>
      {isError ? (
        <LoggedInStack.Screen
          name='FirstLogin'
          component={FirstLoginPage}
          options={{
            contentStyle: {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          }}
        />
      ) : (
        <LoggedInStack.Screen name='Main' component={MainTabNav} />
      )}
    </LoggedInStack.Navigator>
  );
};

export default LoggedInNav;
