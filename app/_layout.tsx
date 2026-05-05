import React from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }}>
        <Stack.Screen name="index" options={{ title: 'Notes' }} />
        <Stack.Screen name="notes/[id]" options={{ title: 'Edit Note' }} />
      </Stack>
    </PaperProvider>
  );
}

