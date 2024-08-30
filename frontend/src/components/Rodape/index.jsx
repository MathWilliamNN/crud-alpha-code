import styled from "styled-components"
import { FaRegCopyright } from "react-icons/fa";
import Logo from "../../assets/logo_rodape_alphacode.png"

const StyledContainer = styled.div`
    display: flex;
    background-color: #068ED0;
    height: 80px;
    border-radius: 0 0 16px 16px;
    align-items: center;
    justify-content: space-between;
    padding: 0px 48px;
    gap: 16px;
`
const StyledText = styled.h2`
    display: flex;
    font-size: 20px;
    color: white;
    font-weight: 400;
    text-align: center;
    align-items: center;
`
const StyledLogo = styled.img`
    height: 40px;
`

const Rodape = () => {
    return (
        <StyledContainer>
            <StyledText> Termos | Políticas </StyledText>
            <StyledText> <FaRegCopyright /> Copyright 2024 | Desenvolvido por <StyledLogo src={Logo} /> </StyledText>
            <StyledText> <FaRegCopyright /> AlphaCode IT Solutions</StyledText>
        </StyledContainer>
    )
}

export default Rodape