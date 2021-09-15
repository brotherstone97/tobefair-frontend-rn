import React from "react";
import styled from 'styled-components/native';
// import Button from './components/Button'
// import CategoryScreen from "./components/CategoryScreen";
import {NavigationContainer} from "@react-navigation/native";
import StackNavigation from "./navigations/Stack";

const Container = styled.View`
  flex: 1;
`;

const App = () => {
    return (
        // <Container>
        //     <Button/>
        //     {/*<CategoryScreen/>*/}
        // </Container>
        <NavigationContainer>
            <StackNavigation/>
        </NavigationContainer>
    );
}


export default App;
