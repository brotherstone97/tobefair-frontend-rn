import React, {useContext, useEffect, useState} from "react";
import useNLP from "../hooks/useNLP";
import {
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Switch,
    TouchableOpacity,
    TouchableOpacityComponent, Alert
} from "react-native";

import * as Speech from "expo-speech";
import styled from "styled-components/native";

import Voice, {
    SpeechResultsEvent,
    SpeechErrorEvent,
} from "@react-native-voice/voice";

import APIContext from "../contexts";
import {Search, MenuContainer, MenuImage, MenuName, MenuPrice} from '../styles/MenuListStyle';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Container = styled.View`
  background-color: white;
  padding-top: 10%;
  flex: 1;
`;
const TopContainer = styled.ScrollView`
  margin-left: 1%;
  margin-right: 1%;
  background-color: white;
  flex: 16;
`;
const BottomContainer = styled.View`
  background-color: white;
  flex: 10;
  justify-content: center;
`;
const OrderContainer = styled.View`
  text-align: center;
  align-items: center;
  justify-content: center;
  flex: 2;
`;
const VoiceContainer = styled.View`
  flex: 1;
  justify-content: center;
`;
const SwitchContainer = styled.View`
  margin-top: 3%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
const SwitchText = styled.Text`
  font-size: 18px;
  color: #008577;
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
  font-size: 40px;
  font-weight: bold;
`;
const AddCart = styled.TouchableOpacity`
  background-color: #e71468;
  flex: 1;
  border-radius: 10px;
  padding: 3% 0%;
  margin: -5% 5% 5% 50%;
  justify-content: center;
`;
const AddCartText = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
const Count = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;


const VoiceOrder = ({navigation}) => {
    //contextAPI사용 in order to get menu
    const data = useContext(APIContext);

    //STT
    //STT상태변수
    const [recordResults, setRecordResults] = useState([]); //인식한 텍스트
    const [isListening, setIsListening] = useState(false); //녹음 중 여부

    const [isOrderMenu, setIsOrderMenu] = useState(false); //토글 상태변수

    const _handleToggleChange = value => {
        console.log("Toggle value: ", value)
        setIsOrderMenu(value);
    }

    useEffect(() => {
        function onSpeechResults(e: SpeechResultsEvent) {
            setRecordResults(e.value ?? []);
        }

        function onSpeechError(e: SpeechErrorEvent) {
            console.error(e);
        }
        _handleSentenceChange(null);


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
                _handleSentenceChange(recordResults[0]);
                setRecordResults([]);
                await Voice.start("ko-KR");
                setIsListening(true);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const addCart = async orderMenus => {
        // await AsyncStorage.removeItem('cartList');
        let nextMenus = [];
        try {
            //기존 카트 물품들 + 새로운 물품들
            const prevMenus = JSON.parse(await AsyncStorage.getItem('cartList'));
            //새로운 물품들=> orderMenus
            if (prevMenus && prevMenus.length) {
                console.log("기존 카트======", prevMenus)
                //기존 카트가 있는 경우
                nextMenus = [...prevMenus, ...orderMenus];
            } else {
                //기존 카트가 없는 경우
                nextMenus = orderMenus;
            }
            console.log("카트 저장 성공", nextMenus);
            await AsyncStorage.setItem('cartList', JSON.stringify(nextMenus));
        } catch (e) {
            console.error("error!!!:", e)
        }
    }

    //NLP모듈 접근 및 result반환
    const [result, setSentence] = useNLP()
    console.log("result : ", result)
    const _handleSentenceChange = _sentence => {
        setSentence(_sentence);
    }

    //[마운틴듀, 감지튀김]
    const [orderMenus, setOrderMenus] = useState([]);
    useEffect(() => {
        if (result) {
            const _orderMenus = [];
            for (let i = 0; i < result.menu.length; i++) {
                _orderMenus[i] = data?.menus.find(menu => menu.name === result.menu[i])
                if (_orderMenus[i])
                    _orderMenus[i] = {
                        ..._orderMenus[i],
                        count: result.count[i]
                    };
            }
            setOrderMenus(_orderMenus);
        }
    }, [result])

    return (
        <Container>
            {/*<Text>문장을 입력 하세요</Text>*/}
            {/*<TextInput*/}
            {/*    label="문장"*/}
            {/*    placeholder='문장'*/}
            {/*    onChangeText={_handleSentenceChange}*/}
            {/*/>*/}
            {/*{result?.menu.map(menu => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            <Text style={{fontWeight: 'bold'}}>메뉴:{menu}*/}
            {/*            </Text>*/}
            {/*        </>*/}
            {/*    )*/}
            {/*})}*/}
            {/*{result?.count.map(count => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            <Text style={{fontWeight: 'bold'}}>수량:{count}*/}
            {/*            </Text>*/}
            {/*        </>*/}

            {/*    )*/}
            {/*})}*/}
            {/*{recordResults.map((result, index) => {*/}
            {/*    return <Text key ={`result-${index}`}>{result}</Text>;*/}
            {/*})}*/}
            {/*{orderMenus.length &&*/}
            <AddCart>
                <AddCartText
                    onPress={async () => {
                        Alert.alert("알림",
                            `${orderMenus.length}개 항목이\n장바구니에 추가 되었습니다.`,
                            [{
                                text: "확인", onPress: async () => {
                                    await addCart(orderMenus);
                                    console.log('orderMenus: ', orderMenus)
                                    navigation.navigate("Cart")
                                }
                            }],
                        )
                    }
                    }>
                    장바구니 추가
                </AddCartText>
            </AddCart>

            <TopContainer style={{borderWidth: 1, borderColor: "#00574b"}}>
                {/*isListening역으로 바꿔놔야함*/}
                {/*!isListening&&result해도 안됨*/}
                {(orderMenus.length && isOrderMenu) ?
                    orderMenus.map(menu => {
                        return (
                            <>
                                <MenuContainer key={menu.id}>
                                    <MenuName>
                                        <Text>{menu.name}{'\n\n'}</Text>
                                        <MenuPrice>
                                            {`${menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                                        </MenuPrice>
                                        <Count>
                                            {'\t\t\t'}{menu.count}개
                                        </Count>
                                    </MenuName>
                                    <MenuImage source={{uri: menu.image}}/>
                                </MenuContainer>
                            </>)
                    })
                    :
                    data?.menus.map(menu => {
                        return (
                            <MenuContainer key={menu.id}>
                                <MenuName>
                                    {menu.name}{'\n\n'}
                                    <MenuPrice>
                                        {`${menu["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                                    </MenuPrice>
                                </MenuName>
                                <MenuImage source={{uri: menu['image']}}/>
                            </MenuContainer>
                        )
                    })
                }
            </TopContainer>
            <BottomContainer>
                <VoiceContainer>
                    <SwitchContainer>
                        <SwitchText style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>메뉴 목록 보기</SwitchText>
                        <Switch disabled={!result}
                                value={isOrderMenu}
                                onValueChange={_handleToggleChange}/>
                        <SwitchText style={{fontSize: 16, fontWeight: 'bold'}}>주문한 메뉴 보기</SwitchText>
                    </SwitchContainer>
                    <OrderContainer>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>위 메뉴 중 원하시는 메뉴를 선택하신 후{'\n'} '음성 주문 시작' 버튼을 눌러
                            말씀해주세요</Text>
                    </OrderContainer>
                    {/*음성입력 버튼*/}
                    <VoiceButton onPress={toggleListening}>
                        <VoiceButtonText>
                            {isListening ? "음성 입력 중" : "음성 주문 시작"}
                        </VoiceButtonText>
                    </VoiceButton>
                </VoiceContainer>
            </BottomContainer>
        </Container>
    );
}
export default VoiceOrder;

