import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Entypo,FontAwesome5,AntDesign } from '@expo/vector-icons';

export default function header2(props) {
  return (
		<View style={styles.container}>
			<StatusBar 
				backgroundColor="#F23232" />
			<Entypo name="menu" size={40} color={"white"}/>
			<Text style={styles.text}>{props.productInfo}</Text>
			<FontAwesome5 name="search" size={30} color={"white"}/>
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
		flexDirection:'row',
		backgroundColor:'#F23232',
		height:Dimensions.get('window').height/17,
		alignItems:'center',
		justifyContent:'space-between',
		paddingHorizontal:15,
		paddingRight:17
  },
  text:{
		color:'white',
		fontSize:20,
  },
});
