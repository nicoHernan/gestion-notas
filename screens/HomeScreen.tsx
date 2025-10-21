import React from 'react';
import {Text, View, StyleSheet, FlatList } from 'react-native';
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

    const [board, setBoard] = useState<BoardModel[]>(initialBoards) ;
 
    const boardTitle = "Bienvenido/a Pendientes App";


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
            boardTitle= {item.title}
            listModel={item.lists}
            onAddListPress={() => handleAddList(item.id)}
            onListPress = {handleListPress}
        />
    );


    return (
        <View style = {styles.container}>
            <Text style = {styles.welcomeText}> 
                {boardTitle}
            </Text>
            <AddButton
                onPress = {handleAddBoard}
            />

            <FlatList
                data = {board}
                keyExtractor={(item) => item.id}
                renderItem={renderBoardItem}
            />


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
    }
});

export default HomeScreen ;