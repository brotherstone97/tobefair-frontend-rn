import {useState, useEffect} from "react";

export const useIngredient = () => {
    const [ingredientData, setIngredientData] = useState(null);
    const [ingredientError, setIngredientError] = useState(null);
    const [ingredientInProgress, setIngredientInProgress] = useState(false);

    useEffect(() => {
        //fetchData() 선언부
        const fetchData = async () => {
            try {
                setIngredientInProgress(true);
                //get all
                const res = await fetch("http://54.180.38.125:8000/menus/ingredients");
                const result = await res.json();
                console.log(result)
                if (res.ok) {
                    setIngredientData(result);
                    setIngredientError(null);
                    console.log("res:" + res.ok);
                } else {
                    console.log("에러 발생")
                    throw result;
                }
            } catch (ingredientError) {
                setIngredientError(ingredientError);
            } finally {
                setIngredientInProgress(false);
            }
        };
        //fetchData() 호출부
        fetchData();
    }, []);
    return {ingredientData, ingredientError, ingredientInProgress};
};
