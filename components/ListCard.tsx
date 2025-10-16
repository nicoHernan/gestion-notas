import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ListModel } from '../models/ListModel';

type ListCardProps = {
  listModel: ListModel ;
  onPress: (listId: string) => void ;
}

const ListCard: React.FC<ListCardProps> = ({ listModel, onPress }) => {
  return (
    <TouchableOpacity 
        style={styles.card} 
        onPress={
          () => onPress(listModel.id)
        }>
        <Text style={styles.title}>{listModel.content}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ListCard;