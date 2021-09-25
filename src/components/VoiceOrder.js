import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import * as Speech from "expo-speech";
import Voice, {
    SpeechResultsEvent,
    SpeechErrorEvent,
} from "@react-native-voice/voice";
import {Text} from "react-native";

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

const VoiceOrder = ({navigation}) => {
    // STT상태변수
    const [results, setResults] = useState([]); //인식한 텍스트
    const [isListening, setIsListening] = useState(false); //녹음 중 여부

    // STT useEffect()
    useEffect(() => {
        function onSpeechResults(e: SpeechResultsEvent) {
            setResults(e.value ?? []);
        }

        function onSpeechError(e: SpeechErrorEvent) {
            console.error(e);
        }

        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        return function cleanup() {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    async function toggleListening() {
        try {
            console.log(isListening);
            if (isListening) {
                await Voice.stop();
                setIsListening(false);
            } else {
                setResults([]);
                await Voice.start("ko-KR");
                setIsListening(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    // TTS기능
    const speak = () => {
        const thingToSay = "주문하실 메뉴의 이름을 말씀해주세요.";
        Speech.stop();
        Speech.speak(thingToSay, {pitch: 0.9, rate: 0.8});
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
                {console.log(results)}
                {results.map((result, index) => {
                    return <Text key ={`result-${index}`}>{result}</Text>;
                })}
                <VoiceContainer>
                    <OrderContainer/>
                    {/*음성입력 버튼*/}
                    <VoiceButton onPress={toggleListening}>
                        <VoiceButtonText>
                            {isListening ? "음성 입력 중" : "음성 입력"}
                        </VoiceButtonText>
                    </VoiceButton>
                </VoiceContainer>
            </BottomContainer>
        </Container>
    );
};

export default VoiceOrder;
