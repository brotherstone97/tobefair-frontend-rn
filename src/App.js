import React, {useContext} from "react";
import styled from 'styled-components/native';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigation from "./navigations/Stack";
import {APIProvider} from "./contexts";

const Container = styled.View`
  flex: 1;
`;

const App = () => {
    return (
        <APIProvider>
            <NavigationContainer>
                <StackNavigation/>
            </NavigationContainer>
        </APIProvider>
    );
}


export default App;
