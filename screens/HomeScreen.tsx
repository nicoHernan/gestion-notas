import React from 'react';
import {Text, View, Alert, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import Task from '../components/Task';
import { TaskModel } from '../models/TaskModel';
import ButtonNavigate from '../components/ButtonNavigate';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> ;
};


const tasks: TaskModel[] = [
    { id: '1', content: 'Comprar martillo', isCompleted: false },
    { id: '2', content: 'estudiar programación', isCompleted: false }
];

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
const handleGoToEditTask = (taskModel: TaskModel) => {
        navigation.navigate('Edit', {taskModel} );
    };

    return (
        <View style = {styles.container}>
            <Text> 
                ¡Welcome to Pendientes - App !
            </Text>
            <Image
                source={{ uri: 'https://picsum.photos/id/20/295/200' }}
                style= {styles.image}
            />
            <ButtonNavigate
                buttonTitle="Next"
                onPress={() => Alert.alert('¡here we go!')}
            />
             {tasks.map( (taskModel) => (
                <Task
                    key={taskModel.id}
                    taskModel={taskModel}
                    onPress={() => handleGoToEditTask(taskModel)}
                />
                ))}
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
    image: {
        width: 295,
        height: 200,
        borderRadius: 10,
    },
});

export default HomeScreen ;