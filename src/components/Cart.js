import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Counter from "./Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { globals } from "react-native/packages/eslint-config-react-native-community";
import OrderDetail from "./OrderDetail";

const Container = styled.ScrollView`
  background-color: #f0f0f0;
  padding-top: 5%;
  flex: 1;
`;
const ResetCartButton = styled.TouchableOpacity`
  background-color: #008577;
`;
const ResetText = styled.Text`
  color: white;
`;
const CartContainer = styled.TouchableOpacity`
  background-color: white;
  border-radius: 5px;
  height: 130px;
  padding: 5%;
  margin: 0 3%;
  margin-bottom: 3%;
  flex-direction: row;
`;
const TextContainer = styled.View`
  flex: 2;
  justify-content: space-between;
`;
const CartMenu = styled.Text`
  color: black;
  font-size: 23px;
  font-weight: bold;
`;
const CartPrice = styled.Text`
  color: black;
  font-size: 23px;
  font-weight: bold;
`;
const NullCart = styled.Text`
  color: black;
`;
const CartImage = styled.Image`
  flex: 1;
  height: 100%;
  justify-content: flex-end;
`;

const CounterContainer = styled.View`
  flex: 3;
  justify-content: flex-end;
  margin-right: -10%;
`;

const PriceContainer = styled.TouchableOpacity`
  background-color: white;
  border-radius: 5px;
  height: 7%;
  padding: 5%;
  margin: 0 3%;
  margin-bottom: 5%;
`;

const OrderButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 5px;
  height: 7%;
  margin: 0% 3%;
  margin-bottom: 15%;
  align-items: center;
  justify-content: center;
`;

const Cart = () => {
  const [count, setCount] = useState(1);
  const [cartList, setCartList] = useState([]);
  let totalPrice = 0;

  // const [totalPrice, setTotalPrice] = useState(0);
  const getData = (count) => {
    setCount(count);
  };

  const getCartList = async () => {
    try {
      const itemsFromStorage = JSON.parse(await AsyncStorage.getItem('cartList'));
      setCartList(itemsFromStorage)
    } catch (e) {
      console.error(e)
      alert('Failed to fetch the data from storage')
    }//아예 안 나오는 듯
    console.log('Done.')
  };

  const deleteCartList = async () => {
    try {
      await AsyncStorage.removeItem('cartList')
      console.log("비우기 성공")
    } catch (e) {
      console.error(e)
      alert('Failed to fetch the data from storage')
    }

    console.log('Done.')
  }
  useEffect(() => {
    getCartList();
  }, [])

  let list = null;
  if (!cartList) {
    list = <NullCart>장바구니에 담긴 물건이 없습니다.</NullCart>;
  } else {
    list = cartList.map(menu => {
      totalPrice += menu.price
      return (
        <CartContainer key={menu.id}>
          <TextContainer>
            <CartMenu>{`${menu.name} ${menu.count}개`}</CartMenu>
            <CartPrice>{menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</CartPrice>
          </TextContainer>
          <CartImage source={{ uri: menu['image'] }} />
          {/*<CounterContainer>*/}
          {/*    <Counter count={count} getData={getData}/>*/}
          {/*</CounterContainer>*/}
        </CartContainer>
      )
    });
  }

  return (
    <Container>
      <ResetCartButton onPress={() => {
        deleteCartList()
      }} >
        <ResetText>
          장바구니 비우기
        </ResetText>
      </ResetCartButton>
      {list}
      <PriceContainer style={{ justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>합계 금액 :
          {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
      </PriceContainer>
      <OrderButton>
        {/*주문 페이지로 이동*/}
        {/*주문 이후엔 장바구니 비우기*/}
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>
          주문하기
        </Text>
      </OrderButton>
    </Container>
  );
};
export default Cart;