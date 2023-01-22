import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import { AntDesign,Foundation,FontAwesome5,Ionicons,EvilIcons,MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
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
import CrearCuenta from '../Screens/CrearCuenta';
import Header2 from '../components/header2';
import header from '../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from '../Context/LoginContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CustomDrawer } from '../components/CustomDrawer';
import Configuracion from '../Screens/Configuracion';
import Softspot from '../Screens/Softspot';
import Comentarios from '../Screens/Comentarios';


const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const StackNavigator = (props) =>{
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

	const SideDrawer = () => {
		return(
			<>
				<Drawer.Navigator
					initialRouteName='Pantalla principal'
					drawerContent={props => <CustomDrawer {...props}/>}
					screenOptions={{ 
					headerShown: false,
					drawerLabelStyle: {marginLeft: -15, color: '#fff',}
					}}
				>
					<Drawer.Screen name="Configuracion" component={Configuracion} 
						options={{
						drawerLabelStyle:{color: '#fff', marginLeft: -15,fontSize:15},
						drawerIcon: () => <Ionicons name="settings-outline" size={24} color="white"/>,
						title: 'Configuracion',headerShown:true, headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}
						}}
					/>
					<Drawer.Screen name="Calificanos" component={Comentarios} 
						options={{
						drawerLabelStyle:{color: '#fff', marginLeft: -15,fontSize:15},
						drawerIcon: () => <AntDesign name="like2" size={24} color="white" />,
						title: 'Calificanos', headerShown:true, headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}
						}}
					/>
					<Drawer.Screen name="Softspot" component={Softspot} 
						options={{
						drawerLabelStyle:{color: '#fff', marginLeft: -15,fontSize:15},
						drawerIcon: () => <Ionicons name="information-circle-outline" size={24} color="white"/>,
						title: '¿Quienes somos?', headerShown:true, headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}
						}}
					/>
					<Drawer.Screen name="Pantalla principal" component={TabNavigator} 
						options={{
						drawerLabelStyle:{color: '#fff', marginLeft: -15,fontSize:15},
						drawerIcon: () => <Ionicons name="home-outline" size={24} color="white" />,
						title: 'Menu principal'
						}}
					/>
				</Drawer.Navigator>
			</>
		);
	  };


	return(
		<LoginContext.Provider value={loginContext}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					{ !isAuth ?
						<>
							<Stack.Screen name="Login" component={Login}/>
							<Stack.Screen name="CrearCuenta" component={CrearCuenta}/>
							<Stack.Screen name="IniciarSesion" component={IniciarSesion}/>
						</>
					:
						<>
							{/* <Stack.Screen name={"TabNavigator"}
											component={TabNavigator}
											options={{headerShown:false}}
							/> */}
							<Stack.Screen name="drawer" component={SideDrawer}/>
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

const TabNavigator = (props) =>{
	return(
		<>
		<Header2 navigation={props.navigation}/>	
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