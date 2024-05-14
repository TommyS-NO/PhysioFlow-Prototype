import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	Alert,
	ScrollView,
	Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../Navigation/navigationTypes";
import {
	subscribeToUserProfile,
	updateUserProfile,
	auth,
} from "../../Services/Firebase/FirebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "./Settings_Style";
import { signOut } from "firebase/auth";
import FooterNavigation from "../../Navigation/FooterNavigation/FooterNavigation";
import DeleteUserComponent from "./DeleteUserScreen";
import CustomButton from "../../Components/CustomButton/CustomButton";

type SettingsNavigationProp = StackNavigationProp<
	RootStackParamList,
	"SettingsScreen"
>;

type UserProfile = {
	username?: string;
	weight: string | number;
	height: string;
	age: string;
	gender: string;
};

const SettingsScreen: React.FC = () => {
	const navigation = useNavigation<SettingsNavigationProp>();
	const [isProfileVisible, setIsProfileVisible] = useState(false);
	const [isAccountVisible, setIsAccountVisible] = useState(false);

	const [isAboutVisible, setIsAboutVisible] = useState(false);
	const [userProfile, setUserProfile] = useState<UserProfile>({
		username: "",
		weight: "",
		height: "",
		age: "",
		gender: "",
	});

	const [isEditing, setIsEditing] = useState<keyof UserProfile | null>(null);
	const editingValueRef = useRef<string>("");

	const calculateAge = (birthdate: string) => {
		const birthday = new Date(birthdate);
		const today = new Date();
		const thisYear = today.getFullYear();
		const birthYear = birthday.getFullYear();
		const age = thisYear - birthYear;

		if (today < new Date(thisYear, birthday.getMonth(), birthday.getDate())) {
			return age - 1;
		}
		return age;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const unsubscribe = subscribeToUserProfile(userId, (data) => {
				const ageString = data.birthday
					? `${calculateAge(data.birthday)} År`
					: "";
				setUserProfile({
					username: data.username,
					weight: data.weight || "",
					height: data.height?.toString() || "",
					age: ageString,
					gender:
						data.gender === "male"
							? "Mann"
							: data.gender === "female"
							  ? "Kvinne"
							  : "ikke oppgitt",
				});
			});
			return () => unsubscribe();
		}
	}, []);

	const MAX_WEIGHT = 200;
	const MAX_HEIGHT = 205;

	const handleUpdate = (field: keyof UserProfile) => {
		const userId = auth.currentUser?.uid;
		if (userId && field !== "age") {
			let valueToUpdate = editingValueRef.current;

			if (field === "weight" || field === "height") {
				const numValue = parseInt(valueToUpdate, 10);
				if (
					numValue > 0 &&
					(field === "weight" ? numValue <= MAX_WEIGHT : numValue <= MAX_HEIGHT)
				) {
					valueToUpdate = numValue.toString();
				} else {
					Alert.alert(
						"Feil",
						`Angitt verdi er utenfor tillatt rekkevidde for ${field}.`,
					);
					return;
				}
			}

			updateUserProfile(userId, { [field]: valueToUpdate })
				.then(() => {
					setIsEditing(null);
					Alert.alert("Oppdatering", "Dine endringer er lagret.");
				})
				.catch(() => {
					Alert.alert("Feil", "Det oppstod en feil under lagring av data.");
				});
		}
	};

	const startEditing = (field: keyof UserProfile, value: string) => {
		editingValueRef.current = value;
		setIsEditing(field);
	};

	const cancelEditing = () => {
		setIsEditing(null);
	};

	const EditableField = ({
		field,
		value,
		isEditable,
	}: {
		field: keyof UserProfile;
		value: string;
		isEditable: boolean;
	}) => (
		<View style={styles.fieldContainer}>
			<Text style={styles.fieldLabel}>
				{field === "weight"
					? "Vekt"
					: field === "height"
					  ? "Høyde"
					  : field === "age"
						  ? "Alder"
						  : "Kjønn"}
				:
			</Text>
			{isEditing === field ? (
				<TextInput
					style={styles.fieldInput}
					// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
					onChangeText={(text) => (editingValueRef.current = text)}
					defaultValue={value}
					autoFocus={true}
					keyboardType={
						field === "weight" || field === "height" ? "numeric" : "default"
					}
				/>
			) : (
				<Text style={styles.fieldValue}>{value}</Text>
			)}
			{isEditable && isEditing !== field && (
				<TouchableOpacity onPress={() => startEditing(field, value)}>
					<Icon name="pencil-alt" size={20} color="#000" />
				</TouchableOpacity>
			)}
			{isEditing === field && (
				<View style={styles.editingIcons}>
					<TouchableOpacity onPress={() => handleUpdate(field)}>
						<Icon name="check" size={20} color="green" />
					</TouchableOpacity>
					<TouchableOpacity onPress={cancelEditing}>
						<Icon name="times" size={20} color="red" />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
	const NonEditableField = ({
		label,
		value,
	}: {
		label: string;
		value: string;
	}) => (
		<View style={styles.fieldContainer}>
			<Text style={styles.fieldLabel}>{label}</Text>
			<Text style={styles.fieldValue}>{value}</Text>
		</View>
	);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigation.navigate("Front");
		} catch (error) {
			Alert.alert("Feil", `Noe gikk galt under utlogging.: ${error.message}`);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require("../../Assets/Our_team.png")}
				style={styles.imageStyle}
			/>
			<ScrollView>
				<View style={styles.menuContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => setIsProfileVisible(!isProfileVisible)}
					>
						<Text style={styles.buttonText}>Profilinnstillinger</Text>
					</TouchableOpacity>
					{isProfileVisible && (
						<View style={styles.subMenu}>
							<View style={styles.menuContainer}>
								<NonEditableField
									label="Navn:"
									value={userProfile.username || "[Brukernavn]"}
								/>
								<EditableField
									field="weight"
									value={`${userProfile.weight} kg `}
									isEditable
								/>
								<EditableField
									field="height"
									value={`${userProfile.height} cm `}
									isEditable
								/>
								<NonEditableField label="Alder:" value={userProfile.age} />
								<NonEditableField label="Kjønn:" value={userProfile.gender} />
							</View>
						</View>
					)}

					<TouchableOpacity
						style={styles.button}
						onPress={() => setIsAccountVisible(!isAccountVisible)}
					>
						<Text style={styles.buttonText}>Kontoinnstillinger</Text>
					</TouchableOpacity>
					{isAccountVisible && (
						<View style={styles.subMenu}>
							<View style={styles.menuContainer}>
								<NonEditableField
									label="Endring av e-post:"
									value={userProfile.username || "[Brukernavn]"}
								/>
								<NonEditableField
									label="Endring av passord"
									value={userProfile.username || "[Brukernavn]"}
								/>
								<TouchableOpacity
									style={[styles.menuItem, styles.deleteButton]}
									onPress={() => navigation.navigate("DeleteUserScreen")}
								>
									<Text style={styles.deleteButtonText}>Slett profil</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							navigation.navigate("ContactScreen");
						}}
					>
						<Text style={styles.buttonText}>Kontakt oss</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
						<Text style={styles.logoutButtonText}>Logg ut</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<FooterNavigation />
		</View>
	);
};

export default SettingsScreen;
