import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import Header from '../components/header'
import {CATEGORIAS} from "../dummy-data/data"
import CategoryCard from '../components/CategoryCard';
import { AntDesign,Entypo } from '@expo/vector-icons';

const Categorias = (props) =>{
	return (
		<View style={styles.container}>
			<Header productInfo={'Categorías'}/>
			<View style={styles.listContainer}>
				<FlatList
					data={CATEGORIAS}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={item => item.id.toString()}
					renderItem= {itemData => (
						<CategoryCard {...props} productInfo={itemData.item}/>
					)}
				/>
			</View>
			<View style={styles.plus}>
					<AntDesign name="pluscircle" size={60} color={"#F23232"}/>
			</View>
		</View>
  );
}

export default Categorias

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
		paddingBottom:100,
		marginLeft:'3.5%'
  	},
	plus:{
		position:'absolute',
		marginTop:Dimensions.get('window').height*0.80,
		marginLeft:Dimensions.get('window').width*0.80,
	}
});

