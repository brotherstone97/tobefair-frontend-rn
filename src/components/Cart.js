import React, { useContext, useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import Counter from "./Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderDetail from "./OrderDetail";
import { NavigationContainer } from "@react-navigation/native";

const Container = styled.View`
  background-color: #f0f0f0;
  padding-top: 2%;
  flex: 1;
`;
const ResetCartButton = styled.TouchableOpacity`
  background-color: #008577;
  align-items: center;
  border-radius: 5px;
  margin-left: 55%;
  margin-right: 3%;
  margin-bottom: 2%;
`;
const ResetText = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 5%;
`;
const ListContainer = styled.ScrollView`
  flex: 9;
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
const NullContainer = styled.View`
  flex: 9;
  align-items: center;
  justify-content: center;
`;
const NullCart = styled.Text`
  color: gray;
  font-weight: bold;
  font-size: 25px;
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
const OrderButtonContainer = styled.View`
  flex: 1;
  background-color: #f0f0f0;
`;
const OrderButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 5px;
  margin: 0% 3%;
  align-items: center;
  justify-content: center;
`;
const OrderButtonText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: white;
  padding: 3%;
`;

const Cart = ({navigation}) => {
  const [count, setCount] = useState(1);
  const [cartList, setCartList] = useState([]);
  let totalPrice = 0;

  // const [totalPrice, setTotalPrice] = useState(0);
  const getData = (count) => {
    setCount(count);
  };

  const getCartList = async () => {
    try {
      const itemsFromStorage = JSON.parse(
        await AsyncStorage.getItem("cartList")
      );
      setCartList(itemsFromStorage);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch the data from storage");
    } //아예 안 나오는 듯
    console.log("Done.");
  };

  const deleteCartList = async () => {
    try {
      await AsyncStorage.removeItem("cartList");
      console.log("비우기 성공");
    } catch (e) {
      console.error(e);
      alert("Failed to fetch the data from storage");
    }

    console.log("Done.");
  };
  useEffect(() => {
    getCartList();
  }, []);

  let list = null;
  if (!cartList) {
    list = (
      <NullContainer>
        <NullCart>장바구니에 물건이 없습니다.</NullCart>
      </NullContainer>
    );
  } else {
    list = (
      <ListContainer>
        {cartList.map((menu) => {
          totalPrice += menu.price;
          return (
            <CartContainer key={menu.id}>
              <TextContainer>
                <CartMenu>{`${menu.name} ${menu.count}개`}</CartMenu>
                <CartPrice>
                  {menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </CartPrice>
              </TextContainer>
              <CartImage source={{ uri: menu["image"] }} />
              {/*<CounterContainer>*/}
              {/*    <Counter count={count} getData={getData}/>*/}
              {/*</CounterContainer>*/}
            </CartContainer>
          );
        })}
      </ListContainer>
    );
  }

  return (
    <Container>
      <ResetCartButton
        onPress={() => {
          deleteCartList();
          navigation.pop();
          navigation.navigate("Cart");
          alert("장바구니를 비웠습니다.")
        }}
      >
        <ResetText>장바구니 비우기</ResetText>
      </ResetCartButton>

      {list}
      <OrderButtonContainer>
        <OrderButton>
          {/*주문 페이지로 이동*/}
          {/*주문 이후엔 장바구니 비우기*/}
          <OrderButtonText>
            주문하기 ({" "}
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 )
          </OrderButtonText>
        </OrderButton>
      </OrderButtonContainer>
    </Container>
  );
};
export default Cart;
