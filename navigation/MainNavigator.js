import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AntDesign,Foundation,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import Articulos from '../Screens/Articulos';
import Categorias from '../Screens/Categorias';
import Productos from '../Screens/Productos';
import Estadisticas from '../Screens/Estadisticas';
import EditarArticulo from '../Screens/EditarArticulo';
import AgregarArticulo from '../Screens/AgregarArticulo';
import AgregarCategoria from '../Screens/AgregarCategoria';

const Tab = createBottomTabNavigator();
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
								options={(props)=>({title:props.route.params.productInfo.name})}
				/>
				<Stack.Screen name={"AgregarArticulo"}
								component={AgregarArticulo}
								options={(props)=>({title:props.route.params.productInfo.name})}
				/>
				<Stack.Screen name={"AgregarCategoria"}
								component={AgregarCategoria}
								options={(props)=>({title:props.route.params.productInfo.name})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const TabNavigator = () =>{
	return(
		<Tab.Navigator screenOptions={{tabBarShowLabel:false,tabBarActiveBackgroundColor:'#F23232',
		tabBarInactiveBackgroundColor:'#262626',headerShown:false}}>
			<Tab.Screen name="Artículos" component={Articulos} options={{
				tabBarIcon:({focused})=><FontAwesome5 name="clipboard-list" size={24} color={"white"} />
			}}/>
			<Tab.Screen name="Categorías" component={Categorias} options={{
				tabBarIcon:({focused})=><MaterialIcons name="category" size={24} color={"white"} />
			}}/>
			<Tab.Screen name="Productos" component={Productos} options={{
				tabBarIcon:({focused})=><AntDesign name="heart" size={24} color={"white"} />
			}}/>
			<Tab.Screen name="Estadístcas" component={Estadisticas} options={{
				tabBarIcon:({focused})=><Foundation name="graph-bar" size={24} color={"white"} />
			}}/>
		</Tab.Navigator>
	)
}