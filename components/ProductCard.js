import React, { useState, useContext,  useEffect} from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback,FlatList,TouchableNativeFeedback } from "react-native";
import TouchableCmp from "./UI/TouchableCmp";
import { Entypo } from '@expo/vector-icons';
import Modal from "react-native-modal";
import modal from "./modal"
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';

const ProductCard = (props) => {
	const theme = useContext(themeContext);
	const id = props.productInfo.idArticulo
	const img = props.productInfo.img
	const nombre = props.productInfo.nombreArticulo
	const presen = props.productInfo.descArt
	const cantidad = props.productInfo.cantidad
	const costo = props.productInfo.precio
	const fav = props.productInfo.favorito
	const etiquetas = props.productInfo.etiqueta
	const min = props.productInfo.cantidadCrit
	const [isModalVisible, setModalVisible] = useState(false);
	const [name,setName] = useState('')
	const [color,setColor] = useState('#E83845')
	const db = SQLite.openDatabase('soft-spot.db');

	useEffect(() => {
		if(etiquetas!=='Ninguna'){
			db.transaction(tx => {
				tx.executeSql(
					'SELECT colorEtiqueta FROM etiqueta WHERE nombreEtiqueta = ?',
					[etiquetas],
					(_, { rows: { _array } }) => {
						setColor(_array[0].colorEtiqueta);
					},
					(_, error) => console.log(error)
				);
			});
		}
	}, [props]);

	const makeFav = () =>{
		db.transaction(tx => {
			tx.executeSql(
				`UPDATE articulo SET favorito = ? WHERE nombreArticulo = ?`,
    			[1, nombre],
				(_, results) => {
					console.log("Se hizo favorito")
				},
				(_, error) => console.log(error)
			);
		});
	}
	const unFav = () =>{
		db.transaction(tx => {
			tx.executeSql(
				`UPDATE articulo SET favorito = ? WHERE nombreArticulo = ?`,
    			[0, nombre],
				(_, results) => {
					console.log("Se quitó favorito")
				},
				(_, error) => console.log(error)
			);
		});
	}
	
	const modal = () => {
		setModalVisible(true);
	}

	return (
		<View>
			<TouchableNativeFeedback onPress={()=>setModalVisible(true)} onLongPress={()=>props.navigation.navigate('EditarArticulo',{productInfo:props.productInfo})}>
				<View style={[styles.card0, {borderColor: theme.linea}]}>
					<View style={styles.productos}>
						<View style={styles.imagen}>
							<Image source={{ uri: img }} style={styles.image} />
						</View>
						<View style={styles.detalles}>
							<Text style={[styles.nombre,{color: theme.color}]}>{nombre}</Text>
							{presen&&<Text style={[styles.presen,{color: theme.color}]}>{presen}</Text>}
							{cantidad<=min?
								<Text style={[styles.cant2,{color: theme.color}]}>Cantidad: {cantidad}</Text>:
								<Text style={[styles.cant,{color: theme.color}]}>Cantidad: {cantidad}</Text>
							}
							<Text style={[styles.precio, {color: theme.color}]}>Precio: ${costo}</Text>
						</View>
						{fav==1?<Entypo name='star' size={30} style={[{color: theme.color}]} onPress={()=>unFav()}/>
						:<Entypo name='star-outlined' size={30} style={[{color: theme.color}]} onPress={()=>makeFav()}/>}
					</View>
					<View>
						{etiquetas!=='Ninguna'?
						<View style={[styles.etiqueta,{backgroundColor:color}]}>
							<Text style={styles.etText}>{etiquetas}</Text>
						</View>
						:
						null
						}
					</View>
				</View>
			</TouchableNativeFeedback>
			<Modal isVisible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View style={styles.notModal}>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.modal}>
					<View style={styles.notBotones}>
						<View style={styles.mPrimera}>
							<View style={styles.mTitulo}>
								<Text numberOfLines={2} style={styles.mTitle}>{nombre}</Text>
							</View>
							<Text style={styles.mTitle}>${costo}</Text>
						</View>
						<Text style={styles.mPres}>{presen}</Text>
						<Text style={styles.mCant}>Cantidad: {cantidad}</Text>
					</View>
					<View style={styles.mBotones}>
						<View style={styles.comp}>
							<View style={styles.comp1}>
								<Text style={styles.Tcomp1}>-</Text>
							</View>
							<View style={styles.comp2}>
								<Text style={styles.Tcomp2}>0</Text>
							</View>
							<View style={styles.comp1}>
								<Text style={styles.Tcomp1}>+</Text>
							</View>
						</View>
						<TouchableNativeFeedback>
							<View style={styles.guardar}>
								<Text style={styles.Tguardar}>Guardar</Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			</Modal>
		</View>
	)
}
export default ProductCard;

const styles = StyleSheet.create({
	card0: {
		width: '90%',
		marginHorizontal: '5%',
		height: 170,
		overflow: 'hidden',
		borderBottomWidth:1,
		paddingBottom:15,
		paddingTop:20,
		justifyContent:'space-between'
	},
	modal: {
		height: 223,
		width: Dimensions.get('window').width,
		backgroundColor: '#393939',
		marginLeft: -20,
		borderRadius: 10,
		paddingVertical:25,
		paddingHorizontal:40,
		justifyContent:'space-between'
	},
	notModal: {
		height: 600,
		width: Dimensions.get('window').width,
		marginLeft: -20,
	},
	image:{
		height:100,
		width:100,
		resizeMode:'cover'
	},
	imagen:{
		height:90,
		width:90,
		borderRadius:45,
		overflow:'hidden',
		justifyContent:'center',
		alignItems:'center',
		marginTop:5
	},
	etiqueta:{
		backgroundColor:'#E83845',
		borderRadius:10,
		paddingHorizontal:10,
		paddingVertical:3,
		justifyContent:'center',
		alignSelf:'flex-start',
		marginLeft:10
	},
	etText:{
		color:'white'
	},
	detalles:{
		width:'60%',
		paddingLeft:15,
		justifyContent:'space-around'
	},
	productos:{
		flexDirection:'row',
		height:100,
	},
	nombre:{
		fontWeight:'800',
		fontSize:18
	},
	cant:{
		fontSize:15,
		fontWeight:'400',
	},
	cant2:{
		fontSize:15,
		fontWeight:'500',
		color:'red'
	},
	presen:{
		fontWeight:'600'
	},
	mTitle:{
		color:'white',
		fontSize:22,
		fontWeight:'500'
	},
	mPres:{
		color:'white',
		fontSize:18,
	},
	mCant:{
		color:'#F3D328',
		fontSize:20
	},
	mPrimera:{
		flexDirection:'row',
		width:280,
		justifyContent:'space-between'
	},
	mTitulo:{
		width:180,
	},
	notBotones:{
		justifyContent:'space-between',
		height:108
	},
	mBotones:{
		flexDirection:'row',
		justifyContent:'space-between'
	},
	comp:{
		flexDirection:'row',
		width:150,
		height:35,
		borderRadius:10,
		overflow:'hidden',
	},
	comp1:{
		backgroundColor: '#F23232',
		width:'30%',
		justifyContent:'center',
		alignItems:'center'
	},
	comp2:{
		backgroundColor: '#908E8E',
		width:'40%',
		justifyContent:'center',
		alignItems:'center'
	},
	Tcomp1:{
		color:'white',
		fontWeight:'600',
		fontSize:25
	},
	Tcomp2:{
		fontWeight:'600',
		fontSize:20
	},
	guardar:{
		backgroundColor:'#F23232',
		width:120,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10
	},
	Tguardar:{
		color:'white',
		fontSize:17,
		fontWeight:'600'
	}
})