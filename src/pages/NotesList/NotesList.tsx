import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ListItem } from '../../components/ListItem';
import { mockNotes } from '../../data/mockNotes';

export function NotesList() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {mockNotes.map((note) => (
        <ListItem
          key={note.id}
          title={note.title}
          description={note.description}
          updateDate={note.updateDate}
          onPress={() =>
            router.push({
              pathname: '/notes/[id]',
              params: { id: note.id },
            })
          }
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    gap: 10,
  },
});

