import React from "react";
import styled from "styled-components/native";
import { useFetch } from "../hooks/UseFetch";

const Container = styled.View`
  background-color: #f0f0f0;
  flex: 1;
`;
const TopContainer = styled.View`
  background-color: white;
  flex: 1;
`;
const Search = styled.TextInput`
  flex: 1;
  background-color: #f0f0f0;
  border: 1px solid #5d8c87;
  border-radius: 30px;
  margin: 10px;
  padding-left: 20px;
  font-size: 20px;
`;
const BottomContainer = styled.ScrollView`
  flex: 10;
`;
const MenuContainer = styled.TouchableOpacity`
  background-color: white;
  border-bottom-color: lightgray;
  border-bottom-width: 1px;
  height: 130px;
  flex-direction: row;
  padding: 2%;
`;
const MenuImage = styled.View`
  background-color: black;
  flex: 2;
  height: 100%;
  border-radius: 6px;
`;
const MenuName = styled.Text`
  flex: 5;
  font-size: 30px;
  font-weight:bold;
  padding-left: 15;
  padding-top: 10;
`;
const MenuPrice = styled.Text`
    font-size: 19px;
    font-weight: normal;
`;

const URL = "http://54.180.38.125:8000/menus/";
const MenuList = ({ navigation }) => {
  const { data, error } = useFetch(URL);
  return (
    <Container>
      <TopContainer>
        <Search placeholder="검색어를 입력하세요." />
      </TopContainer>
      <BottomContainer>
        {data?.map((menu) => {
          return (
            <MenuContainer onPress={() => {
                navigation.navigate('MenuDetail')
            }}>
              <MenuName>{menu["name"]}{'\n\n'}<MenuPrice>{menu["price"]}원</MenuPrice></MenuName>
              <MenuImage></MenuImage>
            </MenuContainer>
          );
        })}
      </BottomContainer>
    </Container>
  );
};
export default MenuList;
