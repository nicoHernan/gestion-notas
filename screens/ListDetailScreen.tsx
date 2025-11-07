import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Share, TouchableOpacity,FlatList, Alert  } from 'react-native';
import { useRoute,RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import { TaskModel } from '../models/TaskModel';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/Ionicons';


type ListDetailScreenRouteProp  = RouteProp<RootStackParamList, 'ListDetail'>;

type ListDetailScreenProps  = {
    route: ListDetailScreenRouteProp;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ListDetail'> ;
};

const initialTasks: TaskModel[] = [];



const ListDetailScreen: React.FC<ListDetailScreenProps> = ({ route, navigation }) => {
    const{listId} = route.params ;

    const [taskModel, setTask] = useState<TaskModel[]>([]) ;
    const [newTaskContent, setNewTaskContent] = useState('');
  
    const handleAddTask = () => {
        if (newTaskContent == '') {
            return;
        }
    
        const newId = (taskModel.length + 1).toString(); 
    
        const newTask: TaskModel = {
            id: newId, 
            content: newTaskContent, 
            isCompleted: false,
        };

        setTask([newTask, ...taskModel]);
        setNewTaskContent('');
    };



    const handleShareList = async () => {
    
        const listTitle = `Lista de Pendientes: ${listId}`; 
    
        const listBody = taskModel.map((taskModel, index) => 
            `${index + 1}. [${taskModel.isCompleted ? '✓' : ' '}] ${taskModel.content}`
            ).join('\n');
    
        const messageContent = `${listTitle}\n\n${listBody}`;

        try {
            await Share.share({
                message: messageContent,
                title: listTitle,
                }, 
            {
                dialogTitle: 'Compartir mis Pendientes',
                subject: listTitle,
            });
        }catch (error) {
            Alert.alert("Error al Compartir", "No se pudo compartir la lista. Intenta de nuevo.");
        }
    } ;



    const handleTaskUpdate = (updatedTask: TaskModel) =>{
            const updatedTasks = taskModel.map(taskModel => {
                if (taskModel.id == updatedTask.id) {
                    return updatedTask; 
                }
                return taskModel; 
            });
            setTask(updatedTasks);
    }

    const handleToggleComplete = (taskId: string) => {
        const updatedTasks = taskModel.map(taskModel => {
            if (taskModel.id == taskId) {
                return { ...taskModel, isCompleted: !taskModel.isCompleted };
            }
            return taskModel;
        });

        setTask(updatedTasks);
    };

    const handleGoToEditTask = (taskToEdit: TaskModel) => {
        navigation.navigate(
            'Edit', 
            { 
                taskModel: taskToEdit,
                onSave: handleTaskUpdate
            }
        );
    };

    const renderTaskItem = ({ item }: { item: TaskModel }) => (
        <Task
            key={item.id}
            taskModel={item}
            onPress={() => handleGoToEditTask(item)}
            onToggleComplete={() => handleToggleComplete(item.id)} 
        />
    );


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tareas de Lista: {listId}</Text>
            <FlatList
                data={taskModel}
                keyExtractor={(item) => item.id}
                renderItem={renderTaskItem}
                style={styles.taskList}
            />
            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Añadir una nueva tarea..."
                    value={newTaskContent}
                    onChangeText={setNewTaskContent} 
                />
                <TouchableOpacity 
                    onPress={handleAddTask} style={styles.addButton}
                >
                    <Icon 
                        name="add-circle" 
                        size={36} 
                        color="#6e92fcff" 
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleShareList}
                >
                    <Icon 
                        name="share-outline" 
                        size={22} 
                        color="#007AFF"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a4fff7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
     taskList: {
        paddingHorizontal: 15,
        flex: 1,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        padding: 5,
    }
});

export default ListDetailScreen;