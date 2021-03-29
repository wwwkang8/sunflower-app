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
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import {FACEBOOK_APP_ID, GOOGLE_APP_IOS_CLIENTID, GOOGLE_APP_ANDROID_CLIENTID} from "../../secret";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

const FBContainer = styled.View`
    padding-top: 25px;
    border-top-width: 1px;
    border-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
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

    const FBLogin = async() => {
        try {
            await Facebook.initializeAsync({
              appId: FACEBOOK_APP_ID,
            });
            setLoading(true);

            /** facebook api 호출하여 이메일, 비밀번호 입력 후 타입, 토큰을 반환 받는다. */
            const {
              type,
              token,
              expirationDate,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                
              /**  반환받은 토큰을 이용하여 로그인 유저의 정보를 조회 */
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`);
              const data = await response.json();

              Alert.alert('Logged in!', `Hi ${data.first_name}!`);

              /** facebook api로 부터 받은 로그인 정보 */
              const { email, first_name, last_name } = data;
              
              updateFormData(email, first_name, last_name);

              setLoading(false);

            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
    };

    const GoogleLogin = async () => {
        try {
            setLoading(true);
            const result = await Google.logInAsync({
              iosClientId: GOOGLE_APP_IOS_CLIENTID,
              androidClientId: GOOGLE_APP_ANDROID_CLIENTID,
              scopes: ['profile', 'email']
            });
        
            if (result.type === 'success') {
                const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                                        headers: { Authorization: `Bearer ${result.accessToken}` },
                                    });
              const {email, family_name, given_name, id, name} = await user.json();

              updateFormData(email, given_name, family_name);
              
            } else {
              return { cancelled: true };
            }
          } catch (e) {
            return { error: true };
          }finally{
              setLoading(false);
          }
    };

    const updateFormData = (email, first_name, last_name) => {
        emailInput.setValue(email);
        firstNameInput.setValue(first_name);
        lastNameInput.setValue(last_name);
        const [userName] = email.split("@");
        userNameInput.setValue(userName);
    }


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
        <>
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
                    <FBContainer>
                        <AuthButton 
                            loading={false} 
                            onPress={FBLogin} 
                            text="Connect Facebook" />
                        <AuthButton 
                            loading={false} 
                            onPress={GoogleLogin} 
                            text="Connect Google" />
                    </FBContainer>
                        
                </View>
            </TouchableWithoutFeedback>
            
        </>
    )
    
};

