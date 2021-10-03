import {useState, useEffect} from "react";

export const useMenu = () => {
    const [menuData, setMenuData] = useState(null);
    const [menuError, setMenuError] = useState(null);
    const [menuInProgress, setMenuInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setMenuInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/menus/");
                const result = await res.json();
                // console.log(result)
                if (res.ok) {
                    setMenuData(result);
                    setMenuError(null);
                    // console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (menuError) {
                setMenuError(menuError);
            } finally {
                setMenuInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {menuData, menuError, menuInProgress};
};
