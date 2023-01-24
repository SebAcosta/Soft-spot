import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from 'react-native';
import { Dimensions } from "react-native";
import Header from '../components/header2'
import themeContext from '../config/themeContext';
import React,{useState,useContext,useEffect} from 'react';
import {BarChart} from "react-native-chart-kit";
import * as SQLite from 'expo-sqlite';

const chartConfig = {
	backgroundGradientFrom: "#FFFFFF",
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: "#FFFFFF",
	backgroundGradientToOpacity: 0,
	color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
	strokeWidth: 3, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false // optional
};

const graphStyle={
	backgroundGradientFrom: "#1E2923",
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: "#08130D",
	backgroundGradientToOpacity: 0.5,
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false // optional
}


const screenWidth = Dimensions.get("window").width*.95;
const screenWidth2 = Dimensions.get("window").width*.90;

export default function Estadisticas() {
	let data3;
	const theme = useContext(themeContext);
	const [selected,setSelected] = useState(1);
	const [totales,setTotales] = useState(0);
	const [nombre1,setNombre1] = useState('');
	const [nombre2,setNombre2] = useState('');
	const [nombre3,setNombre3] = useState('');
	const [nombre4,setNombre4] = useState('');
	const [nombre5,setNombre5] = useState('');
	const [venta1,setVenta1] = useState('');
	const [venta2,setVenta2] = useState('');
	const [venta3,setVenta3] = useState('');
	const [venta4,setVenta4] = useState('');
	const [venta5,setVenta5] = useState('');
	var nombreArray = [], ventasArray = [];
	const db = SQLite.openDatabase('soft-spot.db');
	useEffect(()=>{
		db.transaction(tx => {
			if(selected==1){
				tx.executeSql(
				  'SELECT nombreArticulo, ventas FROM articulo ORDER BY ventas DESC LIMIT 5',
				  [],
				  (_, { rows: { _array } }) => {
					for (var i = 0; i < _array.length; i++) {
					  	nombreArray.push(_array[i].nombreArticulo);
					  	ventasArray.push(_array[i].ventas);
						setNombre1(_array[0].nombreArticulo)
						setNombre2(_array[1].nombreArticulo)
						setNombre3(_array[2].nombreArticulo)
						setNombre4(_array[3].nombreArticulo)
						setNombre5(_array[4].nombreArticulo)
						setVenta1(_array[0].ventas)
						setVenta2(_array[1].ventas)
						setVenta3(_array[2].ventas)
						setVenta4(_array[3].ventas)
						setVenta5(_array[4].ventas)
					}
				  },
				  (_, error) => {
					console.log('SQLite Error:', error);
				  }
				);
			}else{
				tx.executeSql(
				  'SELECT nombreArticulo, ventas FROM articulo ORDER BY ventas ASC LIMIT 5',
				  [],
				  (_, { rows: { _array } }) => {
					for (var i = 0; i < _array.length; i++) {
						nombreArray.push(_array[i].nombreArticulo);
						ventasArray.push(_array[i].ventas);
						setNombre1(_array[0].nombreArticulo)
						setNombre2(_array[1].nombreArticulo)
						setNombre3(_array[2].nombreArticulo)
						setNombre4(_array[3].nombreArticulo)
						setNombre5(_array[4].nombreArticulo)
						setVenta1(_array[0].ventas)
						setVenta2(_array[1].ventas)
						setVenta3(_array[2].ventas)
						setVenta4(_array[3].ventas)
						setVenta5(_array[4].ventas)
					}
				  },
				  (_, error) => {
					console.log('SQLite Error:', error);
				  }
				);
			}
			tx.executeSql(
				'COMMIT',
				[],
				(_, results) => {
				  console.log('Changes are committed');
				},
				(_, error) => {
				  console.log('Error:', error);
				}
			);
		});
	},[selected]);

	data3={
		labels:[nombre1, nombre2, nombre3, nombre4, nombre5],
		datasets:[
			{
				data:[venta1,venta2,venta3,venta4,venta5],
				color: (opacity = 1) => `rgba(242,50,50, ${opacity})`, // optional
				strokeWidth: 2 // optional
			}
		],
	};

	useEffect(()=>{
		const db = SQLite.openDatabase('soft-spot.db');
		db.transaction(tx => {
			tx.executeSql(
				'SELECT total FROM ganancias WHERE idGanancia = 1', 
				[],
				(_, { rows: { _array } }) => {
					setTotales(_array[0].total)
				},
				(_, error) => console.log(error)
			);
			tx.executeSql(
				'COMMIT',
				[],
				(_, results) => {
				  console.log('Changes are committed');
				},
				(_, error) => {
				  console.log('Error:', error);
				}
			);
		});
	}, [totales]);

	return (
		<ScrollView style={[styles.container, {backgroundColor: theme.background}]} contentContainerStyle={[styles.contentContainer]}>
			<View style={styles.ingresos}>
				<Text style={styles.ing}>Ingresos actuales</Text>
				<Text style={styles.dinero}>${totales}</Text>
			</View>
			<View style={styles.sub}>
				<Text style={styles.subTxt}>Productos</Text>
			</View>
			<View style={[styles.bar, {backgroundColor: theme.grafico, width:screenWidth, marginLeft:5}]}>
				<BarChart
					style={graphStyle}
					data={data3}
					width={screenWidth2}
					height={350}
					yAxisLabel="$"
					chartConfig={chartConfig}
					verticalLabelRotation={40}
				/>
			</View>
			<View style={styles.botones}>
				<TouchableOpacity style={selected==1?styles.botonAct:styles.boton} onPress={()=>setSelected(1)}>
					<Text style={selected==1?styles.btnAct:styles.btn}>Más</Text>
				</TouchableOpacity>
				<TouchableOpacity style={selected==2?styles.botonAct:styles.boton} onPress={()=>setSelected(2)}>
					<Text style={selected==2?styles.btnAct:styles.btn}>Menos</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	ingresos:{
		backgroundColor:'#F23232',
		width:'80%',
		marginLeft:'10%',
		height:100,
		marginTop:15,
		borderRadius:15,
		padding:10
	},
	ing:{
		color:'white',
		fontWeight:'500'
	},
	dinero:{
		color:'white',
		fontWeight:'800',
		fontSize:40,
		paddingLeft:10
	},
	line:{
		marginTop:30
	},
	botones:{
		flexDirection:'row',
		width:'80%',
		marginLeft:'10%',
		justifyContent:'space-between',
		marginTop:10,
	},
	boton:{
		paddingVertical:7,
		paddingHorizontal:25,
		borderRadius:30,
		borderWidth:1,
		borderColor:'white'
	},
	botonAct:{
		paddingVertical:7,
		paddingHorizontal:25,
		borderRadius:30,
		borderWidth:1,
		borderColor:'#F23232'
	},
	btn:{
		color:'gray',
		fontSize:25,
		fontWeight:'600'
	},
	btnAct:{
		color:'#F23232',
		fontSize:25,
		fontWeight:'600'
	},
	sub:{
		marginTop:30
	},
	subTxt:{
		color: '#F23232',
		fontWeight:'700',
		fontSize:30,
		marginLeft:'5%'
	},
	pie:{
		marginTop:10
	},
	bar:{
		marginTop:20,
		marginLeft:10,
		marginBottom:15
	},
	contentContainer: {
		paddingBottom: 30
	  }
});
