import React, {useContext} from 'react';
import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import {TAGS} from "../dummy-data/data"
import TagCard from '../components/TagCard';
import themeContext from '../config/themeContext';

const Etiqueta = (props) =>{
	const theme = useContext(themeContext);
	return (
		<View style={[{backgroundColor: theme.background}]}>
			<View style={styles.listContainer}>
				<FlatList
					data={TAGS}
					numColumns={1}
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








