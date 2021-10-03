import {AsyncStorage} from "@react-native-async-storage/async-storage";


let loginURL = 'http://54.180.38.125:8000/login/signup/'


export async function fetchPost(phone, password, age, sex) {
    try {
        const options =
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    phone: phone,
                    password: password,
                    age: age,
                    sex: sex,
                }),
            }
        const res = await fetch(loginURL, options);
        const result = await res.json();
        if (res.ok) {
            console.log(result);
            const token = result.Token;
            console.log('stored Token:', token);
            //서버에서 response로 넘겨준 Token을 로컬에 저장
            const storeToken = async (value) => {
                try {
                    console.log('토큰 저장 성공');
                    await AsyncStorage.setItem('Token', value);
                } catch (e) {
                    console.log('토큰 저장 실패')
                    console.error(e);
                }
            }
            return true;
        } else {
            console.log("실패");
            throw res;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
};

