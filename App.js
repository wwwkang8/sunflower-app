import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from 'expo-asset';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const preLoad = async () => {
    try{
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/instagram_logo.png")]);
      setLoaded(true);
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <View>
      <Text>Open up App  . start working with your app</Text>
    </View>
  ) : (
    <AppLoading />
  );
}
