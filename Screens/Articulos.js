import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler,Text } from "react-native";
import {PRODUCTS} from "../dummy-data/data"
import ProductCard from '../components/ProductCard';
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';


const Articulos = (props) =>{
	const theme = useContext(themeContext);
	const [articulos, setArticulos] = useState([]);

	useEffect(()=>{
		const db = SQLite.openDatabase('soft-spot.db');
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM articulo', null,
			(txObj, resultSet) => setArticulos(resultSet.rows._array),
			(txObj, error) => console.log(error)
			);
		});
	}, [articulos]);

	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				<FlatList
					// para ver como se debería ver, poner data={PRODUCTS}
					data={articulos} 
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.idArticulo}
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
