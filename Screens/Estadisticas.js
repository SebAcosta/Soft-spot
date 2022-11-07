import { StyleSheet, Text, View } from 'react-native';
import Header from '../components/header2'


export default function Estadisticas() {
	return (
		<View style={styles.container}>
			<Header productInfo={'Estadísticas'}/>
			<Text>Pantalla estadísticas</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {

	},
});
