import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		paddingHorizontal: 10,
		backgroundColor: '#fff',
		flex: 1,
	},
	searchBar: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},
sessionItem: {
		flexDirection: 'row',
		margin: 5,
		alignItems: 'center',
		paddingVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	sessionImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	sessionInfo: {
		flex: 1,
		marginLeft: 10,
	},
	sessionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	sessionDescription: {
		fontSize: 16,
		color: '#666',
	},
	addButton: {
		padding: 10,
	},
});