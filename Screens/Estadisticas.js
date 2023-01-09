import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Dimensions } from "react-native";
import Header from '../components/header2'
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
	backgroundGradientFrom: "#FFFFFF",
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: "#FFFFFF",
	backgroundGradientToOpacity: 0.5,
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

const data = {
	labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
	datasets: [
	  {
		data: [20, 45, 28, 80, 99, 43],
		color: (opacity = 1) => `rgba(242,50,50, ${opacity})`, // optional
		strokeWidth: 2 // optional
	  }
	],
	//legend: ["Rainy Days"] // optional
};
const data3 = {
	labels: ["Sabritas", "Peñafiel", "Emperador", "Takis", "Coca-Cola", "Pepsi"],
	datasets: [
	  {
		data: [20, 45, 28, 80, 99, 43],
		color: (opacity = 1) => `rgba(242,50,50, ${opacity})`, // optional
		strokeWidth: 2 // optional
	  }
	],
	//legend: ["Rainy Days"] // optional
};

const data2 = [
	{
	  name: "Estante 1",
	  population: 215,
	  color: "rgba(131, 167, 234, 1)",
	  legendFontColor: "#7F7F7F",
	  legendFontSize: 15
	},
	{
	  name: "Estante 2",
	  population: 28,
	  color: "#F00",
	  legendFontColor: "#7F7F7F",
	  legendFontSize: 15
	},
	{
	  name: "Estante 3",
	  population: 5,
	  color: "red",
	  legendFontColor: "#7F7F7F",
	  legendFontSize: 15
	},
	{
	  name: "Estante 4",
	  population: 85,
	  color: "green",
	  legendFontColor: "#7F7F7F",
	  legendFontSize: 15
	},
	{
	  name: "Estante 5",
	  population: 119,
	  color: "rgb(0, 0, 255)",
	  legendFontColor: "#7F7F7F",
	  legendFontSize: 15
	}
  ];

const screenWidth = Dimensions.get("window").width*.95;
const screenWidth2 = Dimensions.get("window").width*.90;

export default function Estadisticas() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			<View style={styles.ingresos}>
				<Text style={styles.ing}>Ingresos actuales</Text>
				<Text style={styles.dinero}>$500,000.00</Text>
			</View>
			<View style={styles.line}>
				<LineChart
					data={data}
					width={screenWidth}
					height={220}
					chartConfig={chartConfig}
				/>
			</View>
			<View style={styles.botones}>
				<View style={styles.boton}>
					<Text style={styles.btn}>S</Text>
				</View>
				<View style={styles.boton}>
					<Text style={styles.btn}>M</Text>
				</View>
				<View style={styles.botonAct}>
					<Text style={styles.btnAct}>A</Text>
				</View>
			</View>
			<View style={styles.sub}>
				<Text style={styles.subTxt}>Categoría</Text>
			</View>
			<View style={styles.pie}>
				<PieChart
					data={data2}
					width={screenWidth}
					height={250}
					chartConfig={chartConfig}
					accessor={"population"}
					backgroundColor={"transparent"}
					paddingLeft={"20"}
					center={[10, 0]}
					absolute
				/>
			</View>
			<View style={styles.botones}>
				<View style={styles.boton}>
					<Text style={styles.btn}>Etiqueta</Text>
				</View>
				<View style={styles.botonAct}>
					<Text style={styles.btnAct}>Grupo</Text>
				</View>
			</View>
			<View style={styles.sub}>
				<Text style={styles.subTxt}>Productos</Text>
			</View>
			<View style={styles.bar}>
				<BarChart
					style={graphStyle}
					data={data3}
					width={screenWidth2}
					height={270}
					yAxisLabel="$"
					chartConfig={chartConfig}
					verticalLabelRotation={30}
				/>
			</View>
			<View style={styles.botones}>
				<View style={styles.botonAct}>
					<Text style={styles.btnAct}>Más</Text>
				</View>
				<View style={styles.boton}>
					<Text style={styles.btn}>Menos</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor:'white',
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
		marginBottom:10
	},
	contentContainer: {
		paddingBottom: 30
	  }
});
