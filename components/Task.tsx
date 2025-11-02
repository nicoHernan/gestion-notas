import React from 'react';
import {Text, View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import { TaskModel } from '../models/TaskModel';
import Icon from 'react-native-vector-icons/Ionicons';

type TaskProps = {
    taskModel?: TaskModel ;
    onPress: () => void ;
    textStyle?: StyleProp<TextStyle> ;
    containerStyle?: StyleProp<ViewStyle> ;
    onToggleComplete: () => void;
};

const Task: React.FC <TaskProps> = ({
    taskModel, 
    onPress, 
    textStyle,
    containerStyle, 
    onToggleComplete     
}) => {
    
    const checkboxIcon = taskModel?.isCompleted ? 'checkbox-outline' : 'square-outline'; 

    const taskContentStyle  = taskModel?.isCompleted ? styles.taskTextCompleted : styles.taskText;

    return(
        <View style={[styles.container, containerStyle]}>
            
            <TouchableOpacity 
                onPress={onToggleComplete}
                style={styles.iconButton}
            >
                <Icon 
                    name={checkboxIcon} 
                    size={24} 
                    color={taskModel?.isCompleted ? '#4CAF50' : '#888'} 
                />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={onPress}
                style={styles.textContainer}
            >
                <Text style = {[taskContentStyle, textStyle]}>
                    {taskModel?.content} 
                </Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingRight: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
        
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 1, 
        },
        shadowOpacity: 0.1, 
        shadowRadius: 2.22,
        elevation: 7, 
    },
    iconButton: {
        paddingHorizontal: 8, 
        paddingVertical: 10,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 8,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    taskText: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    taskTextCompleted: {
        fontSize: 16,
        color: '#888',
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
});

export default Task ;