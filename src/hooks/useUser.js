import {useState, useEffect} from "react";

export const useUser = () => {
    const [userData, setUserData] = useState(null);
    const [userError, setUserError] = useState(null);
    const [userInProgress, setUserInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setUserInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/orders/");
                const result = await res.json();
                // console.log(result)
                if (res.ok) {
                    setUserData(result);
                    setUserError(null);
                    // console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (userError) {
                setUserError(userError);
            } finally {
                setUserInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {userData, userError, userInProgress};
};
