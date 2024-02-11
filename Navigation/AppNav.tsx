import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import AboutScreen from "../Screens/AboutScreen/AboutScreen";

const Tab = createBottomTabNavigator();

const AppNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Hjem" component={HomeScreen} />
            <Tab.Screen name="Profil" component={ ProfileScreen} />
            <Tab.Screen name="Om oss" component={ AboutScreen} />

        </Tab.Navigator>
    );
};

export default AppNav;