import React,{useState, useContext} from 'react';
import { View, Text, StyleSheet,SafeAreaView, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Starts from '../components/Starts';
import themeContext from '../config/themeContext';


export default function Softspot() {
    const theme = useContext(themeContext);
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <View style={[styles.container2, ]}>
            <View style={[styles.containerImg, {backgroundColor:theme.img}]}>
            <Image source={require('../assets/softspot-logo.png')} style={styles.img}/>
            </View>
            <Text style={[styles.text, {color: theme.color}]}>Soft Spot es una empresa desarrolladora 
            de software que ayuda a que tu vida sea mas simple al sistematizar una 
            solucion para tu problema.</Text>
          </View>
        </SafeAreaView>
      );
    }
    
const styles = StyleSheet.create({
    container: {
        height:'100%',
        alignItems:"center"
    },
    container2: {
      marginLeft:'8%', 
      marginRight:'8%', 
      marginTop:'10%', 
      alignItems:"center"
    },
    containerImg:{
      width: 310,
      height: 170,
      alignItems:"center",
      justifyContent:"center",
      marginBottom:12,
      borderRadius:20
    },
    img:{
        height:170,
        marginBottom:10,
    },
    text:{
      fontSize:17, 
      marginBottom:10, 
      textAlign:"justify"
    }
});
