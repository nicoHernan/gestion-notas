import React from 'react';
import { Text, TextInput, View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import ListCard from './ListCard';
import { ListModel } from '../models/ListModel';
import { BoardModel } from '../models/BoardModel';


type BoardCardProps = {
    boardId: string ;
    boardTitle: string;
    listModel?: ListModel[];
    onAddListPress: () => void;
    onListPress: (listId: string) => void; 
    textStyle?: StyleProp<TextStyle> ;
    containerStyle?: StyleProp<ViewStyle> ;
    isEditing: boolean;
    newBoardTitle: string;
    onChangeBoardTitle: (text: string) => void;
    onEditBoardPress: (board: BoardModel) => void ;
    onSaveBoardPress: (boardId: string) => void ;
    onCancelPress: () => void;
}

const BoardCard: React.FC<BoardCardProps> = ({
  boardId,
  boardTitle,
  listModel,
  onAddListPress,
  onListPress,
  textStyle,
  containerStyle,
  isEditing,
  newBoardTitle,
  onChangeBoardTitle,
  onEditBoardPress,
  onSaveBoardPress,
  onCancelPress
  }) => {
    
    const currentBoard: BoardModel = {
        id: boardId,
        title: boardTitle,
        lists: listModel || []
    };
  
    return (
        <View style={styles.boardContainer}>
          <View style={styles.header}>

            {isEditing ? (
              <View style={styles.editControls}>
                <TextInput
                  style={styles.editInput}
                  value={newBoardTitle}
                  onChangeText={onChangeBoardTitle}
                  onSubmitEditing={() => onSaveBoardPress(boardId)} 
                />
                <TouchableOpacity 
                  style={styles.saveButton}
                  onPress={() => onSaveBoardPress(boardId)}
                >
                  <Icon 
                    name="checkmark-circle-outline" 
                    size={30} 
                    color="#4CAF50" 
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton} 
                  onPress={onCancelPress}
                >
                  <Icon 
                    name="close-circle-outline" 
                    size={30} 
                    color="#FF0000" 
                  />
                </TouchableOpacity>
              </View>
              ) : (

              <View style={styles.headerViewMode}>
              
                <Text style={styles.boardTitle}>{boardTitle}</Text>
                <View style={styles.headerActions}>

                  <TouchableOpacity 
                    onPress={onAddListPress} 
                    style={styles.addButton}
                  >
                    <Icon 
                      name="add-circle" 
                      size={30} 
                      color="#4CAF50" 
                    />
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => onEditBoardPress(currentBoard)}
                    style={styles.editButton}
                  >
                    <Icon name="ellipsis-vertical" size={24} color="#333" />
                  </TouchableOpacity>
                </View>
              </View>
              )
            }
          </View>

            <View style={styles.listsContainer}>
              {listModel?.map((listModel) => (
                <ListCard 
                  key={listModel.id}
                  listModel={listModel}
                  onPress={() => onListPress(listModel.id)}
                />
                ))
              }
          </View>
        </View>
    );
  };

const styles = StyleSheet.create({
  headerViewMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', 
},
  editButton: {
        padding: 5,
        marginLeft: 10
    },
  boardContainer: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '90%',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 5
  },
  listsContainer: {
    paddingVertical: 5
  },
  editControls: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 5
    },
    editInput: {
        flex: 1, 
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 8,
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 18, 
        borderWidth: 1,
        borderColor: '#ccc',
    },
    saveButton: {
        padding: 5,
        marginRight: 5
    },
    cancelButton: {
        padding: 5,
        marginLeft: 5,
    },
    headerActions: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
});

export default BoardCard; 