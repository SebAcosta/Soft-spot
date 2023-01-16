import { StyleSheet, Text, SafeAreaView, TextInput, View, Alert, TouchableOpacity} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState, useContext } from 'react';
import {Ionicons} from '@expo/vector-icons';
import { getDbConnection, insertArticulo } from '../src/utils/db';
import themeContext from '../config/themeContext';

export default function AgregarArticulo(){
  const theme = useContext(themeContext);
  const [selected, setSelected] = React.useState("Ninguna");
  const data=[
    {Key:'1', value:'1'},
    {Key:'2', value:'2'},
    {Key:'3', value:'3'},
    {Key:'4', value:'4'},
  ];

  const initArticulo = {
    nombreArticulo: '',
    descArt: '',
    cantidad:'',
    cantidadCrit:'',
    precio:''
  }

  const [articulo, setArticulo] = useState(initArticulo);

  const handleNombre = nombreArticulo => {
    setArticulo({
      ...articulo,
      nombreArticulo
    });
  }
  const handleDesc = descArt => {
    setArticulo({
      ...articulo,
      descArt
    });
  }
  const handleCant = cantidad => {
    setArticulo({
      ...articulo,
      cantidad
    });
  }
  const handleCrit = cantidadCrit => {
    setArticulo({
      ...articulo,
      cantidadCrit
    });
  }
  const handlePrecio = precio => {
    setArticulo({
      ...articulo,
      precio
    });
  }

  //Crear en la BD
  async function createArticulo(){
    if(articulo.nombreArticulo === ''){
      Alert.alert(
        'Error',
        'Asignar un nombre de artículo es obligatorio.',
        [{text:'OK'}]
      )
      return;
    }
    try{
      const db = await getDbConnection();
      await insertArticulo(db, articulo.nombreArticulo, articulo.descArt, articulo.cantidad, articulo.cantidadCrit, articulo.precio);
      Alert.alert(
        'Artículo creado',
        `"${articulo.nombreArticulo}" agregado con éxito.`,
        [{
            text: 'Ok'
            //onPress: AGREGAR FUNCION QUE REGRESE A LA PANTALLA DE INICIO
          }]
      );
      db.closeAsync();
    }catch (e){
      Alert.alert(
        'Error al crear artículo',
        `${e.message}`,
        [{text: 'ok'}]
      );
    }
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.nota, {color: theme.color}]}>NOTA: Los campos con “*” son obligatorios</Text>

      <View style={styles.circulo}>
        <Ionicons name="cube-outline" size={100} style={[{color: theme.icon}]}/>
      </View>

      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Nombre*" onChangeText={handleNombre} value={articulo.nombreArticulo}/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Descripción" onChangeText={handleDesc} value={articulo.descArt}/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Precio" onChangeText={handlePrecio} value={articulo.precio} keyboardType = 'numeric'/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Cantidad" onChangeText={handleCant} value={articulo.cantidad} keyboardType = 'numeric'/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder="Cantidad crítica" onChangeText={handleCrit} value={articulo.cantidadCrit} keyboardType = 'numeric'/>
      <Text style={[styles.text, {color: theme.text2}]}>Cuando este articulo llegue a la cantidad critica, se le notificará</Text>

      <Text style={[styles.eti, {color: theme.text2} ]}>Etiqueta (opcional)</Text>
      <SelectList 
        data={data}
        setSelected={setSelected}
        dropdownTextStyles={[styles.opc, {color:theme.color}]}
        boxStyles={{width:333,marginLeft:30}}
        dropdownStyles={{width:333,marginLeft:30}}
        inputStyles={[styles.select, {color:theme.color}]}
        placeholder="Ninguna"
      />

      <TouchableOpacity title='GUARDAR' onPress={createArticulo} style={styles.guardar}>
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
  },
  text:{
    marginLeft:'8%',
    marginRight:'8%',
    fontSize:11,
    marginBottom:20,
  },
  guardar:{
		backgroundColor:'#77DD77',
    text: 'white',
		width:110,
    height:36,
		justifyContent:'center',
		alignItems:'center',
		borderRadius:10,
    marginLeft:250,
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
  eti:{
    marginLeft:'8%',
    marginRight:'8%',
    fontSize:17,
    color:"#808080",
    marginBottom:7
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
  opc:{
    fontSize:17
  },
  select:{
    fontSize:17, 
    marginLeft:-10

  }
});
