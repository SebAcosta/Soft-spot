import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header2'


export default function Productos() {
	return (
		<View style={styles.container}>
			<Header productInfo={'Productos más vendidos'}/>
			<Text>Pantalla productos</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {

	},
});
