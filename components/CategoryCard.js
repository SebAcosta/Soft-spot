import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import Modal from "react-native-modal";
import { Entypo } from '@expo/vector-icons';

const ProductCard = (props) => {
    return(
        <View style={{width: '40%',
        marginHorizontal:'3%',
        height:Dimensions.get('window').height * 0.15,
        borderRadius:10,
        overflow:'hidden',
        marginBottom:1,
		marginTop:20,
        flexDirection:'row',
        backgroundColor: props.productInfo.color}}>
            <View style={styles.nombre}>
                <Text style={styles.text}>{props.productInfo.nombre}</Text> 
            </View>
            <View style={styles.puntos}>
			    <Entypo name="dots-three-vertical" size={25} color={"black"}/>
            </View>
        </View>
    )
}

export default ProductCard;

const styles= StyleSheet.create({
    category:{
        width: '40%',
        marginHorizontal:'3%',
        height:Dimensions.get('window').height * 0.15,
        borderRadius:10,
        overflow:'hidden',
        marginBottom:1,
		marginTop:20,
        flexDirection:'row',
    },
    nombre:{
        width:'70%',
        marginLeft:'15%',
        alignItems:'center',
        justifyContent:'center'
    },
    puntos:{
        paddingTop:10
    },
    text:{
        fontSize:20
    }
})