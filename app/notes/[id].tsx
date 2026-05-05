import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { NoteEditView } from '../../src/pages/NoteEditView';
import { mockNotes } from '../../src/data/mockNotes';

export default function NoteEditRoute() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedNote = mockNotes.find((note) => note.id === id);

  return (
    <NoteEditView
      initialTitle={selectedNote?.title ?? ''}
      initialDescription={selectedNote?.description ?? ''}
    />
  );
}


