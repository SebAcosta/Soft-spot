import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header2'
import GroupCard from '../components/GroupCard';
import {GROUPS} from "../dummy-data/data"
import themeContext from '../config/themeContext';
import React,{useState,useContext, useEffect} from 'react';
import * as SQLite from 'expo-sqlite';


const Grupos=(props)=>{
    const theme = useContext(themeContext);
	const [grupos, setGrupos]=useState([]);

	useEffect(()=>{
		const db = SQLite.openDatabase('soft-spot.db');
		db.transaction(tx=>{
			tx.executeSql('SELECT * FROM grupo', null,
			(txObj, resultSet) => setGrupos(resultSet.rows._array),
			(txObj,error) => console.log(error)
			);
		});
	}, [grupos]);

	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				<FlatList
					data={grupos}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.idGrupo}
					renderItem= {itemData => (
						<GroupCard {...props} productInfo={itemData.item}/>
					)}
				/>
			</View>
		</View>
	);
}

export default Grupos;

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