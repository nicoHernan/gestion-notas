import React from 'react';
import {Text, View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

type ButtonNavigateProps = {

    buttonTitle?: string ;
    onPress: () => void ;
    containerStyle?: StyleProp<ViewStyle> ;
    textStyle?: StyleProp<TextStyle> ;
};

const ButtonNavigate: React.FC <ButtonNavigateProps> = ({buttonTitle, onPress, containerStyle, textStyle}) =>{

    return(
        <View style = {[styles.container, containerStyle]}>
            <TouchableOpacity onPress={onPress}>
                <Text style = {[styles.buttonNavigateText, textStyle]}>
                    {buttonTitle}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f73fb7ff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonNavigateText: {
        fontSize: 16,
        color: '#000000ff'
    },
});

export default ButtonNavigate ;