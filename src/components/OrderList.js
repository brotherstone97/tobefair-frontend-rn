import React, {useContext, useState} from "react";
import styled from "styled-components/native";
import APIContext from "../contexts";
import {Text} from "react-native";

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
  height: auto;
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
const OrderMenu = styled.Text`
  color: gray;
  font-size: 17px;
  font-weight: bold;
`;

const OrderList = ({navigation}) => {
    const data = useContext(APIContext);
    //too many re-renders...오류 때문에  state사용 x
    //여러 메뉴를 시켰을 경우 한개만 시켰을 때랑 화면출력 시 차이를 두기 위해 다음 변수를 추가하여 이용.
    let prevFilteredOrderMenu = 0;
    let overlapCount = 0;

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
                {data?.orders.map(order => {
                    //각 order테이블의 id에 맞는 Payment,Branch,OrderMenu 필터링
                    let filteredPayment = data?.payments.filter(filteredPayment => {
                        if (order['payment'] !== filteredPayment['id']) return false;
                        return true;
                    });
                    let filteredBranch = data?.branches.filter(filteredBranch => {
                        if (order['branch'] !== filteredBranch['id']) return false;
                        return true;
                    });
                    let filteredOrderMenus = data?.orderMenus.filter(orderMenu => {
                        if (order['id'] !== orderMenu['order']) return false;
                        return true;
                    });
                    //order_menu테이블의 menu속성과 menu테이블의 id속성이 일치하는 menu테이블의 값들만 필터링하고 그 결과물을 렌더해줌. (선언)
                    let printOrderMenu = filteredOrderMenus.map(filteredOrderMenu => {
                        let filteredMenus = data?.menus.filter(menu => {
                            if (menu['id'] !== filteredOrderMenu['menu']) return false;
                            return true;
                        });
                        return (
                            <>
                                {
                                    filteredMenus.map(filteredMenu => {
                                        if (prevFilteredOrderMenu === filteredOrderMenu['order']) {
                                            overlapCount++;
                                        }
                                        prevFilteredOrderMenu = filteredOrderMenu['order'];
                                        return (
                                            <>
                                                {/* overlapCount < 1 일때 렌더*/}
                                                {overlapCount === 0 && (
                                                    <OrderMenu key={filteredMenu['id']}>
                                                        {`${filteredMenu['name']} ${filteredOrderMenu['count']}개 ${filteredMenu['price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</OrderMenu>)}
                                                {/* overlapCount > 1 일때 즉,주문한 메뉴가 여러개일 때 렌더*/}
                                                {overlapCount !== 0 && (<OrderMenu
                                                    style={{textAlign: 'center', fontSize: 25}}>⋮</OrderMenu>)}
                                            </>
                                        );
                                    })
                                }
                            </>);
                    })
                    //주문시간 처리
                    const orderDateObj = new Date(order["order_date"]);
                    const orderDate = `${orderDateObj.getFullYear()}년 ${orderDateObj.getMonth() + 1}월 ${orderDateObj.getDate()}일 ${orderDateObj.getHours()}시 ${orderDateObj.getMinutes()}분`
                    return (
                        <OrderContainer key={order['id']}
                                        onPress={() => {
                                            //주문내역 상세 네비게이션
                                            navigation.navigate("OrderDetail", {
                                                'orderDate': orderDate,
                                                // 'orderMenus': filteredMenus, //orderDetail에서 map함수로 하나하나 추출하자
                                                'orderNo': order['id'],
                                                'orderBranch': filteredBranch[0],
                                                'amount': filteredPayment[0]['total_amount'],
                                                'payment_method': filteredPayment[0]['payment_method'],
                                            });
                                        }}>
                            <OrderId>
                                주문번호: {order["id"]}
                                {"\n"}
                            </OrderId>
                            <OrderDate>주문시간: {orderDate} {"\n"}</OrderDate>
                            {/*주문한 메뉴 출력(호출)*/}
                            {printOrderMenu}
                        </OrderContainer>
                    );
                })}
            </BottomContainer>
        </Container>
    );
};
export default OrderList;
