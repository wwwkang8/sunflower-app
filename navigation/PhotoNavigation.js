import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTab = createMaterialTopTabNavigator();

export default () => {
    return(
        <PhotoTab.Navigator tabBarPosition={"bottom"}>
            <PhotoTab.Screen name="SelectPhoto" component={SelectPhoto} />
            <PhotoTab.Screen name="TakePhoto" component={TakePhoto} />
        </PhotoTab.Navigator>
    );
};

