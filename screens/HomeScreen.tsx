import React from 'react';
import {Text, View, Button, Alert, Image, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import Task from '../components/Task';
import { TaskModel } from '../models/TaskModel';

type HomeScreenProps = {
    fullname?: string ;
    containerStyle?: StyleProp<ViewStyle> ;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> ;
};


const tasks: TaskModel[] = [
    { taskId: '1', task: 'Comprar martillo', isCompleted: false },
    { taskId: '2', task: 'estudiar programación', isCompleted: false }
];

const HomeScreen: React.FC<HomeScreenProps> = ({fullname = '', containerStyle, navigation}) => {
const handleGoToEditTask = (taskId: string) => {
        navigation.navigate('Edit', {taskId });
    };

    return (
        <View style = {containerStyle}>
            <Text> 
                ¡Welcome to Pendientes - App, {fullname} !
            </Text>
            <Image
                source={{ uri: 'https://picsum.photos/id/20/295/200' }}
                style= {styles.image}
            />
            <Button
                title="Next" J
                onPress={() => Alert.alert('¡here we go!')}
            />
             {tasks.map( (taskModel) => (
                <Task
                    key={taskModel.taskId}
                    taskModel={taskModel}
                    onPress={() => handleGoToEditTask(taskModel.taskId)}
                />
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 295,
        height: 200,
        borderRadius: 10,
    },
});

export default HomeScreen ;