import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import { deleteUserAccount, auth } from "../Services/Firebase/firebaseConfig";

type DeleteUserScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"DeleteUserScreen"
>;

const DeleteUserScreen: React.FC = () => {
	const navigation = useNavigation<DeleteUserScreenNavigationProp>();

	const handleDeletePress = () => {
		Alert.alert(
			"Bekreft Sletting",
			"Er du sikker på at du vil slette din profil? Denne handlingen kan ikke angres.",
			[
				{ text: "Avbryt", style: "cancel" },
				{
					text: "Slett",
					onPress: deleteUser,
					style: "destructive",
				},
			],
		);
	};

	const deleteUser = async () => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			try {
				const success = await deleteUserAccount(userId);
				if (success) {
					Alert.alert("Din konto har blitt slettet.");
					navigation.navigate("Front");
				} else {
					Alert.alert("Det oppstod en feil ved sletting av brukeren.");
				}
			} catch (error) {
				console.error("Error deleting user:", error);
				Alert.alert("Det oppstod en feil ved sletting av brukeren.");
			}
		} else {
			Alert.alert("Kunne ikke hente brukerens ID.");
		}
	};

	//Sett opp kulepunkter og hev ut de ulike punktene i hvert avsnitt
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				Permanent sletting: Når du sletter din profil, vil all personlig
				informasjon, treningshistorikk, og fremskritt bli permanent fjernet.
				Denne handlingen kan ikke omgjøres.
			</Text>
			<Text style={styles.text}>
				Alternativer til sletting: Hvis du bare trenger en pause, kan du velge å
				deaktivere din konto midlertidig istedenfor å slette den. Dette gir deg
				fleksibiliteten til å komme tilbake og fortsette der du slapp uten å
				miste din historikk.
			</Text>
			<Text style={styles.text}>
				Data og personvern: I tråd med personvernloven, vil all din personlige
				informasjon bli behandlet konfidensielt og sikkert. Ved sletting av din
				profil, vil dine data bli slettet fra våre servere i henhold til vår
				personvernspolicy. Denne kan du lese mer om her:
			</Text>
			<Text style={styles.text}>
				Tilbakemelding: Din tilbakemelding er verdifull for oss. Vi setter pris
				på om du kan dele hvorfor du velger å forlate FysioGO, slik at vi kan
				fortsette å forbedre vår tjeneste.
			</Text>

			<Text style={styles.warningText}>
				Vær oppmerksom på at ved å slette din profil vil du miste all din data
				og historikk. Denne handlingen kan ikke angres.
			</Text>

			<TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
				<Text style={styles.deleteButtonText}>Slett Profil</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},

	text: {
		marginBottom: 20,
		fontSize: 16,
		color: "black",
		textAlign: "center",
	},
	warningText: {
		marginBottom: 20,
		fontSize: 16,
		color: "#D32F2F",
		textAlign: "center",
	},
	deleteButton: {
		backgroundColor: "#D32F2F",
		padding: 10,
		borderRadius: 5,
	},
	deleteButtonText: {
		color: "white",
		fontWeight: "bold",
	},
});

export default DeleteUserScreen;
