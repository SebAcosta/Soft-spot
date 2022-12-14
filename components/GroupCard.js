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
            <View style={{backgroundColor:color, height:100, width:'97%',alignItems:'center',
            borderRadius:13,}}>
                <Text style={{color:color}}>{color}=color</Text>
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
        height:100
       
	},
	text:{
        marginTop:14,
		fontSize:20
	},
    more:{
        marginLeft:'82%',
        marginTop:-55,
    },
    text2:{
        fontSize: 15
    }
});