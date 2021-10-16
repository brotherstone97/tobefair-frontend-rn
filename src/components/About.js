import React from "react";
import styled from "styled-components/native";
import Logo from '../../assets/tobefairLogo.jpg'
import Hr from "react-native-hr-component";

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
`;
const LogoContainer = styled.View`
  flex: 1;
  margin-top: 15%;
  margin-bottom: 5%;
`;
const HomeLogo = styled.Image`
  flex: 1;
  resize-mode: contain;
`;
const TextContainer = styled.View`
  flex: 3;
`;
const InfoText = styled.Text`
    flex: 3;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: black;
    margin-top: 20%;
`;
const AboutText = styled.Text`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    color: gray;
    padding: 5%;
    margin-top: 5%;
    border-top-width: 2px;
    border-top-color: lightgray;
`;
const About = ({ navigation }) => {

    return (
        <Container>
            <LogoContainer>
                <HomeLogo source={Logo} />
            </LogoContainer>
            <TextContainer>
                <InfoText>
                    '이거 주세요'는 디지털 취약계층을 위해{'\n'}
                    직관적이고 사용하기 쉬운 UI/UX를 적용한{'\n'}
                    모바일 키오스크입니다.
                </InfoText>
                <AboutText>
                    본 애플리케이션에 사용된 폰트는{'\n'}
                    '무료글꼴, 경기도, 경기천년제목 Medium' 입니다.
                </AboutText>
            </TextContainer>
        </Container>
    );
}

export default About;
