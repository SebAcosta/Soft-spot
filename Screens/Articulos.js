import React, {useContext} from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header'
import {PRODUCTS} from "../dummy-data/data"
import ProductCard from '../components/ProductCard';
import { AntDesign,Entypo } from '@expo/vector-icons';
import themeContext from '../config/themeContext';


const Articulos = (props) =>{
	const theme = useContext(themeContext);
	return (
		<View style={[{backgroundColor: theme.background}]}>
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
		</View>
  );
}

export default Articulos;

const styles = StyleSheet.create({
	text:{
		fontSize:20
	},
	listContainer:{
		height:'100%',
		width:'100%',
  	},
});
