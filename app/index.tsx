import React from 'react';
import { Redirect } from 'expo-router';
import { NotesList } from '../src/pages/NotesList';
import { useAuth } from '../src/features/auth';

export default function NotesListRoute() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <NotesList />;
}

