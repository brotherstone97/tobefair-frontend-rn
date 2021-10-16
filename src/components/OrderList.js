import React, {useContext, useState} from "react";
import styled from "styled-components/native";
import APIContext from "../contexts";
import {View} from "react-native";

const Container = styled.View`
  background-color: #f0f0f0;
  padding-top: 2%;
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
  margin-bottom: 3%;
`;
const OrderText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 2%;
  margin-left: 5%;
  margin-bottom: 2%;
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
    return (
        <Container>
            {/*<TopContainer>*/}
            {/*<HomeButton*/}
            {/*    onPress={() => {*/}
            {/*        navigation.navigate("Home")*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <HomeText>처음으로 돌아가기</HomeText>*/}
            {/*</HomeButton>*/}
            {/*</TopContainer>*/}
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
                    const menuCount = filteredOrderMenus.length;

                    console.log('filteredOrderMenus": ', filteredOrderMenus)


                    let filteredMenus = filteredOrderMenus.map(filteredOrderMenu => {
                        return data?.menus.filter(menu => {
                            if (menu['id'] !== filteredOrderMenu['menu']) return false;
                            return true;
                        });
                    })[0][0];
                    //주문시간 처리
                    const orderDateObj = new Date(order["order_date"]);
                    const orderDate = `${orderDateObj.getFullYear()}년 ${orderDateObj.getMonth() + 1}월 ${orderDateObj.getDate()}일 ${orderDateObj.getHours()}시 ${orderDateObj.getMinutes()}분`
                    return (
                        <OrderContainer key={order['id']}
                                        onPress={() => {
                                            //주문내역 상세 네비게이션
                                            navigation.navigate("OrderDetail", {
                                                'orderDate': orderDate,
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
                            {menuCount === 1 && (
                                <>
                                    <OrderMenu
                                        key={filteredOrderMenus[0]['id']}>
                                        {`${filteredMenus['name']} ${filteredOrderMenus[0]['count']}개 ${filteredMenus['price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</OrderMenu>
                                    <OrderMenu
                                        style={{textAlign: 'right', fontSize: 15, color: '#008577'}}>자세히</OrderMenu>
                                </>
                            )}

                            {menuCount > 1 && (
                                <>
                                    <View style={{flexDirection: 'row'}}>
                                        <OrderMenu
                                            key={filteredOrderMenus[0]['id']}>
                                            {`${filteredMenus['name']} ${filteredOrderMenus[0]['count']}개 ${filteredMenus['price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`}</OrderMenu>
                                        <OrderMenu>{'\t'}외 {menuCount - 1}건</OrderMenu>
                                    </View>
                                    <OrderMenu
                                        style={{textAlign: 'right', fontSize: 15, color: '#008577',}}>자세히</OrderMenu>
                                </>
                            )}
                        </OrderContainer>
                    );
                })}
            </BottomContainer>
        </Container>
    );
};
export default OrderList;
