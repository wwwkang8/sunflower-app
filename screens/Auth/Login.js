import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

export default () => (
    <View>
        <AuthInput value="" placeholder="Email" keyboardType="email-address" />
        <AuthButton onPress={()=> null} text="Log In" />
    </View>
);

