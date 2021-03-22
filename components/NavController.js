import React, { useContext } from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import TabNavigation from "../navigation/TabNavigation";


export default () => {
    const isLoggedIn = useIsLoggedIn();
    //const isLoggedIn = false;

    return (
        <View style={{ flex: "1"}}>
            {isLoggedIn ? (
                <MainNavigation />
            ) : (
                <AuthNavigation />
            )}
        </View>
    );
};