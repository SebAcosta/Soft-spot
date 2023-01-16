import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from "./navigation/MainNavigator";
import { initDatabase } from './src/utils/db';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';


export default function App() {
	const [mode, setMode] = useState(false);

	useEffect(function (){
		async function init(){
			await initDatabase();
		}
		init();
	}, []);

	useEffect(() => {
		let eventListener = EventRegister.addEventListener(
			"ChangeTheme",
			(data) => {
				setMode(data)
			}
		)
		return () => {
			EventRegister.removeEventListener(eventListener);
		};
	}, [mode]);
	return (
		<themeContext.Provider value={mode === true ? theme.dark : theme.light}>
		<StackNavigator />
		</themeContext.Provider>
	);
}
