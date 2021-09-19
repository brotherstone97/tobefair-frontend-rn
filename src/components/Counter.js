import React, {useState} from "react";
import styled from "styled-components/native";
import {Text} from "react-native";

const CounterContainer = styled.View`
  flex-direction: row;
  border-radius: 15px;
  border: 1px solid black;
  align-items: center;
  margin: 0 15%;
`;
const CounterButton = styled.TouchableOpacity`
    flex: 1;
    margin: 0 10%;
    align-items: center;
`;
const CounterText = styled.Text`
  font-size: 40px;
`;

const Counter = () => {
    const [count, setCount] = useState(1);
    return (
        <CounterContainer>
            <CounterButton title='-1' onPress={() => {if (count > 1) setCount(count - 1)}}>
                {/*이미지 대체 고려*/}
                <CounterText>-</CounterText>
            </CounterButton>
            <Text style={{fontSize:25}}>{count+'개'}</Text>
            <CounterButton title='+1' onPress={() => setCount(count + 1)}>
                {/*이미지 대체 고려*/}
                <CounterText>+</CounterText>
            </CounterButton>
        </CounterContainer>
    );
};

export default Counter;