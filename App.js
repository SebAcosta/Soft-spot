import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {StackNavigator} from "./navigation/MainNavigator";
import { initDatabase } from './src/utils/db';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './config/themeContext';
import theme from './config/theme';
import * as SQLite from 'expo-sqlite';



export default function App() {
	const [mode, setMode] = useState(false);

	useEffect(function (){
		function init(){
			// initDatabase();
			const db = SQLite.openDatabase('soft-spot.db');
			// db.closeAsync();
			// db.deleteAsync();
			db.transaction(tx=>{
				tx.executeSql('CREATE TABLE IF NOT EXISTS articulo (idArticulo INTEGER PRIMARY KEY AUTOINCREMENT, nombreArticulo VARCHAR(50), descArt VARCHAR(200), cantidad INTEGER(3), cantidadCrit INTEGER(3), precio DOUBLE(6,2))');
				console.log('Tabla articulo creada');
				tx.executeSql('CREATE TABLE IF NOT EXISTS grupo (idGrupo INTEGER PRIMARY KEY AUTOINCREMENT, nombreGrupo VARCHAR(50), descGrupo VARCHAR(200), colorGrupo VARCHAR(15))');
				console.log('Tabla grupo creada');
				tx.executeSql('CREATE TABLE IF NOT EXISTS etiqueta (idEtiqueta INTEGER PRIMARY KEY AUTOINCREMENT, nombreEtiqueta VARCHAR(50), colorEtiqueta VARCHAR(15), descEtiqueta VARCHAR(200))');
				console.log('Tabla etiqueta creada');
			},(error)=>{
				console.log(error);
			})
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
