import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from "./navigation/MainNavigator";
import { initDatabase } from './src/utils/db';


export default function App() {
	useEffect(function (){
		async function init(){
			await initDatabase();
		}
		init();
	}, []);
	return (
		<StackNavigator />
	);
}
