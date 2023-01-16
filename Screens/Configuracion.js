import React,{useState, useContext} from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {EventRegister} from "react-native-event-listeners";
import themeContext from '../config/themeContext';

export default function Configuracion() {
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);
    return (
        <View style={[styles.container, {backgroundColor: theme.background}]}>
            <View style={[styles.container2, {borderColor: theme.linea}]}>

                <MaterialCommunityIcons name="theme-light-dark" size={24}
                style={[styles.icono, {color: theme.color}]}/>
                <Text style={[styles.text, {color: theme.color}]}>Modo Oscuro</Text>

                <Switch 
                trackColor={{true: '#F23232', false: 'grey'}}
                thumbColor={mode ? 'white' : 'white'}
                style={{marginLeft:"37%"}}
                value={mode} 
                onValueChange={(value) => {
                    setMode(value);
                    EventRegister.emit("ChangeTheme", value);
                    }}
                    />

            </View>
        </View>
        
    );
}

    
const styles = StyleSheet.create({
    container: {
        height:'100%',
        alignItems:"center"
    }, 
    container2: {
        flexDirection:"row",
        borderBottomWidth:1, 
        alignItems:"center", 
        height:80
    },
    icono:{
        marginLeft:"8%"
    },
    text:{
        fontSize:17,
        marginLeft:"3%"
    }
});