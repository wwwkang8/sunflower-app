import React from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import { useState } from "react";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { useLogIn } from "../../AuthContext";

/** View 컴포넌트의 스타일 지정 */
const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1
`;

const Text = styled.Text`

`;

export default ({route, navigation}) => {
    const confirmInput = useInput("");
    const [loading, setLoading] = useState(false);

    const logIn = useLogIn();

    /** confirmSecret 호출 : secret, email을 파라메터로 전송 
     * secret : 사용자가 입력한 secret 값을 사용
     * email : Login.js 화면에서 넘겨준 email을 route 컴포넌트에서 받아온다.
    */
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: confirmInput.value,
            email: route.params.email
        }
    });


    /** Confirm 버튼 클릭시 호출
     * 기능 : 입력받은 secret을 검증 한 후 서버의 confirmSecret을 호출하고 token을 받아온다.
     */
    const handleConfirm = async () => {
        const { value } = confirmInput;
        
        if(value === "" || !value.includes(" ")){
            Alert.alert("Invalid secret");
        }

        try{
            setLoading(true);
            const  {
                data: {confirmSecret}
            } = await confirmSecretMutation();

            if(confirmSecret !== "" || confirmSecret !== false ){
                logIn(confirmSecret);

            }else{
                Alert.alert("Wrong Secret!");
            }

        }catch(e){
            console.log(e);
            Alert.alert("Can't confirm secret");
        }finally{
            setLoading(false);
        }
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                        {...confirmInput} 
                        placeholder="Secret" 
                        returnKeyType="send"
                        onSubmitEditing={handleConfirm}
                        autoCorrect={false} />
                <AuthButton onPress={handleConfirm} text="Confirm" loading={loading} />
            </View>
        </TouchableWithoutFeedback>
    )
    
};

