import React, { useContext } from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";


export default () => {
    const isLoggedIn = useIsLoggedIn();

    return (
        <View style={{ flex: "1"}}>
            {isLoggedIn ? (
                <TabNavigation />
            ) : (
                <AuthNavigation />
            )}
        </View>
    );
};