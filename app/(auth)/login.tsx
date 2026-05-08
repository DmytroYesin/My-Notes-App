import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { APP_SCHEME, GOOGLE_CLIENT_ID } from '../../src/config/auth';
import { useAuth } from '../../src/features/auth';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function LoginPage() {
  const { signIn } = useAuth();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: APP_SCHEME,
    path: 'oauthredirect',
    isTripleSlashed: true,
  });

  React.useLayoutEffect(() => {
    console.log(`[OAuth] Redirect URI: ${redirectUri}`);
  }, [redirectUri]);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ['openid', 'profile', 'email'],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
      usePKCE: true,
      codeChallengeMethod: AuthSession.CodeChallengeMethod.S256,
      extraParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
    discovery,
  );

  useEffect(() => {
    async function handleResponse() {
      if (response?.type !== 'success') {
        return;
      }

      const code = response.params.code;
      if (!code || !request?.codeVerifier) {
        return;
      }

      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          clientId: GOOGLE_CLIENT_ID,
          code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier,
          },
        },
        discovery,
      );

      const sessionToken = tokenResult.idToken ?? tokenResult.accessToken;
      if (!sessionToken) {
        return;
      }

      await signIn(sessionToken);
    }

    void handleResponse();
  }, [redirectUri, request?.codeVerifier, response, signIn]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Sign in</Text>
      <Text variant="bodyMedium" style={styles.description}>
        Use Google to access your notes.
      </Text>
      <Button
        mode="contained"
        disabled={!request || !GOOGLE_CLIENT_ID}
        onPress={() => {
          void promptAsync();
        }}
      >
        Continue with Google
      </Button>
      {!GOOGLE_CLIENT_ID ? (
        <Text variant="labelSmall" style={styles.warning}>
          Missing EXPO_PUBLIC_GOOGLE_CLIENT_ID in .env.local
        </Text>
      ) : null}
      <Text variant="labelSmall" style={styles.debugUri}>
        Redirect: {redirectUri}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
    padding: 16,
  },
  description: {
    opacity: 0.75,
  },
  warning: {
    opacity: 0.75,
  },
  debugUri: {
    opacity: 0.5,
    marginTop: 16,
    fontFamily: 'monospace',
  },
});

