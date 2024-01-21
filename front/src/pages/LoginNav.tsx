import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '@/pages/login/LoginPage';

/**
 * The parameter list for the LoginStack navigator.
 */

export type LoginStackParamList = {
  LoginPage: undefined;
};

const LoginStack = createNativeStackNavigator<LoginStackParamList>();

/**
 * The stack navigator for the login pages.
 * @constructor
 */
const LoginNav = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name='LoginPage' component={LoginPage} />
    </LoginStack.Navigator>
  );
};

export default LoginNav;
