import React,{useState} from 'react';
import { View, Text, StyleSheet, Button, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Configuracion() {
    const [mode, setMode] = useState(false);
    return (
        <View style={{flexDirection:"row",borderBottomColor:"#B8BDC6", 
        borderBottomWidth:1, alignItems:"center", height:80}}>

            <MaterialCommunityIcons name="theme-light-dark" size={24} color="black" 
            style={{marginLeft:"8%"}}/>
            <Text style={{fontSize:18,marginLeft:"3%"}}>Modo Oscuro</Text>

            <Switch 
            trackColor={{true: '#F23232', false: 'grey'}}
            thumbColor={mode ? 'white' : 'white'}
            style={{marginLeft:"37%"}}
            value={mode} onValueChange={() => setMode((value) => !value)}/>

        </View>
        
    );
}