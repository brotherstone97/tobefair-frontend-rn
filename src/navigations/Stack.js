import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Category from "../components/Category";
import Home from "../components/Home";
import MenuDetail from "../components/MenuDetail";
import RecommendedList from "../components/RecommendedList";
import SetMenuList from "../components/SetMenuList";
import MainMenuList from "../components/MainMenuList";
import DrinkList from "../components/DrinkList";
import OrderList from "../components/OrderList";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name={"Home"}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Category"}
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"MenuDetail"}
        component={MenuDetail}
        options={{
          headerTitle: "메뉴주문",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={"RecommendedList"}
        component={RecommendedList}
        options={{
          headerShown: true,
          headerTitle: "추천메뉴",
        }}
      />
      <Stack.Screen
        name={"SetMenuList"}
        component={SetMenuList}
        options={{
          headerShown: true,
          headerTitle: "세트메뉴",
        }}
      />
      <Stack.Screen
        name={"MainMenuList"}
        component={MainMenuList}
        options={{
          headerShown: true,
          headerTitle: "음식",
        }}
      />
      <Stack.Screen
        name={"DrinkList"}
        component={DrinkList}
        options={{
          headerShown: true,
          headerTitle: "음료",
        }}
      />
      <Stack.Screen
        name={"OrderList"}
        component={OrderList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
