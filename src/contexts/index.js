import React, {createContext, useState} from "react";
import {useMenu} from "../hooks/useMenu";
import {useIngredient} from "../hooks/useIngredient";
import {useBranch} from "../hooks/useBranch";
import {useOrder} from "../hooks/useOrder";
import {useOrderMenu} from "../hooks/useOrderMenu";
import {usePayment} from "../hooks/usePayment";
import {useUser} from "../hooks/useUser";

//URL지정
//branches
const BranchesURL = "http://54.180.38.125:8000/branches/";
//menus
const MenusURL = "http://54.180.38.125:8000/menus/";
const IngredientsURL = "http://54.180.38.125:8000/menus/ingredients/";
//orders
const OrdersURL = "http://54.180.38.125:8000/orders/";
const OrderMenusURL = "http://54.180.38.125:8000/orders/order_menus/";
const PaymentsURL = "http://54.180.38.125:8000/orders/payments/";
//users
const UsersURL = "http://54.180.38.125:8000/users/";

const APIContext = createContext({}/*{data, MenuError, MenuInProgress} = getData(MenusURL)*/);

//APP컴포넌트를 APIProvider로 감쌌기 때문에 App.js호출 시점에 API호출해서 미리 담아놓음. 결과적으로 카테고리에선 로컬에 저장된 context를 갖다쓰기 때문에 훨씬 빠름
const APIProvider = ({children}) => {
    const {menuData, MenuError, MenuInProgress} = useMenu();
    const {ingredientData, ingredientError, ingredientInProgress} = useIngredient();
    const {branchData, branchError, branchInProgress} = useBranch();
    const {orderData, orderError, orderInProgress} = useOrder();
    const {orderMenuData, orderMenuError, orderMenuInProgress} = useOrderMenu();
    const {paymentData, paymentError, paymentInProgress} = usePayment();
    const {userData, userError, userInProgress} = useUser();

    const data = {
        "menus": menuData, "ingredients": ingredientData, "branches": branchData,
        "orders": orderData, "orderMenus": orderMenuData, "payments": paymentData, "users": userData
    }
    return (
        <APIContext.Provider value={data}>
            {children}
        </APIContext.Provider>
    );
};

const APIConsumer = APIContext.Consumer;


export default APIContext;
export {APIProvider, APIConsumer};
