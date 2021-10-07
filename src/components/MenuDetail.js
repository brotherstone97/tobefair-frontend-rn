import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {Text, StatusBar} from "react-native";
import Hr from "react-native-hr-component";
import Counter from "./Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  background-color: white;
  padding-top: 10%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const MenuImage = styled.Image`
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

const MenuDetail = ({route}) => {
    const [count, setCount] = useState(1);
    const [addedItems, setAddedItems] = useState([]);
    const readItemFromStorage = async () => {
        //AsyncStorage는 string만 취급하기 때문에 객체가 오고갈 땐 변환해준다
        const item = JSON.parse(await AsyncStorage.getItem('cartList'));
        setAddedItems(item);
    };
    useEffect(() => {
        readItemFromStorage();
    }, []);



    const getData = count => {
        setCount(count);
    }

    //다른 페이지에서 장바구니 추가하면 기존 장바구니가 삭제되는 문제 해결해야함
    //복수의 장바구니 항목을 반복문을 통해 모두 표시하는 방법 연구
    const addCart = async value => {
        try {
            let cart;
            // await AsyncStorage.removeItem('cartList')
            if (!addedItems) {
                cart = [value];
            } else {
                cart = [...addedItems, value]
            }
            console.log('cart:', cart)
            setAddedItems(cart)
            await AsyncStorage.setItem('cartList', JSON.stringify(cart))
            console.log("카드 저장 성공")
            console.log(await AsyncStorage.getItem('cartList'))
        } catch (e) {
            console.log(e)
        }
        console.log('Done.')
    }
    return (
        <Container>
            <MenuImage source={{uri: route.params.image}}/>
            <Title>{route.params.name}</Title>
            <Hr
                text="참고사항"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={100}
            />
            <MenuInfo>
                {route.params.menu_info ? route.params.menu_info : "-없음-"}
            </MenuInfo>
            <Hr
                text="수량"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={100}
            />
            <Counter count={count} getData={getData}/>
            <AddCartButton onPress={() => {
                addCart({
                    'name': route.params.name,
                    'count': count,
                    'price': route.params.price * count,
                    'image':route.params.image,
                })
            }}>
                {/*가격을 받아와서 1000단위로 ','표시하기 위한 정규표현식 활용*/}
                <ButtonText>{`장바구니 추가 \t\t ${((route.params.price) * count)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</ButtonText>
            </AddCartButton>
        </Container>
    );
};

export default MenuDetail;
