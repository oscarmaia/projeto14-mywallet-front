import axios from "axios";
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import { BASE_URL } from "../contants/url";
export default function UpdateIncoming() {
  const [showPage, setShowPage] = useState(false);
  const [form, setForm] = useState({ value: '', description: '' });
  const [disabled, setDisabled] = useState(false);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      try {
        setId(location.state.id);
        setShowPage(true)
      } catch (error) {
        navigate('/main')
      }
    } else {
      navigate('/')
    }
  }, [])


  function putIncoming(e) {
    e.preventDefault();
    setDisabled(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    console.log(id)
    axios.put(`${BASE_URL}/main/entry/update/${id}`, form, config)
      .then(res => {
        navigate('/main')
      })
      .catch(err => {
        setDisabled(false);
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
      <CenteredContainer disabled={disabled}>
        <CenteredDiv>
          <h1>Editar entrada</h1>
          <form onSubmit={putIncoming}>
            <StyledInput disabled={disabled} placeholder="Valor" name="value" onChange={handleChange} type="number" step={0.01} required />
            <StyledInput disabled={disabled} placeholder="Descrição" name="description" onChange={handleChange} type="text" maxLength={20} required />
            <StyledButton disabled={disabled} type="submit">
              <span>Atualizar entrada</span>
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
filter:brightness(${props => props.disabled === true ? "80%" : "100%"});
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
