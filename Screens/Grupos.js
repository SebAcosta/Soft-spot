import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header2'
import GroupCard from '../components/GroupCard';
import {GROUPS} from "../dummy-data/data"
import themeContext from '../config/themeContext';
import React,{useState,useContext} from 'react';


const Grupos=(props)=>{
    const theme = useContext(themeContext);
	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				<FlatList
					data={GROUPS}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
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