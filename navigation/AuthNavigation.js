import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import Confirm from "../screens/Auth/Confirm";

const AuthNavigation = createStackNavigator(
        {
                AuthHome, 
                Signup, 
                Login, 
                Confirm
        },
        {
                //headerMode: "none"
        }
);

export default createAppContainer(AuthNavigation);

