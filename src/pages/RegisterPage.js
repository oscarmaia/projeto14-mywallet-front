import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { BASE_URL } from "../contants/url";
import LoadingScreen from "../components/LoadingScreen";
export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', _password: '' });
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate();
  function register(e) {
    e.preventDefault();
    if (form.password !== form._password) {
      alert("Password has to be the same!")
    } else {
      const request = { ...form }
      delete request._password;
      axios.post(`${BASE_URL}/sign-up`, request)
        .then(res => {
          navigate('/');
        })
        .catch(err => {
          alert(err.response.data)
        })
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/main')
    } else {
      setShowPage(true)
    }
  }, [])
  if (!showPage) {
    return (
      <>
        <LoadingScreen />
      </>
    )
  }
  else {
    return (
      <>
        <CenteredContainer>
          <CenteredDiv>
            <h1>MyWallet</h1>
            <form onSubmit={register}>
              <StyledInput placeholder="Nome" type="text" name="name" value={form.name} required onChange={handleChange} />
              <StyledInput placeholder="E-mail" type="email" name="email" value={form.email} required onChange={handleChange} />
              <StyledInput placeholder="Senha" type="password" name="password" value={form.password} minLength={6} required onChange={handleChange} />
              <StyledInput placeholder="Confirme a senha" type="password" name="_password" value={form._password} minLength={6} required onChange={handleChange} />
              <StyledButton type="submit">Cadastrar</StyledButton>
              <Link to={'/'}>Já tem uma conta? Entre agora!</Link>
            </form>
          </CenteredDiv>
        </CenteredContainer>
      </>
    );
  }
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
