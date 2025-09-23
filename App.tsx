import React from 'react';
import {StyleSheet, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import EditTaskScreen from './screens/EditTaskScreen' ;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './screens/NavigationTypes';


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => { 
 return (
    <View style = {styles.container}>
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
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c6fad9ff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default App ;