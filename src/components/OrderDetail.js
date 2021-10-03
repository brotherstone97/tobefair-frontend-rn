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
    const filteredOrderMenus = data?.orderMenus.filter(orderMenus => {
        if (orderMenus['order'] !== route.params.orderNo) return false;
        return true;
    });
    // 필터링한 OrderMenu의 개수를 변수에 저장하고 메뉴별 주문개수 출력(ln:73)할 때 활용할 예정
    let countOrderMenus = filteredOrderMenus.length
    //최종 주문한 메뉴를 array finalOrderMenu에 할당
    let finalOrderMenus = filteredOrderMenus.map(filteredOrderMenu => {
        //각 요소의 menu에 해당하는 value를 targetMenuId로 정의
        const {menu: targetMenuId} = filteredOrderMenu;
        //menu.id와 orderMenu의 id 즉,targerMenuId와 같은 메뉴를 menuInfo객체에 저장
        const menuInfo = data?.menus.find(menu => menu.id === targetMenuId);
        // ...연산자: spread연산자 object를 펼쳐주는 기능 filteredOrderMenu와 menuInfo를 return하는 객체의 요소 하나에 들어가게함.
        //...연산자를 안쓰면 원본을 직접 건드리게 되므로 위험.
        return {
            ...filteredOrderMenu,
            menuInfo
        }
    });

    console.log(finalOrderMenus)
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
                //finalOrderMenu객체의 키 값 id, count, menuInfo에 해당하는 value를 다음 객체에 저장함
                const {id, count, menuInfo} = finalOrderMenu;
                const {name} = menuInfo;
                return (
                    //주문한 메뉴 출력
                    <OrderMenu
                        key={id}>
                        {`${name} ${count}개`}
                    </OrderMenu>
                )
            })}
            <Hr
                text="주문 정보"
                lineColor="lightgray"
                width={1}
                textStyles={{color: "lightgray", fontSize: 20}}
                hrStyles={{margin: 10}}
                hrPadding={50}
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
