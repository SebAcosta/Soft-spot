import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, View, Alert, TouchableOpacity} from 'react-native';
import React,{useState,useContext} from 'react';
import {EvilIcons,MaterialIcons} from '@expo/vector-icons';
import {ColorPicker} from 'react-native-color-picker';
import { getDbConnection, insertEtiqueta } from '../src/utils/db';
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';

export default function AgregarEtiqueta(props) {
  const theme = useContext(themeContext);
  const [colorVisible, setColorVisible] = useState(false);
  const [capColor, setCapColor] = useState('#000');

  const initEtiqueta ={
    nombreEtiqueta:'',
    descEtiqueta:''
  }

  const [etiqueta, setEtiqueta] = useState(initEtiqueta);

  const handleNombre = nombreEtiqueta => {
    setEtiqueta({
      ...etiqueta,
      nombreEtiqueta
    });
  }
  const handleDesc = descEtiqueta => {
    setEtiqueta({
      ...etiqueta,
      descEtiqueta
    })
  }

  //Crear en la BDD
  async function createEtiqueta(){
    if(etiqueta.nombreEtiqueta === ''){
      Alert.alert(
        'Error',
        'Asignar un nombre de etiqueta es obligatorio.',
        [{text:'OK'}]
      )
      return;
    }
    try{
      const db = SQLite.openDatabase('soft-spot.db');
      db.transaction(tx=>{
        tx.executeSql('INSERT INTO etiqueta (nombreEtiqueta,descEtiqueta) VALUES (?,?)', [etiqueta.nombreEtiqueta,etiqueta.descEtiqueta],);
      },(error)=>{
        console.log(error);
      },()=>{
        console.log(`Etiqueta ${etiqueta.nombreEtiqueta} agregado a la BDD`)
      }
      )
      Alert.alert(
        'Etiqueta creado',
        `"${etiqueta.nombreEtiqueta}" agregado con éxito.`,
        [{
            text: 'Ok',
            onPress: () => props.navigation.navigate("drawer")
          }]
      );
      // db.closeAsync();
    }catch (e){
      Alert.alert(
        'Error al crear etiqueta',
        `${e.message}`,
        [{text: 'ok'}]
      );
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <Text style={[styles.nota, {color: theme.color}]}>NOTA: Los campos con “*” son obligatorios</Text>

        <TouchableOpacity
          style={styles.color}
          onPress={() => {
            setColorVisible(!colorVisible);
          }}>
          <Text style={styles.botonColor}></Text>
          <MaterialIcons name="colorize" size={40} color="grey"/>
        </TouchableOpacity>

        <View style={styles.circulo}>
          <EvilIcons name="tag" size={140} style={[{color: theme.icon}]}/>
        </View>

        <View>
          {colorVisible ? (
            <ColorPicker
              hideSliders
              onColorSelected={color => {
                setCapColor(color);
              }}
              style={[styles.picker, {backgroundColor:theme.background}]}
            />
          ) : null}

        </View> 

        <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Nombre*" onChangeText={handleNombre} value={etiqueta.nombreEtiqueta}/>
        <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Descripción" onChangeText={handleDesc} value={etiqueta.descEtiqueta} />

        <TouchableOpacity style={styles.guardar} onPress={createEtiqueta}>
          <Text style={styles.Tguardar}>Guardar</Text>
        </TouchableOpacity>

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%'
	},
  input: {
    height: 40,
    marginLeft:'8%',
    marginRight:'8%',
    marginBottom:10,
    borderBottomWidth: 1,
    fontSize:17,
    zIndex:-1,
  },
  guardar:{
		backgroundColor:'#77DD77',
		width:110,
    height:36,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
    marginLeft:"65%",
    marginTop:50
	},
  Tguardar:{
		color:'white',
		fontSize:17,
		fontWeight:'600'
	},
  nota:{
    fontSize:16,
    marginBottom:10,
    marginTop:10,
    marginLeft:10
  },
  circulo:{
    backgroundColor:'#d9d9d9',
		width:150,
    height:150,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:100,
    margin:20,
    marginLeft:'31%'
  },
  color:{
    position:'absolute',
    zIndex:1,
    justifyContent:'center',
		alignItems:'center',
    marginTop: "34.5%",
    marginLeft: "45%",
  },
  botonColor:{
    position:'absolute',
    zIndex:-1,
    backgroundColor:"#dcdcdc",
    borderColor:"#bebebe",
    borderWidth:1,
    width:50,
    height:50,
    borderRadius:100,
  },
  picker:{
    position:'absolute',
    zIndex:1,
    width: 153, 
    height: 153, 
    borderRadius:80,
    marginTop:-172,
    marginLeft:"10%"
  }
});
