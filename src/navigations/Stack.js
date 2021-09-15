import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Category from "../components/Category";
import Home from "../components/Home"
import MenuDetail from "../components/MenuDetail";

const Stack = createStackNavigator();
const StackNavigation = () => {
    return(
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle:{
                backgroundColor: '#008577',
            },
            headerTitleStyle:{
              color:'#fff', fontSize:22
            },
            headerTitleAlign:'center',
            headerBackTitleVisible:true,
            headerBackTitle:'뒤로가기',
            headerTintColor:'#fff',
        }}>
            <Stack.Screen name={'Home'} component={Home} options={{headerShown:false}}/>
            <Stack.Screen name={'Category'} component={Category} options={{headerShown:false}}/>
            <Stack.Screen name={'MenuDetail'} component={MenuDetail}
                          options={{headerShown:true,
                          // headerTitle:"이곳에 메뉴 이름 들어감"
                          }
                          }/>
        </Stack.Navigator>
    );
};

export default StackNavigation;
