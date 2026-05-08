import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../src/features/auth';

export default function AppLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Notes' }} />
      <Stack.Screen name="notes/[id]" options={{ title: 'Edit Note' }} />
    </Stack>
  );
}

