import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const logUserIn = () => {
        try{
          AsyncStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        }catch(e){
          console.log(e);
        }
      };
      
    const logUserOut = () => {
      try{
        AsyncStorage.setItem("isLoggedIn", "false");
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
  const isLoggedIn = useContext(AuthContext);
  console.log(isLoggedIn);
  return isLoggedIn;
};

export const useLogIn = () => {
  const {logUserIn} = useContext(AuthContext);
  return;
};

export const useLogOut = () => {
  const {logUserOut} = useContext(AuthContext);
  return;
};
