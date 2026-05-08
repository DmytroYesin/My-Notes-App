import React from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../src/features/auth';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ title: 'Notes' }} />
          <Stack.Screen name="notes/[id]" options={{ title: 'Edit Note' }} />
        </Stack>
      </AuthProvider>
    </PaperProvider>
  );
}

