import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from 'expo-asset';
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo3-cache-persist";
import ApolloClient from "apollo-boost";
import AsyncStorage from "@react-native-community/async-storage";
import apolloClientOptions from "./apollo";
import { ApolloProvider } from "react-apollo-hooks";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try{
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/instagram_logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });
      setLoaded(true);
      setClient(client);
    }catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
        <View>
          <Text>Open up App  . start working with your app</Text>
        </View>
    </ApolloProvider>
    
  ) : (
    <AppLoading />
  );
}
