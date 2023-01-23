import React from "react";
import {View,Text } from "react-native";

const DefaultView = () => {
    return(
        <View style={{width:'100%',height:'100%', alignItems:'center', justifyContent:'center'}}>
			<Text>No hay ningún elemento creado</Text>
			<Text>Para agregar elementos, presiona el botón "+"</Text>
		</View>
    )
}

export default DefaultView;