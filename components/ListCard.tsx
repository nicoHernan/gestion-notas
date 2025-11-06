import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { ListModel } from '../models/ListModel';
import Icon from 'react-native-vector-icons/Ionicons'; 

type ListCardProps = {
  listModel: ListModel ;
  onPress: (listId: string) => void ;
  isEditing: boolean;
  newTitle: string;
  onChangeText: (text: string) => void;
  onEditPress: () => void;
  onSavePress: () => void;
  onCancelPress: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ 
  listModel, 
  onPress,
  isEditing,
  newTitle,
  onChangeText,
  onEditPress,
  onSavePress,
  onCancelPress
}) => {

  const handleCardPress = isEditing ? undefined : () => onPress(listModel.id);

  return (
    <View style={styles.cardContainer}>
      
      {isEditing ? (
        <View style={styles.editControls}>
          <TextInput
            style={styles.editInput}
            value={newTitle}
            onChangeText={onChangeText}
            onSubmitEditing={onSavePress} 
          />
          <TouchableOpacity 
            onPress={onSavePress} 
            style={styles.saveButton}>
              <Icon 
                name="checkmark-circle-outline" 
                size={24} 
                color="#4CAF50" 
              />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onCancelPress} 
            style={styles.cancelButton}>
            <Icon 
              name="close-circle-outline" 
              size={24} color="#FF0000" 
            />
          </TouchableOpacity>
        </View>
        
      ) : (


        <TouchableOpacity 
          style={styles.card} 
          onPress={handleCardPress}
        >
          <View style={styles.contentRow}>
            <Text 
              style={styles.title}>{listModel.content}
            </Text>
          
            <TouchableOpacity 
              onPress={onEditPress} 
              style={styles.editButton}
            >
              <Icon 
              name="ellipsis-vertical" 
              size={20} 
              color="#666" 
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
  cardContainer: {
    marginVertical: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1, 
  },
  editControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  editInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
  },
  saveButton: { paddingHorizontal: 5 },
  cancelButton: { paddingHorizontal: 5, marginLeft: 5 },
  editButton: { padding: 5 },
});

export default ListCard;