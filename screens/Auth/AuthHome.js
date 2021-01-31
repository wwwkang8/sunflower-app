import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

export default ({navigation}) => (
    <View>
        <Text>Auth Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Go to Sign Up</Text>
        </TouchableOpacity>
    </View>
);