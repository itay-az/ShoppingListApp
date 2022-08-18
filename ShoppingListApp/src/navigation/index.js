import { createStackNavigator } from "@react-navigation/stack";

import Home from '../screens/Home';
import ShoppingListDetails from "../screens/ShoppingListDetails";
import AddList from '../screens/AddList';
import AddItem from "../screens/AddItem";

const ShoppingListNavigator = createStackNavigator();

export const ShoppingListStack = () => {
    return (
        <ShoppingListNavigator.Navigator>
            <ShoppingListNavigator.Screen name="Home" component={Home} />
            <ShoppingListNavigator.Screen name="AddList" component={AddList} />
            <ShoppingListNavigator.Screen name="ShoppingListDetails" component={ShoppingListDetails} />
            <ShoppingListNavigator.Screen name="AddItem" component={AddItem} />
        </ShoppingListNavigator.Navigator>
    )
}