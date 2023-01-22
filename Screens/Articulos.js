import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler,Text } from "react-native";
import Header from '../components/header'
import {PRODUCTS} from "../dummy-data/data"
import ProductCard from '../components/ProductCard';
import { AntDesign,Entypo } from '@expo/vector-icons';
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';
import { getDbConnection } from '../src/utils/db';
import { useFocusEffect } from '@react-navigation/native';


const Articulos = (props) =>{
	const theme = useContext(themeContext);
	// const db = SQLite.openDatabase('soft-spot.db');
	//const db = getDbConnection();

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

	const showArticulos = ()=>{
		return articulos.map((articulo, index) => {
			return(
				<View key={index}>
					<Text>{articulo.nombreArticulo}</Text>
					<Text>{articulo.descArt}</Text>
					<Text>{articulo.cantidad}</Text>
					<Text>{articulo.cantidadCrit}</Text>
					<Text>{articulo.precio}</Text>
				</View>
			)
		})
	}
	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				<FlatList
					// para ver como se debería ver, poner data={PRODUCTS}
					data={PRODUCTS} 
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.idArticulo}
					renderItem= {itemData => (
						<ProductCard {...props} productInfo={itemData.item}/>
					)}
				/>

			</View>
			{/* {showArticulos()} */}
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
