import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';


export default function Header2(props) {
	return (
		<View style={styles.container}>
			<StatusBar
				backgroundColor="#F23232" />
			<Entypo name="menu" size={35} color={"white"} />
			<FontAwesome5 name="search" size={22} color={"white"} />
			<View style={styles.bar}>
				<View style={styles.search}>
					<Text style={styles.text}>Busca por nombre o etiqueta</Text>
				</View>
			</View>
			<Entypo name="plus" size={35} color={"white"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#F23232',
		height: 41,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		paddingRight: 17
	},
	text: {
		color: '#D0D0D0',
		fontSize: 14,
		textAlignVertical:'center'
	},
	search: {
		backgroundColor:'white',
		height:27,
		width:210,
		justifyContent:'center',
		borderRadius:10,
		paddingLeft:10
	},
	bar:{
		justifyContent:'center',
		height:'100%'
	}
});
