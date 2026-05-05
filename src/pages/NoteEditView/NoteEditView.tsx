import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

type NoteEditViewProps = {
  initialTitle?: string;
  initialDescription?: string;
};

export function NoteEditView({
  initialTitle = '',
  initialDescription = '',
}: NoteEditViewProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={6}
        style={styles.descriptionInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  descriptionInput: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
});

