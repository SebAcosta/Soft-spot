import React,{useState, useContext} from "react";
import { ImageBackground ,StyleSheet, Text, View, TouchableOpacity,SafeAreaView  } from 'react-native';
import pinventario from '../src/images/pinventario2.png';
import IniciarSesion from "./IniciarSesion";
import CrearCuenta from "./CrearCuenta";
import Svg, { Ellipse, Image } from "react-native-svg";
export default function Login() {

	const [modalVisible, setModalVisible] = useState(false)
	const [modalVisible2, setModalVisible2] = useState(false)
	
	const crearCuenta = () =>{
		console.log('presionaste crear cuenta');
	}
	function SvgTop(){
        return (
    <Svg
    width={400}
    height={200}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    
  >
    <Ellipse
      rx={116.981}
      ry={138.718}
      transform="matrix(.52727 .85023 -.93767 .34653 283.467 30.115)"
      fill="#8B1212"
    />
    <Ellipse
      rx={116.737}
      ry={111.371}
      transform="matrix(.91872 -.39492 .45071 .89267 80.445 -10.48)"
      fill="#F23232"
    />
  </Svg>
        )
    }

	return (
		<SafeAreaView style={styles.container} >
			<SvgTop/>

			
			
			<View style={styles.container}>
			<View style={styles.imagen}>
				<Image 
					source={require('../src/images/coiLogo.png')}
					style={styles.logo}
				/>
			</View>
				
				<TouchableOpacity
				onPressIn={()=>setModalVisible2(true)}
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
				<IniciarSesion
				modalVisible={modalVisible2}
				/>		
                </View>
    		
		</SafeAreaView >
	);
}

const styles = StyleSheet.create({
	container: {
		//backgroundColor:'#ff000040',
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
		backgroundColor: "#ffffff70",
		color:'#FFFFFF'   
	  },
	  btnInicio: {
		backgroundColor:'#F23232',
		padding:10,
		marginTop:400,
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
  
	  },
	  logo: {
		  alignSelf: 'center',
		  width: 150,
		  height: 150,
	  },
	  imagen: {
		  alignItems: 'center',
		  justifyContent: 'center',
	  },
	
  });






