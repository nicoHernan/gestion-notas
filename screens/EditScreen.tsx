import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes'; 
import { TaskModel } from '../models/TaskModel'; 


type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;

type EditScreenProps = {
    route: EditScreenRouteProp;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Edit'> ;
};


const EditScreen: React.FC<EditScreenProps> = ({ route, navigation }) => {
    
    const { taskModel: initialTask, onSave } = route.params ; 
    
    const [editedTask, setEditedTask] = useState<TaskModel>(initialTask) ; 

    const handleSave = () => {
        onSave(editedTask) ; 
        navigation.goBack() ;
    };

    const handleChangeContent = (newContent: string) =>{
        setEditedTask({...editedTask, content : newContent})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Tarea</Text>

            <TextInput
                style={styles.input}
                value={editedTask.content}
                onChangeText={handleChangeContent}
                placeholder="Contenido de la tarea"
            />

            <Button
                title="Guardar Cambios"
                onPress={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        marginBottom: 30,
        fontSize: 16,
    }
});

export default EditScreen;