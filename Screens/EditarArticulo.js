import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

const EditarArticulo = (props) => {
  const {productInfo} = props.route.params
  return (
    <View style={styles.container}>
      <View style={styles.imagen}>
        <Image source={{ uri: productInfo.img }} style={styles.image} />
      </View>
      <Text>Nombre: {productInfo.nombre}</Text>
      {productInfo.presen&&<Text>Presentación: {productInfo.presen}</Text>}
      <Text>Cantidad: {productInfo.cantidad}</Text>
      <Text>Cantidad crítica: {productInfo.min}</Text>
      <Text>Etiquetas: {productInfo.etiquetas}</Text>
    </View>
  );
}

export default EditarArticulo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
});
