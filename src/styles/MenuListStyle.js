import styled from "styled-components/native";
import React, {useLayoutEffect} from "react";
import {Text, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const Container = styled.ScrollView`
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
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 5%;
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
const MenuImage = styled.Image`
  flex: 2;
  height: 100%;
`;
const MenuName = styled.Text`
  flex: 5;
  font-size: 30px;
  font-weight: bold;
  padding-left: 4%;
  padding-top: 2%;
`;
const MenuPrice = styled.Text`
  font-size: 19px;
  font-weight: normal;
`;

const setCartInHeader = ({navigation}) => {
useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity style={{flexDirection: 'row'}}
                              onPress={() => {
                                  navigation.navigate('Cart')
                              }}>
                <AntDesign
                    style={{marginRight: 5}}
                    name='shoppingcart'
                    size={25}

                    color='#fff'
                />
                <Text style={{marginRight: 12, color: '#fff', fontSize: 17}}>장바구니</Text>

            </TouchableOpacity>
        ),
    });
}, []);
}

export {Container, TopContainer, Search, BottomContainer, MenuContainer, MenuImage, MenuName, MenuPrice, setCartInHeader};
