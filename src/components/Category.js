import React, {useLayoutEffect} from "react";
import styled from 'styled-components/native';
import {ScrollView, StyleSheet, SafeAreaView, StatusBar, View, Text, TouchableOpacity} from "react-native";
import {AntDesign} from '@expo/vector-icons'


const TopContainer = styled.View`
  flex: 1;
  padding-top:5%;
`;
const HomeButton = styled.TouchableOpacity`
  flex: 6;
  background-color: #008577;
`;
const HomeText = styled.Text`
  color: white;
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 27px;
`;
const Search = styled.TextInput`
  flex: 5;
  background-color: #f0f0f0;
  border: 1px solid #5d8c87;
  border-radius: 30px;
  margin: 10px;
  padding-left: 20px;
  font-size: 20px;
`;
const BottomContainer = styled.View`
  background-color: white;
  flex: 5;
  justify-content: center;
  margin: 0 20px;
`;
const GuideText = styled.Text`
  color: #5d8c87;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 10%;
  margin-bottom: 10%;
`;
const CategoryButton = styled.TouchableOpacity`
  background-color: #fff;
  border: 2px solid #5d8c87;
  border-radius: 15px;
  margin: 2%;
`;
const CategoryText = styled.Text`
  text-align: center;
  color: #000;
  font-size: 35px;
  font-weight: bold;
  margin: 7%;
`;


// const URL = "http://54.180.38.125:8000/menus/";
const Category = ({navigation}) => {
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

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            {/*<TopContainer>*/}
            {/*    /!*<Search*!/*/}
            {/*    /!*    placeholder='검색어를 입력하세요.'/>*!/*/}
            {/*</TopContainer>*/}
            <BottomContainer>
                <CategoryButton onPress={() => {
                    navigation.navigate('RecommendedList')
                }}>
                    <CategoryText>추천메뉴</CategoryText>
                </CategoryButton>
                <CategoryButton onPress={() => {
                    navigation.navigate('SetMenuList')
                }}>
                    <CategoryText>세트메뉴</CategoryText>
                </CategoryButton>
                <CategoryButton onPress={() => {
                    navigation.navigate('MainMenuList')
                }}>
                    <CategoryText>음식</CategoryText>
                </CategoryButton>
                <CategoryButton onPress={() => {
                    navigation.navigate('DrinkList')
                }}>
                    <CategoryText>음료</CategoryText>
                </CategoryButton>
                {/*MenuDetail로 넘어가는 이 부분에서 각 메뉴별 정보 넘기자 */}
                <GuideText>
                    원하는 메뉴를 선택하세요.
                </GuideText>
            </BottomContainer>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // textInput: {
    //     backgroundColor: '#eaeaea',
    //     width: "80%",
    //     borderBottomWidth: 1,
    //     paddingLeft: '10%',
    //     paddingTop: '5%',
    //     paddingBottom: '5%',
    //     color: '#000',
    //     fontSize: 20,
    // },

    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Category;
