import React, {useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
//import * as Font from 'expo-font';
import {fetchPost} from "../login/postSignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";

//hooks는 반드시 use로 시작해야 한다
const useLoading = () => {
    //isLoggedIn
    //undefined= 로딩 중
    //true= 로그인됨
    //false= 로그인 안됨
    const [isLoggedIn, setIsLoggedIn] = useState();

    useEffect(() => {
        const _prepare= async ()=>{
            const getItemFromStorage= async key=> await AsyncStorage.getItem(key);

            const phone= await getItemFromStorage('phone');
            console.log('onLoading...',phone);

            if(phone){
                const password= await getItemFromStorage('password');

                const loginResult= await fetchPost(phone, password).catch(e=> {
                    //on error
                    console.error(e);
                });

                setIsLoggedIn(loginResult);
            }else{
                setIsLoggedIn(false);
            }
        }
        _prepare();
    }, []);
    return isLoggedIn;
};

export default useLoading;

