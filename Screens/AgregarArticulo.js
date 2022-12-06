import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableNativeFeedback, View, DatePickerAndroid} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

export default function AgregarArticulo(){
  const [selected, setSelected] = React.useState("Ninguna");
  const data=[
    {Key:'1', value:'1'},
    {Key:'2', value:'2'},
    {Key:'3', value:'3'},
    {Key:'4', value:'4'},
  ];

  return (
    <SafeAreaView>
      <Text style={styles.nota}>NOTA: Los campos con “*” son obligatorios</Text>

      <View style={styles.circulo}>
        <Ionicons name="cube-outline" size={100} color={"white"}/>
      </View>

      <TextInput style={styles.input} placeholder="Nombre*"/>
      <TextInput style={styles.input} placeholder="Descripción"/>
      <TextInput style={styles.input} placeholder="Cantidad"/>
      <TextInput style={styles.input} placeholder="Cantidad critica"/>
      <Text style={styles.text}>Cuando este articulo llegue a la cantidad critica, se le notificará</Text>

      <Text style={styles.eti}>Etiqueta [Opcional]</Text>
      <SelectList 
        data={data}
        setSelected={setSelected}
        dropdownTextStyles={{fontSize:17}}
        boxStyles={{width:333,marginLeft:30}}
        dropdownStyles={{width:333,marginLeft:30}}
        inputStyles={{fontSize:17, marginLeft:-10}}
        placeholder="Ninguna"
      />

      <TouchableNativeFeedback>
        <View style={styles.guardar}>
          <Text style={styles.Tguardar}>GUARDAR</Text>
        </View>
			</TouchableNativeFeedback>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
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
    color:'#808080',
  },
  guardar:{
		backgroundColor:'#77DD77',
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
  }
});
