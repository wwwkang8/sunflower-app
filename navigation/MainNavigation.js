import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";

const MainTab = createStackNavigator();


export default () => {
    return(
        <NavigationContainer headerMode="none" mode="modal">
            <MainTab.Navigator>
                <MainTab.Screen name="TabNavigation" component={TabNavigation} />
                <MainTab.Screen name="PhotoNavigation" component={PhotoNavigation} />
                <MainTab.Screen name="MessageNavigation" component={MessageNavigation} />
            </MainTab.Navigator>
        </NavigationContainer>
    );
};

