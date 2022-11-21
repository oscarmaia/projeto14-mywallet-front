import axios from "axios";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import { BASE_URL } from "../contants/url";
export default function ExpensePage() {
  const [showPage, setShowPage] = useState(false);
  const [form, setForm] = useState({ value: '', description: '' });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setShowPage(true)
  }, [])


  function postExpense(e) {
    setDisabled(true);
    e.preventDefault();
    const config = {
      headers: {
        token: `Bearer ${localStorage.getItem('token')}`
      }
    };
    axios.post(`${BASE_URL}/main/expense`, form, config)
      .then(res => {
        navigate('/main')
      })
      .catch(err => {
        alert(err.response.data)
        localStorage.clear();
        navigate('/')
      })
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  if (!showPage) {
    <>
      <LoadingScreen />
    </>
  }

  else {
    return (
      <CenteredContainer>
        <CenteredDiv>
          <h1>Nova entrada</h1>
          <form onSubmit={postExpense}>
            <StyledInput disabled={disabled} placeholder="Valor" name="value" onChange={handleChange} type="number" step={0.01} required />
            <StyledInput disabled={disabled} placeholder="Descrição" name="description" onChange={handleChange} type="text" maxLength={20} required />
            <StyledButton disabled={disabled} type="submit">
              <span>Salvar saída</span>
              <Puff
                height="40"
                width="40"
                radisu={1}
                color="#FFF"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={disabled}
              />

            </StyledButton>
          </form>
        </CenteredDiv>
      </CenteredContainer>
    );
  }
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
    box-sizing: border-box;
    border: none;
    width: 326px;
    height: 58px;
    background: #a328d6;
    border-radius: 5px;
    margin-bottom: 36px;

    display: flex;
    justify-content: center;
    align-items: center;
  span{
    font-family: "Raleway", sans-serif;  
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    display:${props => props.disabled === true ? "none" : ""};
  }
`;

const CenteredDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

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
