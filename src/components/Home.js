import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const HomeLogo = styled.View`
  margin-bottom: 30%;
`;
const HomeText = styled.Text`
  text-align: center;
  font-size: 50px;
  font-weight: bold;
`;
const OrderButtonContainer = styled.View`
  margin-top: -20%;
  flex-direction: row;
`;
const OrderButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 15px;
  padding: 90px 40px;
  margin: 10px;
`;
const ListButton = styled.TouchableOpacity`
  background-color: #5d8c87;
  border-radius: 15px;
  padding: 40px 90px;
  margin: 30px 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 45px;
  font-weight: bold;
`;

const Home = ({ navigation }) => {
  return (
    <Container>
      <HomeLogo>
        <HomeText>이거{"\n"}주세요</HomeText>
      </HomeLogo>
      <OrderButtonContainer>
        <OrderButton
          onPress={() => {
            navigation.navigate("Category");
          }}
        >
          <ButtonText>
            {`일반
주문`}
          </ButtonText>
        </OrderButton>
        <OrderButton onPress={() => {
            navigation.navigate("VoiceOrder");
          }}>
          <ButtonText>
            {`음성
주문`}
          </ButtonText>
        </OrderButton>
      </OrderButtonContainer>
      <ListButton onPress={() => {
            navigation.navigate("OrderList");
          }}>
        <ButtonText>주문내역</ButtonText>
      </ListButton>
    </Container>
  );
};
export default Home;
