import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback,FlatList,TouchableNativeFeedback } from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Feather } from '@expo/vector-icons'; 


const TagCard = (props) => {
    const nombre = props.productInfo.nombre
    const color = props.productInfo.color
    const desc = props.productInfo.descripcion
	return (
        <View style={styles.container}>
            <Text style={{color:color,fontSize:0}}>{color}=color</Text>
            <View style={styles.cont}>
                <View style={{backgroundColor:color, height:65, width:65, borderRadius:50, 
                position:"absolute", marginTop:12}}></View>
                <Text style={styles.text}>{nombre}</Text>
                <Text style={styles.text2}>{desc}</Text>
            </View>
        </View>
  );
}
export default TagCard;

const styles = StyleSheet.create({
    container: {
        marginBottom:10,
        marginLeft:10,
        height:100,
       
	},
    cont: {
        height:100, 
        width:'92%',
        borderBottomWidth:1, 
        borderBottomColor:'#DDDDDD',
    },
	text:{
        marginTop:5,
        marginLeft:80,
		fontSize:18,
		fontWeight:'700',

	},
    text2:{
        fontSize: 15,
        marginLeft:80,
    }
});