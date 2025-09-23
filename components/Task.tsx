import React from 'react';
import {Text, View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import { TaskModel } from '../models/TaskModel';

type TaskProps = {

    taskModel?: TaskModel ;
    onPress: () => void ;
    textStyle?: StyleProp<TextStyle> ;
    containerStyle?: StyleProp<ViewStyle> ;
};

const Task: React.FC <TaskProps> = ({taskModel, onPress, textStyle, containerStyle}) =>{

    return(
        <View style = {[styles.container, containerStyle]}>
            <TouchableOpacity onPress={onPress}>
                <Text style = {[styles.taskText, textStyle]}>
                    {taskModel?.task}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7c6faff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    taskText: {
        fontSize: 16,
        color: '#000',
        maxWidth: '80%',
    },
});

export default Task ;