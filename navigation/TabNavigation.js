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
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen 
                    name="Add" 
                    component={View} 
                    listeners={{
                        tabPress: e => {
                          // Prevent default action
                          e.preventDefault();
                          console.log("Add");
                        },
                      }}
            />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Notifications" component={Notifications} />
        </Tab.Navigator>
    </NavigationContainer>
    );
};

//export default createAppContainer(TabNavigation);
       
