import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Message from "../screens/Messages/Message";
import Messages from "../screens/Messages/Messages";

const MessageTab = createStackNavigator();

export default () => {
    return (
        <MessageTab.Navigator>
            <MessageTab.Screen name="Message" component={Message} />
            <MessageTab.Screen name="Messages" component={Messages} />
        </MessageTab.Navigator>
    );
};

