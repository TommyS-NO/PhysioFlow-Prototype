import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import {
	deleteUserAccount,
	auth,
} from "../../Services/Firebase/FirebaseConfig";
import { theme } from "../../theme";
import FooterNavigation from "../../Components/FooterNavigation/FooterNavigation";

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

	return (
        <View style={styles.container}>
       
			<View style={styles.textContainer}>
			<Text style={styles.title}>Viktig informasjon om sletting av konto</Text>
			<ScrollView>
			<Text style={styles.header}> Permanent sletting:</Text>
                <Text style={styles.text}>
                   Når du sletter din profil, vil all personlig
                    informasjon, treningshistorikk, og fremskritt bli permanent fjernet.
                    Denne handlingen kan ikke omgjøres.
                </Text>
				<Text style={styles.header}>Data og personvern:</Text>
                <Text style={styles.text}>
                    I tråd med personvernloven, vil all din personlige
                    informasjon bli behandlet konfidensielt og sikkert. Ved sletting av din
                    profil, vil dine data bli slettet fra våre servere i henhold til vår
                    personvernspolicy.
                </Text>
				<Text style={styles.header}>Tilbakemelding:</Text>
                <Text style={styles.text}>
                    Din tilbakemelding er verdifull for oss. Vi setter pris
                    på om du kan dele hvorfor du velger å forlate vår plattform, slik at vi kan
                    fortsette å forbedre vår tjeneste.
                </Text>
                <Text style={styles.warningText}>
                    Vær oppmerksom på at ved å slette din profil vil du miste all din data
                    og historikk. Denne handlingen kan ikke angres.
                </Text>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                    <Text style={styles.deleteButtonText}>Slett Profil</Text>
                </TouchableOpacity>
				</ScrollView>
				</View>
				<FooterNavigation />
        </View>      
		
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
     },
    textContainer: {
        flex: 1, 
        padding: theme.spacing.large,
		margin: 25,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: theme.fontSize.title,
        fontWeight: "bold",
        marginBottom: theme.spacing.medium,
        textAlign: "center",
    },
    header: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: theme.spacing.medium,
    },
    text: {
        fontSize: theme.fontSize.regular,
        color: theme.colors.text,
        marginBottom: theme.spacing.small,
    },
    warningText: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 16,
        color: "#D32F2F",
    },
    deleteButton: {
        backgroundColor: "#D32F2F",
        padding: 15,
        borderRadius: 10,
        marginVertical: 8,
        width: "90%",
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginBottom: theme.spacing.large,
	},
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default DeleteUserScreen;