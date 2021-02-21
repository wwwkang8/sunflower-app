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
import MessagesLink from "../components/MessagesLink";


const Stack = createStackNavigator(); //스택네비게이터 생성
const Tab = createBottomTabNavigator(); // bottom탭네비게이터 생성

/** 하단 탭화면들에 각각의 스택화면을 생성할 수 있도록 설정
 *  하단 탭 : 하단 탭바에 있는 것은 각각의 화면 1개 그 자체이다
 * 하지만 스택화면을 사용하면 하단탭화면 + 그 위에 스택 화면 사용 가능
 * 
 * 기능 : initalRoute, 화면이름, 스크린옵션을 매개변수로 설정하고 stackFactory 함수를 호출하면
 * Stack 화면을 리턴해준다.
 */
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
                            title: "Home"
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
       
