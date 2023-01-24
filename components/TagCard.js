import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback,FlatList,TouchableNativeFeedback, TouchableOpacity } from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Feather } from '@expo/vector-icons'; 
import themeContext from '../config/themeContext';


const TagCard = (props) => {
    const theme = useContext(themeContext);
    const nombre = props.productInfo.nombreEtiqueta
    let color = props.productInfo.colorEtiqueta
    if(props.productInfo.colorEtiqueta != ''){
        color = props.productInfo.colorEtiqueta
    }else{
        color = '#F23232';
    }
    const desc = props.productInfo.descEtiqueta
	return (
        <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate("MostrarEtiquetas",{productInfo:props.productInfo})}>
            <View style={[styles.cont,{borderColor: theme.linea}]}>
                <View style={{backgroundColor:color, height:65, width:65, borderRadius:50, 
                position:"absolute", marginTop:12}}></View>
                <Text style={[styles.text, {color: theme.color}]}>{nombre}</Text>
                <Text style={[styles.text2, {color: theme.color}]}>{desc}</Text>
            </View>
        </TouchableOpacity>
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
        opacity:0.5
    }
});