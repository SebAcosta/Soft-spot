import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header2'
import GroupCard from '../components/GroupCard';
import {GROUPS} from "../dummy-data/data"


const Grupos=(props)=>{
	return (
		<View style={styles.container}>
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