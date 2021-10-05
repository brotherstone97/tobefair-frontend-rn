let loginURL = 'http://54.180.38.125:8000/login/signin/'
import AsyncStorage from "@react-native-async-storage/async-storage";
import storeLoginInfo from "./storeLoginInfo";

export const fetchPost = async (phone, password) => {
    try {
        const options =
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    phone: phone,
                    password: password
                }),
            }
        const res = await fetch(loginURL, options);
        if (res.ok) {
            const result = await res.json();
            console.log(result);
            const token = result.Token;

            // if (!(await AsyncStorage.getItem('token')))
            await storeLoginInfo(token, phone, password);
            console.log("성공");
            return true
        } else {
            console.log("실패");
            throw res;
        }
    } catch (e) {
        console.error('login error :' + e);
        return false;
    }
};

