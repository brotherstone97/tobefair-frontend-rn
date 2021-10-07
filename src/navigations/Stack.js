import React, { useState} from "react";
import {createStackNavigator} from "@react-navigation/stack";

//로그인
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../login/RegisterScreen"

//메인화면
import Home from "../components/Home";
//카테고리
import Category from "../components/Category";
//메뉴 리스트
import RecommendedList from "../components/RecommendedList";
import SetMenuList from "../components/SetMenuList";
import MainMenuList from "../components/MainMenuList";
import DrinkList from "../components/DrinkList";
//메뉴 상세
import MenuDetail from "../components/MenuDetail";
//음성 주문
import VoiceOrder from "../components/VoiceOrder";
//주문 내역
import OrderList from "../components/OrderList";
import OrderDetail from "../components/OrderDetail";
import Splash from "../splashScreen/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchPost} from "../login/postSignIn";
//장바구니
import Cart from "../components/Cart";

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
                <Stack.Navigator
                    initialRouteName={"Splash"}
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#008577",
                        },
                        headerTitleStyle: {
                            color: "#fff",
                            fontSize: 22,
                        },
                        headerTitleAlign: "center",
                        headerBackTitleVisible: true,
                        headerBackTitle: "뒤로가기",
                        headerTintColor: "#fff",
                    }}
                >
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Category"
                        component={Category}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="MenuDetail"
                        component={MenuDetail}
                        options={{
                            headerTitle: "메뉴주문",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="RecommendedList"
                        component={RecommendedList}
                        options={{
                            headerShown: true,
                            headerTitle: "추천메뉴",
                        }}
                    />
                    <Stack.Screen
                        name="SetMenuList"
                        component={SetMenuList}
                        options={{
                            headerShown: true,
                            headerTitle: "세트메뉴",
                        }}
                    />
                    <Stack.Screen
                        name="MainMenuList"
                        component={MainMenuList}
                        options={{
                            headerShown: true,
                            headerTitle: "음식",
                        }}
                    />
                    <Stack.Screen
                        name="DrinkList"
                        component={DrinkList}
                        options={{
                            headerShown: true,
                            headerTitle: "음료",
                        }}
                    />
                    <Stack.Screen
                        name="OrderList"
                        component={OrderList}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="OrderDetail"
                        component={OrderDetail}
                        options={{
                            headerTitle: "주문내역 상세",
                            headerShown: true,
                        }}
                    />
                    <Stack.Screen
                        name="VoiceOrder"
                        component={VoiceOrder}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name="Cart"
                        component={Cart}
                        options={{
                            headerTitle: "장바구니",
                            headerShown: true,
                        }}
                    />
                </Stack.Navigator>
    );
};

export default StackNavigation;
