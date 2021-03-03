import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

export default () => {
    const emailInput = useInput("");

    const handleLogin = () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(value === ""){
            Alert.alert("Email cannot be empty");
        }else if( !value.includes("@") || !value.includes(".")){
            return Alert.alert("Please write an email");
        }else if(!emailRegex.test(value)){
            return Alert.alert("This email is invalid");
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                        {...emailInput} 
                        placeholder="Email" 
                        keyboardType="email-address"
                        returnKeyType="send"
                        onEndEditing={handleLogin}
                        autoCorrect={false} />
                <AuthButton onPress={handleLogin} text="Log In" />
            </View>
        </TouchableWithoutFeedback>
    )
    
};

