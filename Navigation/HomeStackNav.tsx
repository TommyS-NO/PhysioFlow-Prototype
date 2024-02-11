import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";

const HomeStack = createStackNavigator();

const HomeStackNav = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Hjem" component={HomeScreen} />
          

        </HomeStack.Navigator>
    )
};

export default HomeStackNav;