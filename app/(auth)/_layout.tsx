import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/features/auth';

export default function AuthLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}

