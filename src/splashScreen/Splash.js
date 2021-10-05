import {Container} from '../components/MenuListStyle';
import React, {useContext, useEffect, useState} from "react";

import useLoading from "../splashScreen/useLoading";

const Splash = ({navigation}) => {
    const loginState= useLoading();
    useEffect(()=>{
        if(loginState=== undefined)
            //return해줘서 원래대로 렌더되지 않게 막고 loginstate가 true/false가 되면 그 때 렌더될 화면 결정
            return;

        if(loginState){
            //로그인 됨
            navigation.navigate("Home");
        }else{
            //로그인 안됨
            navigation.navigate("LoginScreen");
        }
    }, [loginState])
 //reminder useEffect는 최초 렌더하고 두번째 매개변수에 상태가 변할 때마다 다시 렌더
    return (
        <Container>
            {/* Splash Image */}
        </Container>
    );
};

export default Splash;
