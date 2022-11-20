import styled from "styled-components";

export default function IncomingPage() {
  return (
    <CenteredContainer>
        <CenteredDiv>
          <h1>Nova entrada</h1>
          <StyledInput placeholder="Valor"></StyledInput>
          <StyledInput placeholder="Descrição"></StyledInput>
          <StyledButton>Salvar Entrada</StyledButton>
        </CenteredDiv>
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div`
    margin-top: 25px;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;

  h1 {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    margin-bottom: 40px;
  }
`;
