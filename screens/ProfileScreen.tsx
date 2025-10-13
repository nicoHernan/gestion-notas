import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';


type ProfileScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'> ;
};

const ProfileScreen : React.FC<ProfileScreenProps> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.text}>¡Bienvenido a la sección de perfil!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#178a00ff', 
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#f8f7f7ff',
    },
    text: {
        fontSize: 16,
        color: '#f8f7f7ff',
        textAlign: 'center',
    }
});

export default ProfileScreen;