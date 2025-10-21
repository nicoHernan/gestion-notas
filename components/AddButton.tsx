import React from 'react';
import {View, StyleProp, TextStyle, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type AddButtonProps = {

    onPress: () => void ;
    containerStyle?: StyleProp<ViewStyle> ;
};

const AddButton: React.FC <AddButtonProps> = ({onPress, containerStyle}) =>{

    return(
        <View style = {[containerStyle]}>
            <TouchableOpacity 
                onPress={onPress}
            >
                <Icon 
                    name="add-circle" 
                    size={60} 
                    color="#3764f9ff" 
                />
            </TouchableOpacity>
        </View>
    );
}


export default AddButton ;