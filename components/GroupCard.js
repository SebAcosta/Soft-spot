import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback,FlatList,TouchableNativeFeedback } from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Feather } from '@expo/vector-icons'; 


const GroupCard = (props) => {
    const nombre = props.productInfo.nombreGrupo
    let color = props.productInfo.colorGrupo
    if(props.productInfo.colorGrupo != ''){
        color = props.productInfo.colorGrupo
    }else{
        color = '#F23232';
    }
	return (
        <View style={styles.container}>
            <View style={{backgroundColor:color, height:100, width:170,alignItems:'center',
            borderRadius:13,}}>
                <Text style={styles.text}>{nombre}</Text>
            </View>
        </View>
  );
}
export default GroupCard;

const styles = StyleSheet.create({
    container: {
        marginBottom:10,
        marginLeft:10,
        height:100
	},
	text:{
        marginTop:35,
		fontSize:18,
        fontWeight:'500',
	}
});