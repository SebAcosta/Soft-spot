import React from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header'
import {TAGS} from "../dummy-data/data"
import TagCard from '../components/TagCard';
import { AntDesign,Entypo } from '@expo/vector-icons';


const Etiqueta = (props) =>{
	return (
		<View style={styles.container}>
			<View style={styles.listContainer}>
				<FlatList
					data={TAGS}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					renderItem= {itemData => (
						<TagCard {...props} productInfo={itemData.item}/>
					)}
				/>
			</View>
		</View>
  );
}

export default Etiqueta;

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
		marginLeft:10,
		marginTop:20
  	},
});








