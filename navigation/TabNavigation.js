import React from "react";
import { createAppContainer } from "react-navigation";
import { View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute) => createStackNavigator({initialRoute});

export default () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" 
                            component={Home} />
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
       
