import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn: isLoggedInProp, children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);

    /** logUserIn 함수 호출 : AsyncStorage에 로그인 여부 true 세팅, hook으로 로그인 여부 true 세팅 */
    const logUserIn = async (token) => {
      console.log("Token : "+token);
        try{
          await AsyncStorage.setItem("isLoggedIn", "true");
          await AsyncStorage.setItem("jwt", token);
          setIsLoggedIn(true);
        }catch(e){
          console.log(e);
        }
      };
      
    /** logUserOut 함수 호출 : AsyncStorage에 로그인 여부 false 세팅, hook으로 로그인 여부 false 세팅 */
    const logUserOut = async () => {
      try{
        await AsyncStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
      }catch(e){
        console.log(e);
      }
    };


      return (
            <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}} >
              {children}
            </AuthContext.Provider>
      );
};

export const useIsLoggedIn = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const {logUserIn} = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const {logUserOut} = useContext(AuthContext);
  return logUserOut;
};
