import React, { useState } from "react";
import styled from "styled-components/native";
import { Text, StatusBar } from "react-native";
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
  border: 1px solid black;
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
const AddCartButton = styled.TouchableOpacity`
]width: 80%;
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

const MenuDetail = ({ route }) => {
    const [count, setCount] = useState(1);

    const getData = count => {
        setCount(count);
    }
    return (
        <Container>
            <MenuImage source={"assets/splash.png"} />
            <Title>{route.params.name}</Title>
            <Hr
                text="참고사항"
                lineColor="lightgray"
                width={1}
                textStyles={{ color: "lightgray", fontSize: 20 }}
                hrStyles={{ margin: 10 }}
                hrPadding={100}
            />
            <MenuInfo>
                {route.params.menu_info ? route.params.menu_info : "-없음-"}
            </MenuInfo>
            <Hr
                text="수량"
                lineColor="lightgray"
                width={1}
                textStyles={{ color: "lightgray", fontSize: 20 }}
                hrStyles={{ margin: 10 }}
                hrPadding={100}
            />
            <Counter count={count} getData={getData} />
            <AddCartButton>
                {/*가격을 받아와서 1000단위로 ','표시하기 위한 정규표현식 활용*/}
                <ButtonText>{`장바구니 추가 \t\t ${((route.params.price)*count)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</ButtonText>
            </AddCartButton>
        </Container>
    );
};

export default MenuDetail;
