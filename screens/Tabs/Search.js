import React, { useEffect } from "react";
import styled from "styled-components";
import { TextInput, Text, View } from "react-native";

const Input = styled.TextInput``;

export default function Search({ navigation }){
  const SearchBox = () => (
    <TextInput style={{backgroundColor: "white"}}
              placeholderTextColor="black"
              placeholder="Search photos" />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    })
  }, []);

  return(
    <View 
      style={{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

      }}
      />
  )
}