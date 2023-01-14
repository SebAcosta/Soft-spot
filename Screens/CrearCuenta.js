import React,{useState,useContext} from 'react'
import {Modal, Text, SafeAreaView,StyleSheet,TouchableOpacity,View,TextInput} from 'react-native'
import {EvilIcons} from '@expo/vector-icons';
import Svg, { Ellipse } from "react-native-svg";
import { login, signin } from '../Service/Api';
import { LoginContext } from '../Context/LoginContext';

const oInitState = {
	nombre:'',
	email:'',
	password:'',
	confirm:'',
	isValidNombre:true,
	isValidEmail:true,
	isValidPass:true,
	isValidConfirm:true
};

const CrearCuenta = (props) => {
  const [data, setData] = useState(oInitState);
  const { iniciarSesion } = useContext(LoginContext);
	const  mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleNombreChange = nombre =>{
    setData({
      ...data,
      nombre,
      isValidNombre:nombre.trim().length > 0
    });
  }
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
  const handleValidChange = confirm =>{
		setData({
			...data,
			confirm,
			isValidPassword:confirm.trim() == data.password.trim()
		  })
	}

  const handleLogin = async (email,password)=>{
    const response = await login(email, password)
    .catch(error => {
      console.log(error.response);
    });

    if (response?.data?.ok) {
      iniciarSesion(response.data.token); //aquí debería ser .message
    }
  }

  const handleSignin= async ()=>{
		const { isValidNombre, isValidEmail, isValidPassword, isValidConfirm } = data;

		if (isValidNombre && isValidPassword && isValidEmail && isValidConfirm) {
			const { email, password, nombre, confirm } = data;

			if (nombre !== '' && email !== '' && password !== '' && confirm !== '') {
				const response = await signin(email, password, nombre)
					.catch(error => {
						console.log(error.response);
					});

				if (response?.data?.ok) {
					handleLogin(email,password)
				}else{
          Alert.alert(
            'Error',
            'Hubo un problema, intenta otra vez',
            [
              {text:'Okay'},
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
        return(
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
             Crea tu cuenta!    
            </Text>
            <Text
            style={styles.subtitulo}>
             Nos da gusto verte por aquí 
            </Text>

            <View style={styles.input}>
              <EvilIcons name="user" size={40} color={"white"} />
              <TextInput placeholder="Nombre" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handleNombreChange}/>
            </View>

            <View style={styles.input}>
              <EvilIcons name="envelope" size={40} color={"white"} />
              <TextInput placeholder="e-mail" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handleEmailChange}/>
            </View>


            <View style={styles.input}>
              <EvilIcons name="lock" size={40} color={"white"} />
              <TextInput placeholder="Contraseña" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handlePasswordChange}/>
            </View>

            <View style={styles.input}>
              <EvilIcons name="lock" size={40} color={"white"} />
              <TextInput placeholder="Confirmar contraseña" placeholderTextColor={"#858585"} style={styles.inputtxt} onChangeText={handleValidChange}/>
            </View>

            <View style={styles.botones}>

            <TouchableOpacity
            
            style={styles.btnAtras}
            >
              <Text
              style={styles.btnAtrasTxt}
              >Ya tengo cuenta</Text>
           </TouchableOpacity> 

            <TouchableOpacity
              style={styles.btnSiguiente}
              onPress={()=>{handleSignin()}}
              >
                <Text
                style={styles.btnTxt}
                >Siguiente</Text>
			      </TouchableOpacity> 


            </View>
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
        marginTop:50,
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
        marginTop:10,
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
        color:'#FFFFFF'     
    },
    btnSiguiente: {
      backgroundColor:'#F23232',
      padding:6,
      marginTop:50,
      marginRight:15,
      marginLeft:115,
      borderRadius:30
    },
  btnTxt: {
      textAlign: "center",
      color:'#FFF',
      fontSize:17,
      fontWeight:'900',
  },
  btnAtras:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#262626',
      marginTop:50,
      marginLeft:15,
      marginRight:9,
      padding:5,
      borderRadius:20

  },
  btnAtrasTxt:{
      textAlign: "center",
      color:'#FFF',
      fontSize:17,
      fontWeight:'900',
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid'
         
  },
  botones: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
})

export default CrearCuenta