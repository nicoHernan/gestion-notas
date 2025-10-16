import React from 'react';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import ProfileScreen from './screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './screens/NavigationTypes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ListDetailScreen from './screens/ListDetailScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>() ;


const TaskStack = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }} 
        />
        <Stack.Screen
            name="ListDetail"
            component={ListDetailScreen}
            options={{ title: 'Detalle de Lista' }}
        />
        <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{ title: 'Editar Tarea' }}
        />
    </Stack.Navigator>
);

const App: React.FC = () => { 
 return (
    <NavigationContainer>
        <Tab.Navigator
        initialRouteName = "Home"
        screenOptions = {({ route }) => ({
            headerShown: false,
        tabBarIcon: ({ color, size }) => {
                            let iconName: string; 
                            
                            switch (route.name) { 
                                case 'Home': 
                                    iconName = 'list-circle-outline';
                                    break; 
                                case 'Profile': 
                                    iconName = 'person-outline';
                                    break; 
                                default: 
                                    iconName = 'help-circle-outline'; 
                                    break; 
                            }
                            return <Icon name={iconName} size={size} color={color} />; 
                        },
                        tabBarActiveTintColor: '#2563eb', 
                        tabBarInactiveTintColor: '#6b7280', 
                        tabBarLabelStyle: { fontSize: 12 }, 
                        tabBarStyle: { height: 58, paddingBottom: 0, paddingTop: 6 }, 
                    })}>
                    <Tab.Screen 
                        name="Home" 
                        component={TaskStack}
                        options={{
                            title: 'Tareas',
                        }}
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen} 
                        options={{
                            title: 'Perfil',
                        }}
                    />
                </Tab.Navigator> 
            </NavigationContainer>
    ) ;
} ;

export default App ;