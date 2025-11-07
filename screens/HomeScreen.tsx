import React from 'react';
import {Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import { useState, useEffect  } from 'react';
import BoardCard from '../components/BoardCard';
import { ListModel } from '../models/ListModel';
import AddButton from '../components/AddButton';
import { BoardModel } from '../models/BoardModel';
import AsyncStorage from '@react-native-async-storage/async-storage';





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

    const [editingListId, setEditingListId] = useState<string | null>(null);
    const [newListTitle, setNewListTitle] = useState('');

    const [editingBoardId, setEditingBoardId] = useState<string | null>(null) ;
    const [newBoardTitle, setNewBoardTitle] = useState('') ;

    const [board, setBoard] = useState<BoardModel[]>(initialBoards) ;
    const boardTitle = "Bienvenido/a Pendientes App";



    const STORAGE_KEY = '@BoardData';

    useEffect(() => {
        const saveBoards = async () => {
            try {
                const jsonValue = JSON.stringify(board);
                await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
                console.log('Datos guardados en AsyncStorage.');
            } catch (e) {
                console.error('Error al guardar datos:', e);
            }
        };
        saveBoards();
    },
    [board]
    );



    useEffect(() => {
        const loadBoards = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
                if (jsonValue != null) {
                    setBoard(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error('Error al cargar datos:', e);
            }
        };

        loadBoards();
    }, 
    []
    ); 



    const handleEditListStart = (listToEdit: ListModel) => {
        setEditingListId(listToEdit.id) ;
        setNewListTitle(listToEdit.content) ;
    }

    const handleCancelEditList = () => {
        setEditingListId(null);
        setNewListTitle('');
    };

    const handleSaveListTitle = (listId: string, boardId: string) => {
        if (newListTitle == '') {
            alert('El título de la lista no puede estar vacío.');
            return;
        }

        const updatedBoards = board.map(boardModel => {
            if (boardModel.id == boardId) {

                const updatedLists = boardModel.lists.map(listModel => {
                    if (listModel.id == listId) {
                        return { ...listModel, content: newListTitle };
                    }
                    return listModel ;
                });
                return{
                    ...boardModel,
                    lists: updatedLists
                };
            }
            return boardModel;
        });

        setBoard(updatedBoards);
        setEditingListId(null); 
    };





    const handleEditBoardStart = (boardToEdit: BoardModel) => {
        setEditingBoardId(boardToEdit.id);
        setNewBoardTitle(boardToEdit.title);
    }

    const handleCancelEditBoard = () => {
        setEditingBoardId(null);
        setNewBoardTitle('');
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


    const renderBoardItem = ({ item }: { item: BoardModel}) => (
        <BoardCard
            key={item.id}
            boardId= {item.id}
            boardTitle= {item.title}
            
            listModel={item.lists}
            onAddListPress={() => handleAddList(item.id)}
            onListPress = {handleListPress}

            isEditingBoardId={editingBoardId == item.id}
            newBoardTitle={newBoardTitle}
            onChangeBoardTitle={setNewBoardTitle}
            
            onEditBoardPress={() => handleEditBoardStart(item)}
            onSaveBoardPress = {handleSaveBoardTitle}
            onCancelBoardPress={handleCancelEditBoard}
            
            isEditingListId={editingListId} 
            newListTitle={newListTitle}   
            onChangeListTitle={setNewListTitle}

            onEditListPress={handleEditListStart}
            onSaveListPress={handleSaveListTitle}
            onCancelListPress={handleCancelEditList}
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