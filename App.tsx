import React from 'react';
import HomeScreen from './screens/HomeScreen';
import EditTaskScreen from './screens/EditTaskScreen' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './screens/NavigationTypes';


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => { 
 return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Edit"
                    component={EditTaskScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App ;