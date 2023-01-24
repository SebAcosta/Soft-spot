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
				tx.executeSql(
					'SELECT name FROM sqlite_master WHERE type="table" AND name="articulo"',
					[],
					(_,{rows:{_array}})=>{
						if(_array.length === 0){
							tx.executeSql(
								'CREATE TABLE articulo (idArticulo INTEGER PRIMARY KEY AUTOINCREMENT, nombreArticulo VARCHAR(50), descArt VARCHAR(200), cantidad INTEGER(3), cantidadCrit INTEGER(3), precio DOUBLE(6,2), etiqueta VARCHAR(100), grupo VARCHAR(100), favorito TINYINT(1), img VARCHAR(600), ventas INTEGER(5));',
								[],
								(_results)=>{
									console.log('articulo creada')
								},
								(_,error)=>{
									console.log(error)
								}
							);
						}else{
							console.log("Ya existe articulo")
						}
					},
					(_,error)=>{
						console.log(error)
					}
				);
				tx.executeSql(
					'SELECT name FROM sqlite_master WHERE type="table" AND name="grupo"',
					[],
					(_,{rows:{_array}})=>{
						if(_array.length === 0){
							tx.executeSql(
								'CREATE TABLE grupo (idGrupo INTEGER PRIMARY KEY AUTOINCREMENT, nombreGrupo VARCHAR(50), descGrupo VARCHAR(200), colorGrupo VARCHAR(15));',
								[],
								(_results)=>{
									console.log('grupo creada')
								},
								(_,error)=>{
									console.log(error)
								}
							);
						}else{
							console.log("Ya existe grupo")
						}
					},
					(_,error)=>{
						console.log(error)
					}
				);
				tx.executeSql(
					'SELECT name FROM sqlite_master WHERE type="table" AND name="etiqueta"',
					[],
					(_,{rows:{_array}})=>{
						if(_array.length === 0){
							tx.executeSql(
								'CREATE TABLE etiqueta (idEtiqueta INTEGER PRIMARY KEY AUTOINCREMENT, nombreEtiqueta VARCHAR(50), colorEtiqueta VARCHAR(15), descEtiqueta VARCHAR(200));',
								[],
								(_results)=>{
									console.log('etiqueta creada')
								},
								(_,error)=>{
									console.log(error)
								}
							);
						}else{
							console.log("Ya existe etiqueta")
						}
					},
					(_,error)=>{
						console.log(error)
					}
				);
				tx.executeSql(
					'SELECT name FROM sqlite_master WHERE type="table" AND name="ganancias"',
					[],
					(_,{rows:{_array}})=>{
						if(_array.length === 0){
							tx.executeSql(
								'CREATE TABLE ganancias (idGanancia INTEGER PRIMARY KEY AUTOINCREMENT, total double(7,2));',
								[],
								(_results)=>{
									tx.executeSql(
										'INSERT INTO ganancias (total) VALUES (?)',[0],
										(_results)=>{
											console.log("Todo bien")
										},
										(_,error)=>{
											console.log(error)
										}
									)
								},
								(_,error)=>{
									console.log(error)
								}
							);
						}else{
							console.log("Ya existe etiqueta")
						}
					},
					(_,error)=>{
						console.log(error)
					}
				);
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
