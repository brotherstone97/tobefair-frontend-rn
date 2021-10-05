import {useState, useEffect} from "react";

export const useOrder = () => {
    const [orderData, setOrderData] = useState(null);
    const [orderError, setOrderError] = useState(null);
    const [orderInProgress, setOrderInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setOrderInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/orders/");
                const result = await res.json();
                // console.log(result)
                if (res.ok) {
                    setOrderData(result);
                    setOrderError(null);
                    // console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (orderError) {
                setOrderError(orderError);
            } finally {
                setOrderInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {orderData, orderError, orderInProgress};
};
