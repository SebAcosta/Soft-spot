import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Entypo } from '@expo/vector-icons';

const ProductCard = (props) => {
    return(
        <View style={styles.modal}>
			<Text>I am the modal content!</Text>
		</View>
    )
}

export default ProductCard;

const styles= StyleSheet.create({
    modal:{
		height:Dimensions.get('window').height*0.2,
		width:Dimensions.get('window').width,
		backgroundColor:'red',
		borderRadius:10
	}
})