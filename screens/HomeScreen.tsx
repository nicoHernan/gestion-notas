import React from 'react';
import {Text, View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import { useState } from 'react';
import BoardCard from '../components/BoardCard';
import { ListModel } from '../models/ListModel';


const generateUniqueId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> ;
};

const initialLists: ListModel[] = [
    { 
    id: 'list-1', 
    content: 'Tareas Pendientes', 
    tasks: [
        { id: '1', content: 'Comprar martillo', isCompleted: false },
        { id: '2', content: 'estudiar programación', isCompleted: false }
    ]
    },
];


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [list, setList] = useState<ListModel[]>(initialLists) ;
    const boardTitle = "Bienvenido/a Pendientes App";

    const handleAddList = () => {
        const newList: ListModel = {
            id: generateUniqueId(), 
            content: `Nueva Lista ${list.length + 1}`,
            tasks: [],
        };
        setList([...list, newList]);
    }

    const handleListPress = (listId: string) => {
        navigation.navigate('ListDetail', { listId });
    };

    return (
        <View style = {styles.container}>
            <Text style = {styles.welcomeText}> 
                {boardTitle}
            </Text>

            <BoardCard
            boardTitle= "titulo_board_Card"
            listModel={list}
            onAddListPress={handleAddList}
            onListPress={handleListPress}
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
        marginTop: 70,
        marginBottom: 70,
    }
});

export default HomeScreen ;