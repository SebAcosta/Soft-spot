import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AntDesign,Foundation,FontAwesome5,Ionicons,EvilIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import Articulos from '../Screens/Articulos';
import Etiquetas from '../Screens/Etiquetas';
import Grupos from '../Screens/Grupos';
import Estadisticas from '../Screens/Estadisticas';
import EditarArticulo from '../Screens/EditarArticulo';
import AgregarArticulo from '../Screens/AgregarArticulo';
import AgregarCategoria from '../Screens/AgregarCategoria';
import Header2 from '../components/header2';
import header from '../components/header';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const StackNavigator = () =>{
	return(
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
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
								options={(props)=>({headerShown:true,title:"Agregar ARTICULO" + props.route.params.productInfo.nombre,headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
				/>
				<Stack.Screen name={"AgregarCategoria"}
								component={AgregarCategoria}
								options={(props)=>({headerShown:true,title:"Agregar CATEGORIA" + props.route.params.productInfo.nombre,headerTintColor:'white',headerStyle:{backgroundColor:'#F23232'}})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
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