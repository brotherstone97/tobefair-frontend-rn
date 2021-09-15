import React, {useState} from "react";
import styled from 'styled-components/native';
import {Text, StatusBar} from "react-native";
import Hr from "react-native-hr-component";
import Counter from "./Counter";

const Container = styled.View`
  background-color: white;
  padding-top: 10%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MenuImage = styled.Image`
  border:1px solid black;
  width: 80%;
  height: 40%;
`;
const Title = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #000;
`;
const MenuInfo = styled.Text`
  font-size: 25px;
  color: #000;
`;
const AddCartButton = styled.TouchableOpacity`]
  width: 80%;
  margin-top: auto;
  margin-bottom: 5%;
  padding: 2%;
  border-radius: 15px;
  background-color: #008577;
`;
const ButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin: 7%;
`;

const MenuDetail = () => {
    // 상단바 스타일 지정
    // StatusBar.setBackgroundColor("#fff")
    return (
        <Container>
            <MenuImage source={'assets/splash.png'}/>
            <Title>메뉴 이름</Title>
            <Hr text="주의사항" lineColor="lightgray" width={1} textStyles={{color:"lightgray", fontSize:20}} hrStyles={{margin:10}} hrPadding={100}/>
            <MenuInfo>매운 맛이 강해요</MenuInfo>
            <Hr text="수량" lineColor="lightgray" width={1} textStyles={{color:"lightgray", fontSize:20}} hrStyles={{margin:10}} hrPadding={100}/>
            <Counter/>
            <AddCartButton>
                <ButtonText>{`장바구니 추가 \t\t 12,000원`}</ButtonText>
            </AddCartButton>
        </Container>
    );
}

export default MenuDetail;

