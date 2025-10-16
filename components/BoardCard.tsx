import React from 'react';
import { Text, View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import ListCard from './ListCard';
import { ListModel } from '../models/ListModel';


type BoardCardProps = {
    boardTitle: string;
    listModel?: ListModel[];
    onAddListPress: () => void;
    onListPress: (listId: string) => void; 
    textStyle?: StyleProp<TextStyle> ;
    containerStyle?: StyleProp<ViewStyle> ; 
}

const BoardCard: React.FC<BoardCardProps> = ({boardTitle, listModel, onAddListPress, onListPress, textStyle, containerStyle}) => {
  
    return (
        <View style={styles.boardContainer}>
            <View style={styles.header}>
                <Text style={styles.boardTitle}>{boardTitle}</Text>
                <TouchableOpacity 
                    onPress={onAddListPress} 
                    style={styles.addButton}>
                <Icon 
                    name="add-circle" 
                    size={30} 
                    color="#4CAF50" 
                />
                </TouchableOpacity>
            </View>
            <View style={styles.listsContainer}>
                {listModel?.map((listModel) => (
                    <ListCard 
                        key={listModel.id}
                        listModel={listModel}
                        onPress={() => onListPress(listModel.id)}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  boardContainer: {
    backgroundColor: '#e0e0e0', 
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5,
  },
  listsContainer: {
    paddingVertical: 5,
  },
});

export default BoardCard;