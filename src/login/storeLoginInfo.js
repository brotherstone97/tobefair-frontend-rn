import AsyncStorage from "@react-native-async-storage/async-storage";

const storeLoginInfo = async (token, phone, password) => {
    try {
        // 서버에서 response로 넘겨준 Token을 로컬에 저장
        await AsyncStorage.setItem('Token', token);
        await AsyncStorage.setItem('phone', phone);
        await AsyncStorage.setItem('password', password);
        console.log('로그인 정보 저장 성공');
    } catch (e) {
        console.log('로그인 정보 저장 실패')
        console.error("store error " +  e);
    }
}

export default storeLoginInfo;
