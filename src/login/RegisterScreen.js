import React, {useState} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";
import {TextInput} from "react-native-paper"
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";
import {useSignUp} from "../hooks/useSignUp";

const StyledButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 15px;
  padding: 8%;
  margin-top: 8%;
`;


const RegisterScreen = ({navigation}) => {

    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [checkPin, setCheckPin] = useState('');
    const [sex, setSex] = useState(true);
    //dropdown state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '남성', value: 'true'},
        {label: '여성', value: 'false'},
    ]);

    const _handlePhoneChange = _phone => {
        setPhone(_phone);
    };
    const _handlePinChange = _pin => {
        setPin(_pin);
    };
    const _handleCheckPinChange = _pin => {
        setCheckPin(_pin);
    };

    const _onSubmit = () => {
        if (pin !== checkPin) {
            alert('입력된 비밀번호가 일치하지 않습니다.')
            console.log('phone:', phone)
            console.log('pin:', pin)
            console.log('checkPin:', checkPin)
        } else {
            //DB CREATE
            // useSignUp('signup');
            console.log('phone:', phone)
            console.log('pin:', pin)
            console.log('checkPin:', pin)
            navigation.navigate("LoginScreen");
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <Text style={{
                fontSize: 40,
                fontWeight: 'bold',
                marginBottom: '10%',
            }}>회원가입
            </Text>
            <TextInput
                label="휴대폰번호"
                placeholder={'휴대폰번호'}
                keyboardType={'number-pad'}
                returnKeyLabel={'다음'}
                maxLength={11}
                onChangeText={_handlePhoneChange}
                // onSubmitEditing={}
                style={styles.textInput}
            />
            <TextInput
                label="비밀번호 4자리"
                secureTextEntry={true}
                right={<TextInput.Icon name="eye"/>}
                placeholder={'비밀번호 4자리'}
                onChangeText={_handlePinChange}
                keyboardType={'number-pad'}
                returnKeyType={'send'}
                returnKeyLabel={'로그인'}
                maxLength={4}
                //로그인 버튼 눌렀을 때
                onSubmitEditing={() => {
                    // navigation.navigate("Home");
                }}
                style={styles.textInput}
            />
            <TextInput
                label="비밀번호 확인"
                secureTextEntry={true}
                right={<TextInput.Icon name="eye"/>}
                placeholder={'비밀번호 확인'}
                onChangeText={_handleCheckPinChange}
                keyboardType={'number-pad'}
                returnKeyType={'send'}
                returnKeyLabel={'로그인'}
                maxLength={4}
                //로그인 버튼 눌렀을 때
                onSubmitEditing={_onSubmit}
                style={styles.textInput}
            />
            <DropDownPicker
                placeholder="성별을 선택해주세요."
                defaultIndex={'남성'}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeItem={sex => {
                    setSex(sex)
                }}
                containerStyle={{
                    width: "80%",
                    height: 'auto',
                    marginTop: '10%',
                }}
                textStyle={{
                    fontSize: 20,
                }}
                labelStyle={{fontWeight: 'bold'}}
            />
            <StyledButton onPress={_onSubmit}>
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 40}}>회원가입</Text>
            </StyledButton>
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
});
export default RegisterScreen
