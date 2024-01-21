import * as AuthSession from 'expo-auth-session';
import { TokenTypeHint, useAutoDiscovery } from 'expo-auth-session';
import { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { logout } from '@/store/features/authenticationSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import i18n from '@/utils/i18n';

/**
 * The button for logging out of the app.
 * @constructor
 */
const LogoutButton = () => {
  // Store hooks
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // OIDC settings
  const oidcDiscoveryUrl = process.env.EXPO_PUBLIC_OIDC_DISCOVERY_URL;
  const oidcClientId = process.env.EXPO_PUBLIC_OIDC_CLIENT_ID;

  // OIDC discovery
  const discovery = useAutoDiscovery(oidcDiscoveryUrl);

  const handleLogoutPress = useCallback(async () => {
    if (authState.state !== 'authenticated') {
      return;
    }

    const token = authState.token;

    try {
      // Revoke the access token
      const res = await AuthSession.revokeAsync(
        {
          clientId: oidcClientId,
          token,
          tokenTypeHint: TokenTypeHint.AccessToken,
        },
        discovery,
      );

      // Dispatch the logout action
      if (res) {
        dispatch(logout());
      }
    } catch (e) {
      console.error(e);
    }
  }, [authState, discovery, dispatch, oidcClientId]);

  return (
    <Button mode='contained' onPress={handleLogoutPress}>
      {i18n.t('login.logout')}
    </Button>
  );
};

export default LogoutButton;
