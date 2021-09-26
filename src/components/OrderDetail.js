import React, {useContext} from "react";
import styled from "styled-components/native";
import Hr from "react-native-hr-component";
import APIContext from "../contexts";

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
const OrderMenu = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: #000;
`;
const InfoText = styled.Text`
  text-align: left;
  font-size: 20px;
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

const OrderDetail = ({route}) => {
    const data = useContext(APIContext);
    console.log('route=============================================================', route)
    const filteredOrderMenus = data?.orderMenus.filter(orderMenus => {
        if (orderMenus['order'] !== route.params.orderNo) return false;
        return true;
    });
    //최종 주문한 메뉴를 array finalOrderMenu에 할당
    let finalOrderMenus = filteredOrderMenus.map(filteredOrderMenu => {
        return data?.menus.filter(menu => {
            if (menu['id'] !== filteredOrderMenu['menu']) return false;
            return true;
        });
    });
    return (
        <Container>
            <Hr
                text="주문 메뉴"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={50}
            />
            {finalOrderMenus.map((finalOrderMenu) => {
                return (
                    //주문한 메뉴 출력
                    <OrderMenu>{`${finalOrderMenu[0]['name']} ${filteredOrderMenus[0]['count']}개`}</OrderMenu>
                )
            })}
            <Hr
                text="주문 정보"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={100}
            />
            <InfoText>{`주문시간 : ${route.params.orderDate}`}</InfoText>
            <InfoText>{`주문번호 : ${route.params.orderNo}`}</InfoText>
            <InfoText>{`주문지점 : ${route.params.orderBranch['branch_name']}`}</InfoText>
            <Hr
                text="결제 정보"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={100}
            />
            <InfoText>{`결제 금액 : ${route.params.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</InfoText>
            <InfoText>{`결제 수단 : ${route.params.payment_method}`}</InfoText>
        </Container>
    );
};

export default OrderDetail;
