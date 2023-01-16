import React,{useState,useContext} from 'react';
import { View, Text, StyleSheet,SafeAreaView, TextInput, TouchableNativeFeedback, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Starts from '../components/Starts';
import themeContext from '../config/themeContext';

export default function Comentarios() {
    const theme = useContext(themeContext);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.container2]}>
            <Text style={[styles.text, {color: theme.color}]}>¿Cómo funciona la aplicación?</Text>
            <Starts/>
            <Text style={[styles.text, {color: theme.color}]}>Agrega un comentario para poder mejorar.</Text>
            <TextInput style={[styles.input, {color: theme.color,borderColor: theme.linea}, ]} multiline={true} numberOfLines={4}  />
          <TouchableNativeFeedback>
            <View style={styles.guardar}>
              <Text style={styles.Tguardar}>Enviar</Text>
            </View>
          </TouchableNativeFeedback> 
          </View>
    
    
        </SafeAreaView>
      );
    }
    
const styles = StyleSheet.create({
    container: {
        height:'100%',
        alignItems:"center"
    },
    container2:{
      marginLeft:'8%', 
      marginRight:'8%', 
      marginTop:'10%'
    },
    input: {
        borderRadius:15,
        height:100,
        borderWidth:1,

        fontSize:18,
    },
    guardar:{
        backgroundColor:'#F23232',
        width:110,
        height:36,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginTop:50,
        marginLeft:'56%'
    },
    Tguardar:{
        color:'white',
        fontSize:17,
        fontWeight:'600'
    },
    text:{
      fontSize:17, 
      marginBottom:10
    }
});

