import styled from "styled-components"
import Logo from "../../assets/logo_alphacode.png"


const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 36px;
    height: 120px;
    padding: 60px;

    background-color: #068ED0;
    border-radius: 16px 16px 0 0;
`

const StyledLogo = styled.img`
    scale: 1;
`
const StyledTitle = styled.h1`
    color: white;
    font-size: 36px;
    font-weight: 700;
`

const Banner = () => {
    return (
        <>
            <StyledDiv>
                <StyledLogo src={Logo} />
                <StyledTitle> Cadastro de Contatos </StyledTitle>
            </StyledDiv>
        </>
    )
}

export default Banner