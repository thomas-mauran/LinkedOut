import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LoginButton from '@/components/login/LoginButton';
import i18n from '@/utils/i18n';

/**
 * The styles for the ProfilePage component.
 */
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
    justifyContent: 'center',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
  },
});

/**
 * Displays the page for logging in to the app.
 * @constructor
 */
const LoginPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
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
      <Text variant={'displayLarge'}>{i18n.t('app.branding')}</Text>

      <View style={styles.buttonContainer}>
        <LoginButton />
      </View>
    </View>
  );
};

export default LoginPage;
