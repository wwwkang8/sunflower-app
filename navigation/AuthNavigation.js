import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";

const AuthTab = createStackNavigator();

const AuthNavigation = () => {
   return (
        <NavigationContainer>
                <AuthTab.Navigator>
                <AuthTab.Screen name="AuthHome" component={AuthHome} />
                <AuthTab.Screen name="Signup" component={Signup} />
                <AuthTab.Screen name="Login" component={Login} />
                <AuthTab.Screen name="Confirm" component={Confirm} /> 
                </AuthTab.Navigator>
        </NavigationContainer>
   )
};

export default AuthNavigation;

