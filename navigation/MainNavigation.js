import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigation from "./TabNavigation"

const MainNavigation = createStackNavigator({
    TabNavigation
});

export default createAppContainer(MainNavigation);