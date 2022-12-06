import { Dimensions, StyleSheet, Text, View, StatusBar,TouchableNativeFeedback } from 'react-native';
import React, { useState } from 'react';
import Modal from "react-native-modal";
import { NavigationContainer, CommonActions,useNavigation } from '@react-navigation/native';
import TouchableCmp from './UI/TouchableCmp';
import { Entypo, Ionicons, FontAwesome5, EvilIcons } from '@expo/vector-icons';


const Header2 = (props) => {
	const navigation = useNavigation();
	const [isModalVisible, setModalVisible] = useState(false);
	return (
		<View>
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
				<Entypo name="plus" size={35} color={isModalVisible?"#F23232":"white"} onPress={()=>setModalVisible(true)}/>
			</View>
			<Modal isVisible={isModalVisible} animationType={'none'} onRequestClose={() => setModalVisible(false)}>
				<View style={{alignItems:'flex-end',height:Dimensions.get('window').height,justifyContent:'flex-start',marginTop:5}}>
					<Ionicons name="close" size={35} color={"white"} onPress={()=>setModalVisible(false)}/>
					<View style={{marginTop:30}}>
						<TouchableNativeFeedback onPress={()=>{setModalVisible(false),navigation.navigate('AgregarArticulo')}}>
							<View style={styles.boton}>
								<Text style={styles.mText}>Agregar ARTÍCULO</Text>
								<Ionicons name="cube-outline" size={26} color={"white"}/>
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={()=>{setModalVisible(false),navigation.navigate('AgregarGrupo')}}>
							<View style={styles.boton}>
								<Text style={styles.mText}>Agregar GRUPO</Text>
								<FontAwesome5 name="cubes" size={26} color={"white"} />
							</View>
						</TouchableNativeFeedback>
						<TouchableNativeFeedback onPress={()=>{setModalVisible(false),navigation.navigate('AgregarEtiqueta')}}>
							<View style={styles.boton}>
								<Text style={styles.mText}>Agregar ETIQUETA</Text>
								<EvilIcons name="tag" size={33} color={"white"} />
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default Header2

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
	},
	boton:{
		backgroundColor:'#F23232',
		width:200,
		flexDirection:'row',
		justifyContent:'space-between',
		marginBottom:20,
		padding:10,
		borderRadius:15,
		alignItems:'center',
		overflow:'hidden'
	},
	mText:{
		color:'white',
		fontSize:15
	}
});
