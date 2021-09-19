import React from "react";
import styled from "styled-components/native";
import * as Speech from "expo-speech";
import { getData } from "../hooks/getData";

const Container = styled.View`
  background-color: white;
  padding-top: 10%;
  flex: 1;
`;
const TopContainer = styled.View`
  background-color: white;
  flex: 1;
`;
const HomeButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #008577;
`;
const HomeText = styled.Text`
  color: white;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 27px;
`;
const BottomContainer = styled.View`
  background-color: white;
  flex: 10;
  justify-content: center;
`;
const OrderContainer = styled.View`
  flex: 6;
`;
const VoiceContainer = styled.View`
  flex: 1;
`;
const VoiceButton = styled.TouchableOpacity`
  background-color: #5d8c87;
  flex: 1;
  border-radius: 15px;
  margin: 5%;
  justify-content: center;
`;
const VoiceButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;

const VoiceOrder = ({ navigation }) => {
  const speak = () => {
    const thingToSay = "주문하실 메뉴의 이름을 말해주세요.";
    Speech.speak(thingToSay, { pitch: 0.9, rate: 0.8 });
  };
  return (
    <Container>
      <TopContainer>
        <HomeButton
          onPress={() => {
            navigation.popToTop();
          }}
        >
          <HomeText>처음으로 돌아가기</HomeText>
        </HomeButton>
      </TopContainer>
      <BottomContainer>
        <VoiceContainer>
          <OrderContainer></OrderContainer>
          <VoiceButton onPress={speak}>
            <VoiceButtonText>음성 입력</VoiceButtonText>
          </VoiceButton>
        </VoiceContainer>
      </BottomContainer>
    </Container>
  );
};

export default VoiceOrder;
