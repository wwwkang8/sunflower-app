import React, { useContext } from "react";
import { Text } from "react-native";
import AuthContext, {useIsLoggedIn} from "../AuthContext";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    console.log("NavController isLoggedIn: " + isLoggedIn);
    return <Text>NavController</Text>;
}