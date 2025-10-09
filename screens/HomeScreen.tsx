import React from 'react';
import {Text, View, StyleSheet, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import Task from '../components/Task';
import { TaskModel } from '../models/TaskModel';
import { useState } from 'react';

type HomeScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> ;
};


const initialTasks: TaskModel[] = [
    { id: '1', content: 'Comprar martillo', isCompleted: false },
    { id: '2', content: 'estudiar programación', isCompleted: false },
    { id: '3', content: 'estudiar ingles', isCompleted: false },
    { id: '4', content: 'cocinar', isCompleted: false },
    { id: '5', content: 'correr', isCompleted: false },
    { id: '6', content: 'lavar la ropa', isCompleted: false },
    { id: '7', content: 'pescar', isCompleted: false },
    { id: '8', content: 'futbol', isCompleted: false },
    { id: '9', content: 'dormir', isCompleted: false },
    { id: '10', content: 'ver tv', isCompleted: false },
    { id: '11', content: 'examen', isCompleted: false },
    { id: '12', content: 'andar en bici', isCompleted: false }
];

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {

    const [taskModel, setTasks] = useState(initialTasks);

    const handleToggleComplete = (taskId: string) => {
        const updatedTasks = taskModel.map(taskModel => {
            if (taskModel.id == taskId) {
                return { ...taskModel, isCompleted: !taskModel.isCompleted };
            }
            return taskModel;
        });

        setTasks(updatedTasks);
    };

    //TODO -> const handleShareTask = () => {};

    const handleGoToEditTask = (taskModel: TaskModel) => {
        navigation.navigate('Edit', {taskModel} );
    };


    const renderTaskItem = ({ item }: { item: TaskModel }) => (
        <Task
            key={item.id}
            taskModel={item}
            onPress={() => handleGoToEditTask(item)}
            onToggleComplete={() => handleToggleComplete(item.id)}
            onShare={() => {}} 
        />
    );

    return (
        <View style = {styles.container}>
            <Text style = {styles.welcomeText}> 
                ¡Welcome to Pendientes - App !
            </Text>
             <FlatList
                data={taskModel}
                keyExtractor={(item) => item.id}
                renderItem={renderTaskItem}
                style={styles.taskList}
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
    },
    taskList: {
        width: '100%', 
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20
    }
});

export default HomeScreen ;