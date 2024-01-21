import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { Button } from 'react-native-paper';

import { login } from '@/store/features/authenticationSlice';
import { useAppDispatch } from '@/store/hooks';
import i18n from '@/utils/i18n';

WebBrowser.maybeCompleteAuthSession();

/**
 * The button for logging in to the app.
 * @constructor
 */
const LoginButton = () => {
  // Store hooks
  const dispatch = useAppDispatch();

  // OIDC settings
  const oidcDiscoveryUrl = process.env.EXPO_PUBLIC_OIDC_DISCOVERY_URL;
  const oidcClientId = process.env.EXPO_PUBLIC_OIDC_CLIENT_ID;

  // OIDC discovery
  const discovery = useAutoDiscovery(oidcDiscoveryUrl);

  // OIDC auth request
  const [request, , promptAsync] = useAuthRequest(
    {
      clientId: oidcClientId,
      redirectUri: makeRedirectUri({
        scheme: 'linkedout',
      }),
      responseType: ResponseType.Code,
      scopes: ['openid', 'profile', 'email'],
      usePKCE: true,
    },
    discovery,
  );

  const handleLoginPress = useCallback(async () => {
    // Open the web view to the IdP login page
    const authResult = await promptAsync();

    if (authResult.type !== 'success') {
      console.error('Auth failed');
      return;
    }

    try {
      // Exchange the auth code for an access token
      const tokenResponse = await AuthSession.exchangeCodeAsync(
        {
          clientId: request.clientId,
          code: authResult.params.code,
          extraParams: { code_verifier: request.codeVerifier || '' },
          redirectUri: request.redirectUri,
        },
        discovery,
      );

      // Dispatch the access token to the store
      dispatch(login(tokenResponse.accessToken));
    } catch (e) {
      console.error(e);
    }
  }, [discovery, dispatch, promptAsync, request]);

  return (
    <Button mode='contained' onPress={handleLoginPress}>
      {i18n.t('login.login')}
    </Button>
  );
};

export default LoginButton;
