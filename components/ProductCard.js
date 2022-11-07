import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions} from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Entypo } from '@expo/vector-icons';

const ProductCard = (props) => {
		const redirect = () =>{
			props.navigation.navigate("ProductDetails",{productInfo:props.productInfo});
		}
		return( 
			<View style={styles.card}>
				<View style={styles.card2}>
					<Image source={{uri: props.productInfo.img}} style={styles.image}/>
				</View>
				<View style={styles.card3}>
					<View style={styles.card4}>
						<Text style={styles.text}>{props.productInfo.nombre}</Text>
						<Text style={styles.text}>${props.productInfo.costo}</Text>
					</View>
					<Text style={styles.text2}>{props.productInfo.presen}</Text>
					<Text style={styles.text3}>Cantidad: {props.productInfo.cantidad}</Text>
					<Text style={styles.text2}>{props.productInfo.etiquetas}</Text>
				</View>
				<View style={styles.card5}>
					<Entypo name="dots-three-vertical" size={30} color={"black"}/>
				</View>
			</View>
		)
}
export default ProductCard;

const styles= StyleSheet.create({
    card: {
        width: '80%',
        marginHorizontal:'10%',
        height:Dimensions.get('window').height * 0.18,
        borderRadius:15,
        overflow:'hidden',
        backgroundColor: '#D9D9D9',
        marginBottom:1,
		  marginTop:20,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
		  flexDirection:'row'
    },
    image: {
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    text:{
        color: 'black',
        fontSize: 23,
        textAlign:'center',
		  fontWeight:'bold',
		  paddingTop:10
    },
    text2:{
        color: 'black',
        fontSize: 20,
        textAlign:'left',
		  paddingLeft:15,
		  marginTop:7
    },
    text3:{
        color: '#F23232',
        fontSize: 20,
        textAlign:'left',
		  paddingLeft:15,
		  marginTop:7
    },
	 card2:{
		width: '30%',
		height:'100%',
	 },
	 card3:{
		width:'60%',
	 },
	 card4:{
		flexDirection:'row',
		justifyContent:'space-between',
		paddingHorizontal:10,
		width:'90%'
	 },
	 card5:{
		marginTop:15
	 },
})