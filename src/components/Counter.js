import React, {useState} from "react";
import styled from "styled-components/native";
import {Text} from "react-native";

const CounterContainer = styled.View`
  flex-direction: row;
  border-radius: 15px;
  border: 1px solid black;
`;
const CounterButton = styled.TouchableOpacity`
    margin: 0 10%;
`;
const CounterText = styled.Text`
  font-size: 40px;
`;

const Counter = () => {
    const [count, setCount] = useState(1);
    return (
        <CounterContainer>
            <CounterButton title='-1' onPress={() => setCount(count - 1)}>
                <CounterText>-</CounterText>
            </CounterButton>
            <Text style={{fontSize:25}}>{count+'개'}</Text>
            <CounterButton title='+1' onPress={() => setCount(count + 1)}>
                <CounterText>+</CounterText>
            </CounterButton>
        </CounterContainer>
    );
};

export default Counter;
