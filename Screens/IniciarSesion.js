import axios from 'axios';
import React,{useState,useContext} from 'react'
import {Modal, Text, SafeAreaView,StyleSheet,TouchableOpacity,View,TextInput, Alert} from 'react-native'
import {EvilIcons} from '@expo/vector-icons';
import Svg, { Ellipse } from "react-native-svg";
import { login } from '../Service/Api';
import { LoginContext } from '../Context/LoginContext';
import themeContext from '../config/themeContext';

const oInitState = {
	email:'',
	password:'',
	isValidUser:true,
	isValidPassword:true
};

const IniciarSesion = (props) => {
  const theme = useContext(themeContext);
  const [data, setData] = useState(oInitState);
	const { iniciarSesion } = useContext(LoginContext);
	const  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleEmailChange = email =>{
      setData({
        ...data,
        email,
        isValidUser:email.trim().length >= 0 && !!email.trim().match(mailformat)
        });
  }
	const handlePasswordChange = password =>{
		setData({
			...data,
			password,
			isValidPassword:password.trim().length > 0
		  })
	}

	const handleLogin = async ()=>{
		const { isValidUser, isValidPassword } = data;

		if (isValidUser && isValidPassword) {
			const { email, password } = data;

			if (email !== '' && password !== '') {
				const response = await login(email, password)
					.catch(error => {
						console.log(error.response);
					});

				if (response?.data?.ok) {
					iniciarSesion(response.data.message); //aquí debería ser .message
				}else{
          Alert.alert(
            'Datos incorrectos',
            'Revise los campos e intente de nuevo',
            [
              {text:'Okay'}
            ]
          )
        }
			} else {
				Alert.alert(
				  'Datos Incorrectos', 
				  'Los campos no pueden estar vacios',
				  [
					{text:'Okay'},
				  ]
				);
			}
		} else {
			Alert.alert(
			  'Datos Incorrectos', 
			  'Revise los campos e intente de nuevo',
			  [
				{text:'Okay'},
			  ]
			);
		};
	}

    function SvgTop(){
        return (
    <Svg
    width={400}
    height={178}
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
  
    const {modalVisible}= props
  
  return (
    <Modal
    animationType='slide'
    visible={modalVisible}
    >
        <SafeAreaView style={[styles.contenido, {backgroundColor: theme.backgroun}]}>
          <SvgTop/>
            <Text
            style={[styles.titulo, {color: theme.color}]}
            >
            Iniciar Sesión    
            </Text>
            <Text
            style={styles.subtitulo}>
            Nos da gusto verte por aquí 
            </Text>
            
            <View style={styles.input}>
              <EvilIcons name="envelope" size={40} style={[{color:theme.icono}]}/>
              <TextInput placeholder="e-mail" placeholderTextColor={"#858585"} style={[styles.inputtxt, {color: theme.color}]} onChangeText={handleEmailChange}/>
            </View>

            <View style={styles.input}>
              <EvilIcons name="lock" size={40} style={[{color:theme.icono}]}/>
              <TextInput placeholder="Contraseña" placeholderTextColor={"#858585"} style={[styles.inputtxt, {color: theme.color}]} onChangeText={handlePasswordChange}/>
            </View>

            <View style={styles.botones}>

            <TouchableOpacity
            
                style={styles.btnRegresar}
                >
                <Text
                style={[styles.btnRegresarTxt, {color: theme.icono}]}
                >Regresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnInicio}
              onPress={()=>handleLogin()}
            >
              <Text
                style={styles.btnTxt}
              >Iniciar sesión</Text>
            </TouchableOpacity>
            </View>
      </SafeAreaView>    
    </Modal>
  )
}

const styles = StyleSheet.create({
    contenido: {
        flex: 1,
    },
    titulo: {
        fontSize:36,
        fontWeight:'500',
        textAlign:'left',
        marginTop:70,
        marginHorizontal:25,
    },
    subtitulo: {
        fontSize:20,
        fontWeight:'400',
        textAlign:'left',
        marginHorizontal:25,
        marginTop:3,
        color: '#f23232',
        marginBottom:50

    },
    input: {
        marginTop:20,
        flexDirection: 'row', 
        height: 40,
        marginLeft:'8%',
        marginRight:'8%',
        marginBottom:10,
        borderBottomWidth: 2,
        borderColor:"#858585",
        zIndex:-1,
        
    },
    inputtxt:{
        fontSize:18,
        marginLeft:6,
    },
    btnInicio: {
      backgroundColor:'#F23232',
      padding:10,
      marginTop:140,
      marginRight:20,
      marginLeft:11,
      borderRadius:30
    },
    btnTxt: {
      textAlign: "center",
      color:'#FFF',
      fontSize:17,
      fontWeight:'900',
  },btnRegresar:{
      marginTop: 140,
      marginRight: 5,
      marginLeft: 30,
  },btnRegresarTxt:{

      textAlign: "center",
      fontSize:17,
      fontWeight:'900',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid'
   
  },botones: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
},
})

export default IniciarSesion