import { Link } from "react-router-dom";
import styled from "styled-components";
export default function RegisterPage() {
  return (
    <>
      <CenteredContainer>
        <CenteredDiv>
          <h1>MyWallet</h1>
          <StyledInput placeholder="Nome"></StyledInput>
          <StyledInput placeholder="E-mail"></StyledInput>
          <StyledInput placeholder="Senha"></StyledInput>
          <StyledInput placeholder="Confirme a senha"></StyledInput>
          <StyledButton>Cadastrar</StyledButton>
          <Link to={'/'}>Já tem uma conta? Entre agora!</Link>
        </CenteredDiv>
      </CenteredContainer>
    </>
  );
}

const CenteredContainer = styled.div`
  width: 326px;
  height: 326px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  color: #000;

  box-sizing: border-box;
  border: none;
  padding: 0px;
  width: 326px;
  height: 58px;
  background: #ffffff;

  border-radius: 5px;
  margin-bottom: 13px;
  padding-left: 15px;
  padding-right: 15px;
  ::placeholder {
    font-family: "Raleway", sans-serif;
  }
`;

const StyledButton = styled.button`
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
  border: none;
  width: 326px;
  height: 58px;
  background: #a328d6;
  border-radius: 5px;
  margin-bottom: 36px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const CenteredDiv = styled.div`
  h1 {
    font-family: "Saira Stencil One", cursive;
    color: white;
    font-size: 32px;
    text-align: center;
    margin-bottom: 24px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 15px;
  }
`;
