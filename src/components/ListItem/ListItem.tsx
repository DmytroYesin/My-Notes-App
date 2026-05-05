import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

export type ListItemProps = {
  title: string;
  description: string;
  updateDate: string;
  onPress?: () => void;
};

export function ListItem({ title, description, updateDate, onPress }: ListItemProps) {
  return (
    <List.Item
      title={title}
      description={description}
      {...(onPress ? { onPress } : {})}
      right={() => (
        <View style={styles.rightContainer}>
          <Text variant="labelSmall" style={styles.dateText}>
            {updateDate}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  rightContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 8,
    marginLeft: 8,
  },
  dateText: {
    opacity: 0.6,
  },
});

