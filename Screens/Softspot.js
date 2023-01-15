import React,{useState} from 'react';
import { View, Text, StyleSheet,SafeAreaView, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Starts from '../components/Starts';


export default function Softspot() {

    return (
        <SafeAreaView style={styles.container}>
          <View style={{marginLeft:'8%', marginRight:'8%', marginTop:'10%', alignItems:"center"}}>
            <Image source={require('../assets/softspot-logo.png')} style={styles.img}/>
            <Text style={{fontSize:18, marginBottom:10, textAlign:"justify"}}>Soft Spot es una empresa desarrolladora 
            de software que ayuda a que tu vida sea mas simple al sistematizar una 
            solucion para tu problema.</Text>
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
    img:{
        height:170,
        marginBottom:30
    }
});
