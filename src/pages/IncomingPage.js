import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import { BASE_URL } from "../contants/url";
export default function IncomingPage() {
  const [showPage, setShowPage] = useState(false);
  const [form, setForm] = useState({ value: '', description: '' });
  const navigate = useNavigate();
  useEffect(() => {
    setShowPage(true)
  }, [])


  function postIncoming(e) {
    e.preventDefault();
    const config = {
      headers: {
        token: `Bearer ${localStorage.getItem('token')}`
      }
    };
    axios.post(`${BASE_URL}/main/incoming`, form, config)
      .then(res => {
        navigate('/main')
      })
      .catch(err => {
        localStorage.clear();
        alert(err.response.data)
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
          <form onSubmit={postIncoming}>
            <StyledInput placeholder="Valor" name="value" onChange={handleChange} type="number" step={0.01} required />
            <StyledInput placeholder="Descrição" name="description" onChange={handleChange} type="text" maxLength={20} required />
            <StyledButton type="submit">Salvar entrada</StyledButton>
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
