import React from 'react';
import {Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import { useState } from 'react';
import BoardCard from '../components/BoardCard';
import { ListModel } from '../models/ListModel';
import AddButton from '../components/AddButton';
import { BoardModel } from '../models/BoardModel';



type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> ;
};

const initialBoards: BoardModel[] = [
    { 
        id: 'boardId_1', 
        title: 'Tablero de Prueba', 
        lists: [
            {
            id: 'listId_1',
            content: 'Lista de Prueba',
            task: []
            }
        ]
    },
];


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [editingBoardId, setEditingBoardId] = useState<string | null>(null) ;
    const [newBoardTitle, setNewBoardTitle] = useState('') ;

    const [board, setBoard] = useState<BoardModel[]>(initialBoards) ;
    const boardTitle = "Bienvenido/a Pendientes App";


    const handleEditBoardStart = (boardToEdit: BoardModel) => {
        setEditingBoardId(boardToEdit.id);
        setNewBoardTitle(boardToEdit.title);
    }

    const handleCancelEditBoard = () => {
        setEditingBoardId(null);
    };


    const handleSaveBoardTitle = (boardId: string) => {
        if (newBoardTitle == '') {
            alert('El título no puede estar vacío.');
            return;
        }

        const updatedBoards = board.map(boardModel => {
            if (boardModel.id == boardId) {
                return { ...boardModel, title: newBoardTitle }; 
            }
            return boardModel;
        });

        setBoard(updatedBoards);
        setEditingBoardId(null); 
    };



    const handleAddBoard = () => {
        const newBoardId = `board_nro_${board.length + 1}`;    

        const newBoard: BoardModel = {
            id: newBoardId, 
            title: `Nuevo Tablero : ${newBoardId}`,
            lists: [{
                id: `listId : ${newBoardId}`,
                content: 'Lista Inicial',
                tasks: []
            }],
        };
        setBoard([...board, newBoard]);
    }


    const handleAddList = (boardId: string) => {  

        const updatedBoards = board.map(boardModel => {
            const newListId = `list_nro_${boardModel.lists.length + 1}`;
            
            const newList: ListModel = {
                id: newListId,
                content : `Nueva Lista : ${newListId}`,
                tasks: [] 
            }


            if (boardModel.id == boardId) {
                return {
                    ...boardModel,
                    lists: [...boardModel.lists, newList],
                };
            }
            return boardModel; 
        });

        setBoard(updatedBoards);
    }

    const handleListPress = (listId: string) => {
        navigation.navigate('ListDetail', { listId });
    };


    const renderBoardItem = ({ item }: { item: BoardModel }) => (
        <BoardCard
            key={item.id}
            boardId= {item.id}
            boardTitle= {item.title}
            listModel={item.lists}
            isEditing={editingBoardId == item.id}
            newBoardTitle={newBoardTitle}
            onChangeBoardTitle={setNewBoardTitle}
            onAddListPress={() => handleAddList(item.id)}
            onListPress = {handleListPress}
            onEditBoardPress={() => handleEditBoardStart(item)}
            onSaveBoardPress = {handleSaveBoardTitle}
            onCancelPress={handleCancelEditBoard}
        />
    );


    return (
        <View style = {styles.container}>
            <Text style = {styles.welcomeText}> 
                {boardTitle}
            </Text>

            <FlatList
                style={styles.boardList}
                contentContainerStyle={styles.boardListContent}
                data = {board}
                keyExtractor={(item) => item.id}
                renderItem={renderBoardItem}
            />
            <View style={styles.addButtonContainer}>
                <AddButton
                    onPress = {handleAddBoard}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c6fad9ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 21,
        marginTop: 30,
        marginBottom: 20
    },
    boardList: {
        width: '100%', 
        flex: 1, 
        paddingHorizontal: 10,
    },
    boardListContent: {
        paddingBottom: 80, 
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 30, 
        right: 20,
        zIndex: 10, 
    }
});

export default HomeScreen ;