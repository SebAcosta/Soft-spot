import {View, StyleSheet, FlatList, Dimensions, BackHandler } from "react-native";
import Header from '../components/header2'
import GroupCard from '../components/GroupCard';
import {GROUPS} from "../dummy-data/data"


export default function Grupos(props) {
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<View style={styles.listContainer}>
					<FlatList
						data={GROUPS}
						numColumns={1}
						showsVerticalScrollIndicator={false}
						keyExtractor={item => item.id.toString()}
						renderItem= {itemData => (
							<GroupCard {...props} productInfo={itemData.item}/>
						)}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {

	},
});
