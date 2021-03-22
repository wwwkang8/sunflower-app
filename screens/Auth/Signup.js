import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { CREATE_ACCOUNT, LOG_IN } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

export default ({route, navigation}) => {
    const firstNameInput = useInput("");
    const lastNameInput = useInput("");
    const emailInput = useInput("");
    const userNameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            userName: userNameInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value
        }
    });


    const handleSignup = async () => {
        const { value: email } = emailInput;
        const { value: firstName } = firstNameInput;
        const { value: lastName } = lastNameInput;
        const { value: userName } = userNameInput;

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email === ""){
            Alert.alert("Email cannot be empty");
        }else if( !email.includes("@") || !email.includes(".")){
            return Alert.alert("Please write an email");
        }else if(!emailRegex.test(email)){
            return Alert.alert("This email is invalid");
        }

        if(firstName === ""){
            return Alert.alert("I need your first name");
        }

        if(userName === ""){
            return Alert.alert("Invalid username");
        }

        

        try{
            setLoading(true);
            const {
                data: {createAccount}
            } = await createAccountMutation();

            if(createAccount){
                Alert.alert("Account created. Login now!");
                navigation.navigate("Login", { email });
            }
            
        }catch(e){
            console.log(e);
            Alert.alert("Username already exist.");
            navigation.navigate("Login", { email });
        }finally{
            setLoading(false);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...firstNameInput} 
                    placeholder="First name" 
                    autoCapitalize="words" />
                 <AuthInput 
                    {...lastNameInput} 
                    placeholder="Last name" 
                    autoCapitalize="words" />
                <AuthInput 
                    {...emailInput} 
                    placeholder="Email" 
                    keyboardType="email-address"
                    returnKeyType="send"
                    autoCorrect={false} />
                <AuthInput 
                    {...userNameInput} 
                    placeholder="Username" 
                    autoCorrect={false} />
                <AuthButton onPress={handleSignup} text="Sign up" loading={loading} />
            </View>
        </TouchableWithoutFeedback>
    )
    
};

