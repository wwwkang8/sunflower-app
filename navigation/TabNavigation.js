import React from "react";
import { createAppContainer } from "react-navigation";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Search from "../screens/Search";

const Tab = createBottomTabNavigator();

export default () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen 
                        name="View" 
                        component={View} 
                        listeners={({ navigation, route }) => ({
                            tabPress: e => {
                                e.preventDefault();

                                navigation.navigate("PhotoNavigation");
                            }
                        })}
                />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Notifications" component={Notifications} />
            </Tab.Navigator>
    );
};

//export default createAppContainer(TabNavigation);
       
