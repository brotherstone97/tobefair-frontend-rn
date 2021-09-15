import React from "react";
import styled from 'styled-components/native';

const Container = styled.View`
  flex:1;
  align-items: center;
  justify-content: center;
`;
const OrderButtonContainer = styled.View`
  padding-top: 25px;
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

const Home = ({navigation}) => {
    return (
        <Container>
            <OrderButtonContainer>
                <OrderButton onPress={()=>{navigation.navigate('Category')}}>
                    <ButtonText>
                        {`일반
주문`}
                    </ButtonText>
                </OrderButton>
                <OrderButton>
                    <ButtonText>
                        {`음성
주문`}</ButtonText>
                </OrderButton>
            </OrderButtonContainer>
            <ListButton>
                <ButtonText>
                    주문내역
                </ButtonText>
            </ListButton>
        </Container>
    );
};
export default Home;
