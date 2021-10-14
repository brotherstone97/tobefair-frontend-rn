import React from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from '../../assets/tobefairLogo.jpg'


const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
const LogoContainer = styled.View`
  flex: 1;
  margin-top: 10%;
  margin-bottom: 25%;
`;
const HomeLogo = styled.Image`
  flex: 1;
  resize-mode: contain;
`;
const ButtonContainer = styled.View`
  flex:3;
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
      <LogoContainer>
        <HomeLogo source={Logo} />
      </LogoContainer>
      <ButtonContainer>
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
      </ButtonContainer>
    </Container>
  );
};
export default Home;
