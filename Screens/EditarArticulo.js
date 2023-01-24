import { StyleSheet, Text, SafeAreaView, TextInput, View, Alert, TouchableOpacity, ScrollView, Image} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import React, { useState, useContext, useEffect } from 'react';
import {Ionicons,MaterialIcons} from '@expo/vector-icons';
import { getDbConnection, insertArticulo } from '../src/utils/db';
import themeContext from '../config/themeContext';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';

export default function EditarArticulo(props){
  const theme = useContext(themeContext);
  const [selected, setSelected] = React.useState("Ninguna");
  const [selected2, setSelected2] = React.useState("Ninguna");
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(props.route.params.productInfo.img);
  const [etiquetas, setEtiquetas] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const db = SQLite.openDatabase('soft-spot.db');

  const ask = async() =>{
    console.log("asking for permission")
    const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
    setHasPermission(galleryStatus.status=== 'granted');
  }

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(galleryStatus.status=== 'granted');
      console.log("Permisos listos");
    });
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM etiqueta',
        [],
        (_, { rows: { _array } }) => {
          const data = _array.map((item, index) => ({ Key: index.toString(), value: item.nombreEtiqueta }));
          setEtiquetas(data);
        },
        (_, error) => console.log(error),
      );
      tx.executeSql(
        'SELECT * FROM grupo',
        [],
        (_, { rows: { _array } }) => {
          const data = _array.map((item, index) => ({ Key: index.toString(), value: item.nombreGrupo }));
          setGrupos(data);
        },
        (_, error) => console.log(error),
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

  }, []);

  // const data=[
  //   {Key:'1', value:'1'},
  //   {Key:'2', value:'2'},
  //   {Key:'3', value:'3'},
  //   {Key:'4', value:'4'},
  // ];

  const pickImage = async () => {
    ask();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality:1,
    });

    if(!result.cancelled){
      setImageUri(result.uri);
      console.log("Imagen guardada");
    }
  }

  if(hasPermission === false){
    console.log("No tienes permiso");
  }

  const initArticulo = {
    nombreArticulo: props.route.params.productInfo.nombreArticulo,
    descArt: props.route.params.productInfo.descArt,
    cantidad:String(props.route.params.productInfo.cantidad),
    cantidadCrit:String(props.route.params.productInfo.cantidadCrit),
    precio:String(props.route.params.productInfo.precio),
    img:props.route.params.productInfo.img
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
  function updateArticulo(){
    if(articulo.nombreArticulo === ''){
      Alert.alert(
        'Error',
        'Asignar un nombre de artículo es obligatorio.',
        [{text:'OK'}]
      )
      return;
    }
    try{
      const db = SQLite.openDatabase('soft-spot.db');
      db.transaction(tx=>{
          tx.executeSql('UPDATE articulo SET nombreArticulo = ?,descArt = ?,cantidad = ?,cantidadCrit = ?,precio = ?,etiqueta = ?,grupo = ?,favorito = ?, img= ? WHERE idArticulo = ?',[articulo.nombreArticulo,articulo.descArt,articulo.cantidad,articulo.cantidadCrit,articulo.precio,selected,selected2,props.route.params.productInfo.favorito,imageUri,props.route.params.productInfo.idArticulo],);
          console.log(`Articulo: ${articulo.nombreArticulo} agregado a la BDD`);
      },(error)=>{
          console.log(error);
      })
      Alert.alert(
        'Artículo actualizado',
        `"${articulo.nombreArticulo}" actualizado con éxito.`,
        [{
            text: 'Ok',
            onPress: () => props.navigation.navigate("drawer")
          }]
      );
    }catch (e){
      Alert.alert(
        'Error al crear artículo',
        `${e.message}`,
        [{text: 'ok'}]
      );
    }
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]} contentContainerStyle={[styles.contentContainer]}>
      <Text style={[styles.nota, {color: theme.color}]}>NOTA: Los campos con “*” son obligatorios</Text>

      {/* Touchable para agregar imagen */}
      <TouchableOpacity style={styles.camara} onPress={() => pickImage()}>
        <Text style={styles.botonCamara} ></Text>
        <MaterialIcons name="add-a-photo" size={35} color="grey" />
      </TouchableOpacity>

      {/* Mostrar imagen una vez sea seleccionada */}
      {imageUri!=null?
        <Image source={{uri:imageUri}} style={styles.circuloImagen}/>
        :
        <View style={styles.circulo}>
          <Ionicons name="cube-outline" size={100} style={[{color: theme.icon}]}/>
        </View>
      }

      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder={props.route.params.productInfo.nombreArticulo} onChangeText={handleNombre} value={articulo.nombreArticulo}/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder={props.route.params.productInfo.descArt} onChangeText={handleDesc} value={articulo.descArt}/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder={String(props.route.params.productInfo.precio)} onChangeText={handlePrecio} value={articulo.precio} keyboardType = 'numeric'/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder={String(props.route.params.productInfo.cantidad)} onChangeText={handleCant} value={articulo.cantidad} keyboardType = 'numeric'/>
      <TextInput style={[styles.input, {color:theme.color, borderColor:theme.color}]} placeholderTextColor={"#858585"} placeholder={String(props.route.params.productInfo.cantidadCrit)} onChangeText={handleCrit} value={articulo.cantidadCrit} keyboardType = 'numeric'/>
      <Text style={[styles.text, {color: theme.text2}]}>Cuando este articulo llegue a la cantidad critica, se le notificará</Text>

      <Text style={[styles.eti, {color: theme.text2} ]}>Etiqueta (opcional)</Text>
      <SelectList 
        data={etiquetas}
        setSelected={setSelected}
        dropdownTextStyles={[styles.opc, {color:theme.color}]}
        boxStyles={{width:333,marginLeft:30}}
        dropdownStyles={{width:333,marginLeft:30}}
        inputStyles={[styles.select, {color:theme.color}]}
        placeholder={props.route.params.productInfo.etiqueta}
      />

      <Text style={[styles.eti, {color: theme.text2} ]}>Grupo (opcional)</Text>
      <SelectList 
        data={grupos}
        setSelected={setSelected2}
        dropdownTextStyles={[styles.opc, {color:theme.color}]}
        boxStyles={{width:333,marginLeft:30}}
        dropdownStyles={{width:333,marginLeft:30}}
        inputStyles={[styles.select, {color:theme.color}]}
        placeholder={props.route.params.productInfo.grupo}
      />

      <TouchableOpacity title='GUARDAR' onPress={()=>updateArticulo()} style={styles.guardar}>
        <Text style={styles.Tguardar}>Guardar</Text>
      </TouchableOpacity>

    </ScrollView>
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
  camara:{
    position:'absolute',
    zIndex:1,
    justifyContent:'center',
		alignItems:'center',
    marginTop: "34.5%",
    marginLeft: "45%",
  },
  botonCamara:{
    position:'absolute',
    zIndex:-1,
    backgroundColor:"#dcdcdc",
    borderColor:"#bebebe",
    borderWidth:1,
    width:50,
    height:50,
    borderRadius:100,
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
  circuloImagen:{
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

  },
  contentContainer: {
		paddingBottom: 30
  }
});
