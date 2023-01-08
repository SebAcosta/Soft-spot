import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { AntDesign,Foundation,FontAwesome5,Ionicons,EvilIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import Articulos from '../Screens/Articulos';
import Etiquetas from '../Screens/Etiquetas';
import Grupos from '../Screens/Grupos';
import Estadisticas from '../Screens/Estadisticas';
import EditarArticulo from '../Screens/EditarArticulo';
import AgregarArticulo from '../Screens/AgregarArticulo';
import AgregarGrupo from '../Screens/AgregarGrupo';
import AgregarEtiqueta from '../Screens/AgregarEtiqueta';
import Login from '../Screens/Login';
import IniciarSesion from '../Screens/IniciarSesion';
import Registrar from '../Screens/Registrar';
import Header2 from '../components/header2';
import header from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../Context/LoginContext';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const StackNavigator = () =>{
	const [isAuth,setIsAuth] = useState(false)

	const loginContext = {
		iniciarSesion: async (token) => {
		  setIsAuth(true)
		  await AsyncStorage.setItem('token',token)
		},
		cerrarSesion: async () => {
		  setIsAuth(false)
		  await AsyncStorage.removeItem('token')
		}
	  } 

	useEffect(()=>{
		async function prepare(){
			try{
				let retrieveToken = await AsyncStorage.getItem('token')
				if(retrieveToken){
				setIsAuth(true)
				} else {
				setIsAuth(false)
				}
			}catch (e) {
				console.warn(e);
			}
		} 
		prepare()
	},[])


	return(
		<LoginContext.Provider value={loginContext}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					{ !isAuth ?
						<>
							<Stack.Screen name="Login" component={Login}/>
							<Stack.Screen name="Registrar" component={Registrar}/>
							<Stack.Screen name="IniciarSesion" component={IniciarSesion}/>
						</>
					:
						<>
							<Stack.Screen name={"TabNavigator"}
											component={TabNavigator}
											options={{headerShown:false}}
							/>
							<Stack.Screen name={"EditarArticulo"}
											component={EditarArticulo}
											options={(props)=>({headerShown:true,title:"Editar" + props.route.params.productInfo.nombre,headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
							/>
							<Stack.Screen name={"AgregarArticulo"}
											component={AgregarArticulo}
											options={()=>({headerShown:true,title:"Agregar ARTICULO",headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
							/>
							<Stack.Screen name={"AgregarGrupo"}
											component={AgregarGrupo}
											options={()=>({headerShown:true,title:"Agregar GRUPO",headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
							/>
							<Stack.Screen name={"AgregarEtiqueta"}
											component={AgregarEtiqueta}
											options={()=>({headerShown:true,title:"Agregar ETIQUETA",headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
							/>
						</>
					}
				</Stack.Navigator>
			</NavigationContainer>
		</LoginContext.Provider>
	)
}

const TabNavigator = () =>{
	return(
		<>
		<Header2 />	
		<Tab.Navigator  initialRouteName="Artículos" screenOptions={{tabBarActiveTintColor: 'white',
        tabBarLabelStyle: { fontSize: 10 },
		tabBarIndicatorStyle:{backgroundColor:'white'},
		tabBarBounces:false,
		swipeEnabled:false,
        tabBarStyle: { backgroundColor: '#F23232' },}}>
			<Tab.Screen name="Artículos" component={Articulos} options={{
				tabBarIcon:()=><Ionicons name="cube-outline" size={24} color={"white"} 
				/>,
			}}/>
			<Tab.Screen name="Grupos" component={Grupos} options={{
				tabBarIcon:()=><FontAwesome5 name="cubes" size={24} color={"white"} />
			}}/>
			<Tab.Screen name="Etiquetas" component={Etiquetas} options={{
				tabBarIcon:()=><EvilIcons name="tag" size={28} color={"white"} />
			}}/>
			<Tab.Screen name="Estadístcas" component={Estadisticas} options={{
				tabBarIcon:({focused})=><AntDesign name="barschart" size={24} color={"white"} />
			}}/>
		</Tab.Navigator>
		</>
	)
}