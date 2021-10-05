import React, {useContext, useEffect, useState} from "react";
import styled from 'styled-components/native';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigation from "./navigations/Stack";
import {APIProvider} from "./contexts";
import {useLoading} from "./splashScreen/useLoading";

import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchPost} from "./login/postSignIn";

const Container = styled.View`
  flex: 1;
`;

const App = () => {
    // const {appIsReady, isLoggedIn} = loading();
    // console.log("가져온 isLoggedIn:",isLoggedIn,"\n")


    return (
            <APIProvider>
                <NavigationContainer>
                    <StackNavigation/>
                </NavigationContainer>
            </APIProvider>
    );
}


export default App;
