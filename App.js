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

  /** loaded의 상태는 디폴트로 false */
  const [loaded, setLoaded] = useState(false);

  /** client의 상태는 디폴트로 null */
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try{
      
      /** Font 클래스를 통해 Ionicon 들을 불러온다. */
      await Font.loadAsync({
        ...Ionicons.font
      });

      /** Asset 클래스는 URL 또는 프로젝트 내부의 자원을 불러온다 */
      await Asset.loadAsync([require("./assets/instagram_logo.png")]);

      /** 메모리상에 cache를 만들기 위해 사용하는 모듈. */
      const cache = new InMemoryCache();

      /** apollo에서 제공해주는 cache를 저장해주고 유지해주는 모듈. */
      await persistCache({
        cache,
        storage: AsyncStorage
      });

      /** Apollo 클라이언트 생성자 호출시에 캐시 객체를 넣어서 생성한다 */
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      /** Font, Asset이 로드가 완료될 경우 useState로 loaded의 상태를 true로 변경 */
      setLoaded(true);

      /** 클라이언트 객체를 세팅 */
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
