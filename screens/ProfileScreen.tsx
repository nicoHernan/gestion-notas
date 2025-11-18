import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './NavigationTypes';
import Icon from 'react-native-vector-icons/Ionicons'; 


type ProfileScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'> ;
};

const ProfileScreen : React.FC<ProfileScreenProps> = ({navigation}) => {

    const handleGuestLogin = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={styles.container}>
            
            <View style={styles.logoContainer}>
                <Icon 
                    name="checkbox-outline" 
                    size={70} 
                    color="#f8f7f7ff" 
                    style={styles.logoCheck} 
                />
                <Icon 
                    name="list" 
                    size={70} 
                    color="#F9C74F" 
                    style={styles.logoList} 
                />
            </View>

            <Text style={styles.appTitle}>Pendientes App</Text>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                />
                
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>INICIAR SESIÓN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
                
                <View style={styles.separator} />


                <TouchableOpacity 
                    style={styles.guestButton}
                    onPress={handleGuestLogin}
                >
                    
                    <Icon 
                        name="eye-off-outline" 
                        size={20} 
                        color="#f8f7f7ff" 
                        style={styles.iconMargin} 
                    />
                    <Text style={styles.buttonText}>Continuar como invitado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton}>

                    <Icon 
                        name="logo-google" 
                        size={20} 
                        color="#000" 
                        style={styles.iconMargin} 
                    /> 
                    <Text style={styles.googleButtonText}>Continuar con Google</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.signUpLink}>
                    <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#03bb85', 
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        marginVertical: 40,
        position: 'relative',
        height: 70, 
        width: 100,
    },
    logoCheck: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    logoList: {
        position: 'absolute',
        top: 10,
        left: 30,
        transform: [{ rotate: '20deg' }], 
        opacity: 0.8,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f8f7f7ff',
        marginBottom: 30,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', 
        borderRadius: 15,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: '#f8f7f7ff',
        fontSize: 16,
    },
    primaryButton: {
        backgroundColor: '#f8f7f7ff', 
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    primaryButtonText: {
        color: '#03bb85', 
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkButton: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    linkText: {
        color: '#a4fff7', 
        fontSize: 14,
    },
    separator: {
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1,
        marginVertical: 15,
        width: '100%',
    },
    guestButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', 
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f7f7ff', 
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#f8f7f7ff',
        fontSize: 16,
        fontWeight: '500',
    },
    googleButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    iconMargin: {
        marginRight: 10,
    },
    signUpLink: {
        alignSelf: 'center',
        marginTop: 20,
    }
});

export default ProfileScreen;