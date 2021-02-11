import React from "react";
import { createAppContainer } from "react-navigation";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Tabs/Home";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Search from "../screens/Tabs/Search";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
    <Stack.Navigator>
        <Stack.Screen
            name={name}
            component={initialRoute}
            options={{...customConfig}}
            />
    </Stack.Navigator>
);



export default () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home">
                    {() =>
                        stackFactory(Home, "Home", {
                            title: "Home",
                            headerRight: () => (
                                <TouchableOpacity>
                                    <Text>Hello</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </Tab.Screen>
                <Tab.Screen name="Profile">
                    {() => 
                        stackFactory(Profile, "Profile", {
                            title: "Profile"
                        })

                    }
                </Tab.Screen>
                <Tab.Screen 
                        name="Add" 
                        component={View} 
                        listeners={({ navigation }) => ({
                            tabPress: e => {
                                e.preventDefault();

                                navigation.navigate("PhotoNavigation");
                            }
                        })}
                />
                <Tab.Screen name="Search">
                    {() =>
                        stackFactory(Search, "Search", {
                            title: "Search"
                        })

                    }
                </Tab.Screen>
                <Tab.Screen name="Notifications">
                    {() =>
                        stackFactory(Notifications, "Notifications", {
                            title: "Notifications"
                        })

                    }
                </Tab.Screen>
            </Tab.Navigator>
    );
};

//export default createAppContainer(TabNavigation);
       
