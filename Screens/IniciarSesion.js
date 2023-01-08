import axios from 'axios';
import React,{useState,useContext} from 'react'
import {Modal, Text, SafeAreaView,StyleSheet,TouchableOpacity,View,TextInput, Alert} from 'react-native'
import {EvilIcons} from '@expo/vector-icons';
import Svg, { Ellipse } from "react-native-svg";
import { login } from '../Service/Api';
import { LoginContext } from '../Context/LoginContext';

const oInitState = {
	email:'',
	password:'',
	isValidUser:true,
	isValidPassword:true
};

const IniciarSesion = (props) => {
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
					iniciarSesion(response.data.token); //aquí debería ser .message
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
        <SafeAreaView style={styles.contenido}>
          <SvgTop/>
            <Text
            style={styles.titulo}
            >
            Iniciar Sesión    
            </Text>
            <Text
            style={styles.subtitulo}>
            Nos da gusto verte por aquí 
            </Text>
            
            <View style={styles.input}>
              <EvilIcons name="envelope" size={40} color={"white"} />
              <TextInput placeholder="e-mail" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handleEmailChange}/>
            </View>

            <View style={styles.input}>
              <EvilIcons name="lock" size={40} color={"white"} />
              <TextInput placeholder="Contraseña" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handlePasswordChange}/>
            </View>
            <TouchableOpacity
              style={styles.btnInicio}
              onPress={()=>handleLogin()}
            >
              <Text
                style={styles.btnTxt}
              >Iniciar sesión</Text>
            </TouchableOpacity>  
      </SafeAreaView>    
    </Modal>
  )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor:'#262626',
        flex: 1,
    },
    titulo: {
        fontSize:36,
        fontWeight:'500',
        textAlign:'left',
        marginTop:70,
        marginHorizontal:25,
        color:'#FFFFFF',
    },
    subtitulo: {
        fontSize:20,
        fontWeight:'400',
        textAlign:'left',
        marginHorizontal:25,
        marginTop:3,
        color: 'red',
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
        marginTop:200,
        marginRight:10,
        marginLeft:220,
        borderRadius:30
      },
      btnTxt: {
		textAlign: "center",
		color:'#FFF',
		fontSize:17,
		fontWeight:'900',
    }
})

export default IniciarSesion