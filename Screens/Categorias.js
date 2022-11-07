import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header'

export default function Categorias() {
	return (
		<View style={styles.container}>
			<Header productInfo={'Categorías'}/>
			<Text>Pantalla categorias</Text>
		</View>
  );
}

const styles = StyleSheet.create({
	container: {

	},
});
