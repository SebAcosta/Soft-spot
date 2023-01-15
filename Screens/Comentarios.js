import React,{useState} from 'react';
import { View, Text, StyleSheet,SafeAreaView, TextInput, TouchableNativeFeedback, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Starts from '../components/Starts';


export default function Comentarios() {

    return (
        <SafeAreaView style={styles.container}>
          <View style={{marginLeft:'8%', marginRight:'8%', marginTop:'10%'}}>
            <Text style={{fontSize:18, marginBottom:10}}>¿Cómo funciona la aplicación?</Text>
            <Starts/>
            <Text style={{fontSize:18, marginBottom:10}}>Agrega un comentario para poder mejorar.</Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={4}/>
    
          <TouchableNativeFeedback>
            <View style={styles.guardar}>
              <Text style={styles.Tguardar}>ENVIAR</Text>
            </View>
          </TouchableNativeFeedback> 
          </View>
    
    
        </SafeAreaView>
      );
    }
    
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        height:'100%',
        alignItems:"center"
    },
    input: {
        borderRadius:15,
        height:100,
        borderWidth:1,
        borderColor: "#B8BDC6",
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
});

