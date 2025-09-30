import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useRoute,RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import { TaskModel } from '../models/TaskModel';


type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;

type EditTaskScreenProps = {
    route: EditTaskScreenRouteProp;
    navigation: NativeStackNavigationProp<RootStackParamList, 'Edit'> ;
};



const EditTaskScreen: React.FC<EditTaskScreenProps> = ({ route, navigation }) => {
  const handleSave = () => {
    console.log(taskModel)
        //navigation.goBack();
        //TODO -> implementar guardar edicion
    };

    const handleChangeContent = (newContent: string) =>{
        setTask({...taskModel, content : newContent})
    }

    const [taskModel, setTask] = useState<TaskModel>(route.params.taskModel ) ;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Tarea</Text>

            <TextInput
                value={taskModel.content}
                onChangeText={handleChangeContent}
            />

            <Button
                title="Save Changes"
                onPress={handleSave}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default EditTaskScreen;