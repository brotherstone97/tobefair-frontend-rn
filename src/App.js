import React, {useContext, useEffect, useState} from "react";
import {StatusBar} from "react-native";
import styled from 'styled-components/native';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigation from "./navigations/Stack";
import {APIProvider} from "./contexts";


const Container = styled.View`
  flex: 1;
`;

const App = () => {
    // const {appIsReady, isLoggedIn} = loading();
    // console.log("가져온 isLoggedIn:",isLoggedIn,"\n")


    return (
            <APIProvider>
                <StatusBar backgroundColor="#00574b"/>
                <NavigationContainer>
                    <StackNavigation/>
                </NavigationContainer>
            </APIProvider>
    );
}


export default App;
