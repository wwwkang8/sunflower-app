import React, { useContext } from "react";
import { View } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import TabNavigation from "../navigation/TabNavigation";


export default () => {
    /** 초기 페이지를 로그인으로 보여주기 위해서 isLoggedIn=false로 세팅 */
    //const isLoggedIn = useIsLoggedIn();
    const isLoggedIn = false;

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