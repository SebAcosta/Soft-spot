import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import {TAGS} from "../dummy-data/data"
import TagCard from '../components/TagCard';
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';
import DefaultView from '../components/DefaultView';

const Etiqueta = (props) =>{
	const theme = useContext(themeContext);
	const [etiquetas, setEtiquetas] = useState([]);

	useEffect(()=>{
		const db = SQLite.openDatabase('soft-spot.db');
		db.transaction(tx=>{
			tx.executeSql('SELECT * FROM etiqueta', null,
			(txObj,resultSet) => setEtiquetas(resultSet.rows._array),
			(txObj,error) => console.log(error)
			);
		});
	}, [etiquetas]);


	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				{etiquetas!=''?
					<FlatList
					data={etiquetas}
					numColumns={1}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.idEtiqueta}
					renderItem= {itemData => (
						<TagCard {...props} productInfo={itemData.item}/>
					)}
				/>:
				<DefaultView/>
				}
			</View>
		</View>
  );
}

export default Etiqueta;

const styles = StyleSheet.create({
	text:{
		fontSize:20
	},
	listContainer:{
		height:'100%',
		width:'100%',
		marginLeft:10,
		marginTop:20
  	},
});








