import {useState, useEffect} from "react";

export const useOrderMenu = () => {
    const [orderMenuData, setOrderMenuData] = useState(null);
    const [orderMenuError, setOrderMenuError] = useState(null);
    const [orderMenuInProgress, setOrderMenuInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setOrderMenuInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/orders/order_menus/");
                const result = await res.json();
                // console.log(result)
                if (res.ok) {
                    setOrderMenuData(result);
                    setOrderMenuError(null);
                    // console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (orderMenuError) {
                setOrderMenuError(orderMenuError);
            } finally {
                setOrderMenuInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {orderMenuData, orderMenuError, orderMenuInProgress};
};
