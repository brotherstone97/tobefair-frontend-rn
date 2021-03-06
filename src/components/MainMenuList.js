import React, {useContext} from "react";
import {Container, TopContainer, Search, BottomContainer, MenuContainer, MenuImage, MenuName, MenuPrice, setCartInHeader} from '../styles/MenuListStyle';
import APIContext from "../contexts";

const MainMenuList = ({navigation}) => {
    setCartInHeader({navigation});
    const data = useContext(APIContext);
    return (
        <Container>
            <TopContainer>
                <Search placeholder="검색어를 입력하세요."/>
            </TopContainer>
            <BottomContainer>
                {data?.menus.filter((menu) => {
                    if (menu["menu_type"] !== "단품") return false;
                    return true;
                }).map((menu) => {
                    return (
                        <MenuContainer key={menu['id']}
                                       onPress={() => {
                                           navigation.navigate("MenuDetail", menu);
                                       }}>
                            <MenuName>
                                {menu["name"]}{'\n\n'}
                                <MenuPrice>
                                    {/*가격을 받아와서 1000단위로 ','표시하기 위한 정규표현식 활용*/}
                                    {`${menu["price"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}
                                </MenuPrice>
                            </MenuName>
                            <MenuImage source={{uri: menu['image']}}/>
                        </MenuContainer>
                    );
                })}
            </BottomContainer>
        </Container>
    );
};
export default MainMenuList;
