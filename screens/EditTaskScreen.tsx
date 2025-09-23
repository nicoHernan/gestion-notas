import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Edición de Tarea</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditTaskScreen;