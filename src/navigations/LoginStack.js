import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../login/RegisterScreen"

const Stack = createStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="RegisterScreen"
        >
            <Stack.Screen name={"RegisterScreen"}
                          component={RegisterScreen}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"LoginScreen"}
                          component={LoginScreen}
                          options={{headerShown: false}}
            />
        </Stack.Navigator>

    )
}

export default LoginStack;
