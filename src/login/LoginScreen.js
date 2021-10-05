import React, {useRef, useState} from "react";
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {TextInput} from "react-native-paper"
import styled from "styled-components/native/dist/styled-components.native.esm";

import {fetchPost} from "./postSignIn";

const SignInButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 15px;
  padding: 6%;
  margin-top: 15%;
  margin-right: 2%;
`;
const SignUpButton = styled.TouchableOpacity`
  background-color: #5d8c87;
  border-radius: 15px;
  padding: 6%;
  margin-top: 15%;
`;

const LoginScreen = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const ref = useRef('');

    const _handlePhoneChange = _phone => {
        setPhone(_phone);
    };
    const _handlePinChange = _password => {
        setPassword(_password);
    };

    const _onSubmit = async () => {
        //검증 완료 되면 home으로 아니면 오류 메시지 출력
        // if (){
        //     alert('입력된 비밀번호가 일치하지 않습니다.')
        // }else {
        //비동기함수 호출 땐 await키워드 안써주면 promise가 리턴됨.
        if ((await fetchPost(phone, password)) === true) {
            navigation.navigate("Home");
        } else {
            alert('휴대폰번호 혹은 비밀번호가 일치하지 않습니다.')
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                marginBottom: '10%',
            }}>로그인
            </Text>
            <TextInput
                label="휴대폰번호"
                placeholder={'휴대폰번호'}
                onChangeText={_handlePhoneChange}
                onSubmitEditing={() => {
                    ref.current.focus();
                }}
                keyboardType={'number-pad'}
                returnKeyType={'next'}
                returnKeyLabel={'다음'}
                maxLength={11}
                style={styles.textInput}
            />
            <TextInput
                ref={ref}
                label="비밀번호 4자리"
                secureTextEntry={true}
                placeholder={'비밀번호 4자리'}
                onChangeText={_handlePinChange}
                keyboardType={'number-pad'}
                returnKeyType={'send'}
                returnKeyLabel={'로그인'}
                maxLength={4}
                onSubmitEditing={_onSubmit}
                style={styles.textInput}
            />
            <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: '10%'
            }}>최초 로그인 시 다음부터는 자동 로그인됩니다.</Text>
            <View style={styles.button}>
            <SignInButton onPress={_onSubmit}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>로그인</Text>
            </SignInButton>
            <SignUpButton onPress={() => {navigation.navigate("RegisterScreen")}}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>회원가입</Text>
            </SignUpButton>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#eaeaea',
        width: "80%",
        borderBottomWidth: 1,
        paddingLeft: '10%',
        paddingTop: '5%',
        paddingBottom: '5%',
        color: '#000',
        fontSize: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#eaeaea',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button:{
        flexDirection: "row",
    }
})
export default LoginScreen;
