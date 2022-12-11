import React,{useState} from "react";
import { ImageBackground ,StyleSheet, Text, View, TouchableOpacity,SafeAreaView  } from 'react-native';
import pinventario from '../src/images/pinventario2.png';
import IniciarSesion from "./IniciarSesion";
import CrearCuenta from "./CrearCuenta";
const image = { uri: "https://trex10.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-06-at-5.15.42-PM.jpeg" };

export default function Login() {

	const [modalVisible, setModalVisible] = useState(false)

	
	const crearCuenta = () =>{
		console.log('presionaste crear cuenta');
	}

	return (
		<SafeAreaView style={styles.container} >
			<ImageBackground source={pinventario} resizeMode="cover" style={styles.pinventario} >
			<View style={styles.container}>
				<Text style={styles.text}>Haz tu vida más simple</Text>
				
				<TouchableOpacity
				onPressIn={()=>{setModalVisible(true)}}
				style={styles.btnInicio}
				>
				<Text
				style={styles.btnTxt}
				>Iniciar sesión</Text>
				</TouchableOpacity>
				
				<TouchableOpacity
				onPressIn={()=>{setModalVisible(true)}}
				style={styles.btnCuenta}
				>
				<Text
				style={styles.btnTxt}
				>Crear Cuenta</Text>
				</TouchableOpacity>
				
				<CrearCuenta
				modalVisible={modalVisible}
				/>		
                </View>
    		</ImageBackground>
		</SafeAreaView >
	);
}

const styles = StyleSheet.create({
	container: {
	  backgroundColor:'#ff000040',
	  flex: 1,
	},
	pinventario: {
	  flex: 1,
	  justifyContent: "center"
	},
	text: {
	  marginTop:220,
	  paddingBottom:10,
	  fontSize: 20,
	  color:'#FFF',
	  lineHeight: 250,
	  fontWeight: "bold",
	  textAlign: "center",
	  backgroundColor: "#ffffff70" 
	},
	btnInicio: {
	  backgroundColor:'#F23232',
	  padding:10,
	  marginTop:150,
	  marginHorizontal:100,
	  borderRadius:20
	},
	btnCuenta: {
		backgroundColor:'#F23232',
		padding:10,
		marginTop:15,
		marginHorizontal:100,
		borderRadius:20
	  },
	btnTxt: {
		textAlign: "center",
		color:'#FFF',
		fontSize:20,
		fontWeight:'600',

	}
	
  });






