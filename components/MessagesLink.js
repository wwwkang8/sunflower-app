import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React from "react";
import { withNavigation } from '@react-navigation/compat';
import styled from "styled-components";

const Container = styled.TouchableOpacity`

`;

const Text = styled.Text`

`;

const [navigation] = useNavigation();

const messageNav = withNavigation(({ navigation }) => (
    <Container onPress={() => navigation.navigate("MessageNavigation")}>
        <Text>Messages</Text>
    </Container>
));

export  default messageNav;




// export default withNavigation(
//     ({ navigation }) => (
//         <Container onPress={() => navigation.navigate("MessageNavigation")}>
//             <Text>Messages</Text>
//         </Container>
// ));