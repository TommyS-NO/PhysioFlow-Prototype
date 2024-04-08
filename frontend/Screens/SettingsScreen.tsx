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
import { theme } from "../theme";

type SettingsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SettingsScreen"
>;

type UserProfile = {
  username?: string;
  weight: string;
  height: string;
  age: string;
  gender: string;
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsNavigationProp>();
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
            `Angitt verdi er utenfor tillatt rekkevidde for ${field}.`
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

  return (
    <View style={styles.container}>

<View style={{flex: 1, alignItems: 'center', width: '100%' }}> 

      <View style={styles.imageContainer}>
        <Image
          source={require("../Assets/Robot_1.png")}
          style={styles.profileImage}
        />
      </View>

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
        <TouchableOpacity
          style={[styles.menuItem, styles.deleteButton]}
          onPress={() => navigation.navigate("DeleteUserScreen")}
        >
          <Text style={styles.deleteButtonText}>Slett profil</Text>
        </TouchableOpacity>

    </View>
  );
};

export default SettingsScreen;
