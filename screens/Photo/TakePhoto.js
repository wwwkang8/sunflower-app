import * as React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import UploadPhoto from "./UploadPhoto";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const TakePhoto = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate("UploadPhoto")}>
      <Text>Take</Text>
    </TouchableOpacity>
  </View>
);

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator headerMode="none" mode="modal">
    <Stack.Screen name="TakePhoto" component={TakePhoto} />
    <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
  </Stack.Navigator>
);