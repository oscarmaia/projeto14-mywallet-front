import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { BASE_URL } from "../contants/url";
import LoadingScreen from "../components/LoadingScreen";
import { Puff } from "react-loader-spinner";
export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', _password: '' });
  const [showPage, setShowPage] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  function register(e) {
    setDisabled(true);
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
          setDisabled(false);
          alert(err.response.data)
          localStorage.clear();
          navigate('/')
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
        <CenteredContainer disabled={disabled}>
          <CenteredDiv disabled={disabled}>
            <h1>MyWallet</h1>
            <form onSubmit={register}>
              <StyledInput disabled={disabled} placeholder="Nome" type="text" name="name" value={form.name} required onChange={handleChange} />
              <StyledInput disabled={disabled} placeholder="E-mail" type="email" name="email" value={form.email} required onChange={handleChange} />
              <StyledInput disabled={disabled} placeholder="Senha" type="password" name="password" value={form.password} minLength={6} required onChange={handleChange} />
              <StyledInput disabled={disabled} placeholder="Confirme a senha" type="password" name="_password" value={form._password} minLength={6} required onChange={handleChange} />
              <StyledButton disabled={disabled} type="submit">
                <span>Cadastrar</span>
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

              <Link to={'/'}>Já tem uma conta? Entre agora!</Link>
            </form>
          </CenteredDiv>
        </CenteredContainer>
      </>
    );
  }
}



const CenteredContainer = styled.div`
filter:brightness(${props=>props.disabled===true?"80%":"100%"});
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
    :hover{
      background-color:#9c26ce;
    }
  span{
    font-family: "Raleway", sans-serif;  
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    display:${props => props.disabled === true ? "none" : ""};
  }
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
    pointer-events:${props => props.disabled === true ? "none" : ""};
  }
`;
