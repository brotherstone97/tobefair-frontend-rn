import {useState, useEffect} from "react";

export const usePayment = () => {
    const [paymentData, setPaymentData] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [paymentInProgress, setPaymentInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setPaymentInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/orders/payments/");
                const result = await res.json();
                console.log(result)
                if (res.ok) {
                    setPaymentData(result);
                    setPaymentError(null);
                    console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (paymentError) {
                setPaymentError(paymentError);
            } finally {
                setPaymentInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {paymentData, paymentError, paymentInProgress};
};
