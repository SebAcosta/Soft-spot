import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header'
import {PRODUCTS} from "../dummy-data/data"
import ProductCard from '../components/ProductCard';
import { AntDesign,Entypo } from '@expo/vector-icons';


const Articulos = (props) =>{
	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<FlatList
					data={PRODUCTS}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					renderItem= {itemData => (
						<ProductCard {...props} productInfo={itemData.item}/>
					)}
				/>
			</View>
			<View style={styles.plus}>
					<AntDesign name="pluscircle" size={60} color={"#F23232"}/>
			</View>
		</View>
  );
}

export default Articulos;

const styles = StyleSheet.create({
	container: {
		backgroundColor:'white',
	},
	text:{
		fontSize:20
	},
	listContainer:{
		height:'100%',
		width:'100%',
		paddingBottom:100
  	},
	plus:{
		position:'absolute',
		marginTop:Dimensions.get('window').height*0.80,
		marginLeft:Dimensions.get('window').width*0.80,
	}
});
