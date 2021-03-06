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
    //contextAPI?????? in order to get menu
    const data = useContext(APIContext);

    //STT
    //STT????????????
    const [recordResults, setRecordResults] = useState([]); //????????? ?????????
    const [isListening, setIsListening] = useState(false); //?????? ??? ??????

    const [isOrderMenu, setIsOrderMenu] = useState(false); //?????? ????????????

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
            //?????? ?????? ????????? + ????????? ?????????
            const prevMenus = JSON.parse(await AsyncStorage.getItem('cartList'));
            //????????? ?????????=> orderMenus
            if (prevMenus && prevMenus.length) {
                console.log("?????? ??????======", prevMenus)
                //?????? ????????? ?????? ??????
                nextMenus = [...prevMenus, ...orderMenus];
            } else {
                //?????? ????????? ?????? ??????
                nextMenus = orderMenus;
            }
            console.log("?????? ?????? ??????", nextMenus);
            await AsyncStorage.setItem('cartList', JSON.stringify(nextMenus));
        } catch (e) {
            console.error("error!!!:", e)
        }
    }

    //NLP?????? ?????? ??? result??????
    const [result, setSentence] = useNLP()
    console.log("result : ", result)
    const _handleSentenceChange = _sentence => {
        setSentence(_sentence);
    }

    //[????????????, ????????????]
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
            {/*<Text>????????? ?????? ?????????</Text>*/}
            {/*<TextInput*/}
            {/*    label="??????"*/}
            {/*    placeholder='??????'*/}
            {/*    onChangeText={_handleSentenceChange}*/}
            {/*/>*/}
            {/*{result?.menu.map(menu => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            <Text style={{fontWeight: 'bold'}}>??????:{menu}*/}
            {/*            </Text>*/}
            {/*        </>*/}
            {/*    )*/}
            {/*})}*/}
            {/*{result?.count.map(count => {*/}
            {/*    return (*/}
            {/*        <>*/}
            {/*            <Text style={{fontWeight: 'bold'}}>??????:{count}*/}
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
                        Alert.alert("??????",
                            `${orderMenus.length}??? ?????????\n??????????????? ?????? ???????????????.`,
                            [{
                                text: "??????", onPress: async () => {
                                    await addCart(orderMenus);
                                    console.log('orderMenus: ', orderMenus)
                                    navigation.navigate("Cart")
                                }
                            }],
                        )
                    }
                    }>
                    ???????????? ??????
                </AddCartText>
            </AddCart>

            <TopContainer style={{borderWidth: 1, borderColor: "#00574b"}}>
                {/*isListening????????? ???????????????*/}
                {/*!isListening&&result?????? ??????*/}
                {(orderMenus.length && isOrderMenu) ?
                    orderMenus.map(menu => {
                        return (
                            <>
                                <MenuContainer key={menu.id}>
                                    <MenuName>
                                        <Text>{menu.name}{'\n\n'}</Text>
                                        <MenuPrice>
                                            {`${menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???`}
                                        </MenuPrice>
                                        <Count>
                                            {'\t\t\t'}{menu.count}???
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
                                        {`${menu["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???`}
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
                        <SwitchText style={{fontSize: 16, fontWeight: 'bold', color: 'grey'}}>?????? ?????? ??????</SwitchText>
                        <Switch disabled={!result}
                                value={isOrderMenu}
                                onValueChange={_handleToggleChange}/>
                        <SwitchText style={{fontSize: 16, fontWeight: 'bold'}}>????????? ?????? ??????</SwitchText>
                    </SwitchContainer>
                    <OrderContainer>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>??? ?????? ??? ???????????? ????????? ???????????? ???{'\n'} '?????? ?????? ??????' ????????? ??????
                            ??????????????????</Text>
                    </OrderContainer>
                    {/*???????????? ??????*/}
                    <VoiceButton onPress={toggleListening}>
                        <VoiceButtonText>
                            {isListening ? "?????? ?????? ???" : "?????? ?????? ??????"}
                        </VoiceButtonText>
                    </VoiceButton>
                </VoiceContainer>
            </BottomContainer>
        </Container>
    );
}
export default VoiceOrder;

