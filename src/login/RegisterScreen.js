import React, {useRef, useState} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";
import {TextInput} from "react-native-paper"
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";
import {fetchPost} from './postSignUp';

const StyledButton = styled.TouchableOpacity`
  background-color: #008577;
  border-radius: 15px;
  padding: 8%;
  margin-top: 8%;
`;


const RegisterScreen = ({navigation}) => {

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [age, setAge] = useState(true);
    const [sex, setSex] = useState(true);
    //dropdown state
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '남성', value: 'true'},
        {label: '여성', value: 'false'},
    ]);

    const ref = useRef([]);

    const _handlePhoneChange = _phone => {
        setPhone(_phone);
    };
    const _handlePasswordChange = _password => {
        setPassword(_password);
    };
    const _handleCheckPasswordChange = _password => {
        setCheckPassword(_password);
    };
    const _handleAgeChange = _age => {
        setAge(_age);
    };

    const _onSubmit = () => {
        if(!phone || !password || !password || !age || !sex) Alert.alert("알림","모든 정보를 입력하세요.",[{text:"확인"}]);
        else if (password !== checkPassword) {
            Alert.alert("알림","입력된 비밀번호가 일치하지 않습니다.",[{text:"확인"}])
            console.log('phone:', phone)
            console.log('password:', password)
            console.log('checkPassword:', checkPassword)
        } else {
            //DB CREATE
            if((fetchPost(phone, password, age, sex))===true){
                // console.log('phone:', phone)
                // console.log('password:', password)
                // console.log('checkPassword:', password)
                navigation.navigate("LoginScreen");
            }else{
                Alert.alert("알림","회원가입에 실패하였습니다.",[{text:"확인"}])
            }
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
                returnKeyType={'next'}
                maxLength={11}
                onChangeText={_handlePhoneChange}
                onSubmitEditing={()=>{
                    ref.current[0].focus();
                }}
                style={styles.textInput}
            />
            <TextInput
                ref={element => (ref.current[0] = element)}
                label="비밀번호 4자리"
                secureTextEntry={true}
                // right={<TextInput.Icon name="eye"/>}
                placeholder={'비밀번호 4자리'}
                onChangeText={_handlePasswordChange}
                keyboardType={'number-pad'}
                returnKeyType={'next'}
                returnKeyLabel={'다음'}
                maxLength={4}
                //로그인 버튼 눌렀을 때
                style={styles.textInput}
                onSubmitEditing={()=>{
                    ref.current[1].focus();
                }}
            />
            <TextInput
                ref={element => (ref.current[1] = element)}
                label="비밀번호 확인"
                secureTextEntry={true}
                // right={<TextInput.Icon name="eye"/>}
                placeholder={'비밀번호 확인'}
                onChangeText={_handleCheckPasswordChange}
                keyboardType={'number-pad'}
                returnKeyType={'next'}
                returnKeyLabel={'다음'}
                maxLength={4}
                style={styles.textInput}
                onSubmitEditing={()=>{
                    ref.current[2].focus();
                }}
            />
            <TextInput
                ref={element => (ref.current[2] = element)}
                label="나이"
                placeholder={'나이'}
                onChangeText={_handleAgeChange}
                keyboardType={'number-pad'}
                returnKeyType={'send'}
                maxLength={3}
                //로그인 버튼 눌렀을 때
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
        paddingTop: '3%',
        paddingBottom: '3%',
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
