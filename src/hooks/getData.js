import {useState, useEffect} from "react";

export const getData = url => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [inProgress, setInProgress] = useState(false);
    const _url = {
        "BranchesURL": "http://54.180.38.125:8000/branches/",
        "MenusURL": "http://54.180.38.125:8000/menus/",
        "IngredientsURL": "http://54.180.38.125:8000/menus/ingredients/",
        "OrdersURL": "http://54.180.38.125:8000/orders/",

        "OrderMenusURL": "http://54.180.38.125:8000/orders/order_menus/",
        "PaymentsURL": "http://54.180.38.125:8000/orders/payments/",
        "UsersURL": "http://54.180.38.125:8000/users/"
    };

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setInProgress(true);
                //get all
                const res = await fetch(url);
                const result = await res.json();
                console.log(result)
                if (res.ok) {
                    setData(result);
                    setError(null);
                    console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (error) {
                setError(error);
            } finally {
                setInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {data, error, inProgress};
};
