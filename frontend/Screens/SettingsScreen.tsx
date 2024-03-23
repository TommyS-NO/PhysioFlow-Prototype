import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Navigation/navigationTypes";
import {
	subscribeToUserProfile,
	updateUserProfile,
	auth,
} from "../Services/Firebase/firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "../Styles/Settings_Style";

type SettingsNavigationProp = StackNavigationProp<
	RootStackParamList,
	"SettingsScreen"
>;

type UserProfile = {
	weight: string;
	height: string;
	age: string;
	gender: string;
};

const SettingsScreen: React.FC = () => {
	const navigation = useNavigation<SettingsNavigationProp>();
	const [userProfile, setUserProfile] = useState<UserProfile>({
		weight: "",
		height: "",
		age: "",
		gender: "",
	});
	const [isEditing, setIsEditing] = useState<keyof UserProfile | null>(null);
	const editingValueRef = useRef<string>("");

	useEffect(() => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			const unsubscribe = subscribeToUserProfile(userId, (data) => {
				setUserProfile({
					weight: data.weight || "",
					height: data.height?.toString() || "",
					age: data.age || "",
					gender:
						data.gender === "male"
							? "mann"
							: data.gender === "female"
							  ? "kvinne"
							  : "ikke oppgitt",
				});
			});
			return () => unsubscribe();
		}
	}, []);

	const handleUpdate = (field: keyof UserProfile) => {
		const userId = auth.currentUser?.uid;
		if (userId) {
			updateUserProfile(userId, { [field]: editingValueRef.current }).then(
				() => {
					setIsEditing(null);
					Alert.alert("Oppdatering", "Dine endringer er lagret.");
				},
			);
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

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={require("../Assets/Robot_1.png")}
					style={styles.profileImage}
				/>
				<TouchableOpacity style={styles.editButton}>
					<Text style={styles.editText}>Endre bilde</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.menuContainer}>
				<EditableField field="weight" value={userProfile.weight} isEditable />
				<EditableField field="height" value={userProfile.height} isEditable />
				<EditableField field="age" value={userProfile.age} isEditable={false} />
				<EditableField
					field="gender"
					value={userProfile.gender}
					isEditable={false}
				/>

				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("FocusScreen")}
				>
					<Text style={styles.menuText}>Endre fokusområder</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.menuItem, styles.deleteButton]}
					onPress={() => navigation.navigate("DeleteUserScreen")}
				>
					<Text style={styles.deleteButtonText}>Slett profil</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};



export default SettingsScreen;
