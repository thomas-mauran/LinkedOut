import {
  ResponseType,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    gap: 8,
    justifyContent: 'flex-start',
  },
});

WebBrowser.maybeCompleteAuthSession();

/**
 * Component for testing logging in with OpenID Connect and Keycloak.
 * @constructor
 */
const InternalOIDCTest = () => {
  // Settings from .env
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const oidcClientId = process.env.EXPO_PUBLIC_OIDC_CLIENT_ID;

  // OIDC state
  const [oidcText, setOidcText] = useState('<oidcText>');
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  // OIDC discovery
  const discovery = useAutoDiscovery(
    process.env.EXPO_PUBLIC_OIDC_DISCOVERY_URL,
  );

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

  // Button press handlers
  const handleFetchAuthedPress = useCallback(() => {
    // Fetch from a page that requires authentication
    fetch(`${apiUrl}/api/v1/authed`, {
      headers: {
        Authorization:
          accessToken !== undefined ? `Bearer ${accessToken}` : undefined,
      },
    })
      .then((response) => {
        setOidcText(`[${response.status}] - `);
        return response.text();
      })
      .then((text) => setOidcText((prev) => prev + text))
      .catch((error) => console.error(error));
  }, [accessToken, apiUrl]);

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

      setAccessToken(tokenResponse.accessToken);
    } catch (e) {
      console.error(e);
    }
  }, [discovery, promptAsync, request]);

  return (
    <View style={styles.container}>
      <Text>{oidcText}</Text>
      <Button mode='contained-tonal' onPress={handleFetchAuthedPress}>
        Fetch /api/v1/authed
      </Button>
      <Button
        mode='contained-tonal'
        onPress={handleLoginPress}
        disabled={!request}
      >
        Log in
      </Button>
    </View>
  );
};

export default InternalOIDCTest;
