import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import Counter from "./Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderDetail from "./OrderDetail";
import { NavigationContainer } from "@react-navigation/native";
import {Alert} from "react-native";

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

const Cart = ({ navigation }) => {
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
    } //?????? ??? ????????? ???
    console.log("Done.");
  };

  const deleteCartList = async () => {
    try {
      await AsyncStorage.removeItem("cartList");
      console.log("????????? ??????");
      navigation.pop(1);
      navigation.navigate("Cart");
      Alert.alert("??????","??????????????? ???????????????.",[{text:"??????"}])
    } catch (e) {
      console.error(e);
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
        <NullCart>??????????????? ????????? ????????????.</NullCart>
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
                <CartMenu>{`${menu.name} ${menu.count}???`}</CartMenu>
                <CartPrice>
                  {menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  ???
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
        }}
      >
        <ResetText>???????????? ?????????</ResetText>
      </ResetCartButton>

      {list}
      <OrderButtonContainer>
        <OrderButton>
          {/*?????? ???????????? ??????*/}
          {/*?????? ????????? ???????????? ?????????*/}
          <OrderButtonText>
            ???????????? ({" "}
            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}??? )
          </OrderButtonText>
        </OrderButton>
      </OrderButtonContainer>
    </Container>
  );
};
export default Cart;
