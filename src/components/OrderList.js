import React, { useContext } from "react";
import styled from "styled-components/native";
import APIContext from "../contexts";

const Container = styled.View`
  background-color: #f0f0f0;
  padding-top: 10%;
  flex: 1;
`;
const TopContainer = styled.View`
  background-color: #f0f0f0;
  flex: 1;
`;
const HomeButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #5d8c87;
`;
const HomeText = styled.Text`
  color: white;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 27px;
`;
const BottomContainer = styled.ScrollView`
  flex: 5;
`;
const OrderText = styled.Text`
  font-weight: bold;
  font-size: 19px;
  padding-top: 8%;
  padding-bottom: 2%;
  margin-left: 5%;
`;
const OrderContainer = styled.TouchableOpacity`
  background-color: white;
  border-radius: 5px;
  height: 130px;
  padding: 2%;
  margin: 0 3%;
  margin-top: 3%;
`;
const OrderId = styled.Text`
  color: gray;
  font-size: 17px;
  font-weight: bold;
`; //줄은 메뉴 이름 넣고 맞춰야 함
const OrderDate = styled.Text`
  color: gray;
  font-size: 17px;
  font-weight: bold;
`;

const OrderList = ({ navigation }) => {
  const data = useContext(APIContext);
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
        <OrderText>*주문내역*</OrderText>
      </TopContainer>
      <BottomContainer>
        {data?.orders.map((order) => {
          return (
            <OrderContainer key={order['id']}>
              <OrderId>
                주문번호: {order["id"]}
                {"\n"}
              </OrderId>
              <OrderDate>주문시간: {order["order_date"]}</OrderDate>
               <OrderDate>주문</OrderDate>
            </OrderContainer>
          );
        })}
      </BottomContainer>
    </Container>
  );
};
export default OrderList;
