import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";


const ProfileStack = createStackNavigator(); 

const ProfileStackNav = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        </ProfileStack.Navigator>
    )
};

export default ProfileStackNav;