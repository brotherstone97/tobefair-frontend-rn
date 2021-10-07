import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/native";
import Counter from "./Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.ScrollView`
  background-color: #f0f0f0;
  padding-top: 5%;
  flex: 1;
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

const Cart = () => {
    const [count, setCount] = useState(1);
    const [cartList, setCartList] = useState([]);
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
    }
    useEffect(() => {
        getCartList();
    }, [])

    return (
        <Container>
            {
                cartList.map(menu => {
                    return (
                        <CartContainer key={menu.id}>
                            <TextContainer>
                                <CartMenu>{`${menu.name} ${menu.count}개`}</CartMenu>
                                <CartPrice>{menu.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</CartPrice>
                            </TextContainer>
                            <CartImage source={{uri:menu['image']}}/>
                            {/*<CounterContainer>*/}
                            {/*    <Counter count={count} getData={getData}/>*/}
                            {/*</CounterContainer>*/}
                        </CartContainer>
                    )
                })
            }
        </Container>
    );
};
    export default Cart;
