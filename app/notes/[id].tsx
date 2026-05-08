import React from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { NoteEditView } from '../../src/pages/NoteEditView';
import { mockNotes } from '../../src/data/mockNotes';
import { useAuth } from '../../src/features/auth';

export default function NoteEditRoute() {
  const { isLoading, session } = useAuth();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedNote = mockNotes.find((note) => note.id === id);

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <NoteEditView
      initialTitle={selectedNote?.title ?? ''}
      initialDescription={selectedNote?.description ?? ''}
    />
  );
}


