import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Category from "../components/Category";
import Home from "../components/Home";
import MenuList from "../components/MenuList";

const Stack = createStackNavigator();
const StackNavigation = () => {
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name={'Home'} component={Home} options={{headerShown:false}}/>
            <Stack.Screen name={'Category'} component={Category} options={{headerShown:false}}/>
            <Stack.Screen name={'MenuList'} component={MenuList} options={{headerShown:true}}/>
        </Stack.Navigator>
    );
};

export default StackNavigation;