import styled from "styled-components";
import exitImage from "../assets/images/exit-outline.svg"
import entryImage from "../assets/images/entry.svg"
import expenseImage from "../assets/images/expense.svg"
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../contants/url";
import Entry from "../components/Entry";
import LoadingScreen from "../components/LoadingScreen";


export default function MainPage() {
    const { user, setUser } = useContext(LoginContext);
    const navigate = useNavigate();
    const [showPage, setShowPage] = useState(false);
    const [balance, setBalance] = useState(0);
    const [entries, setEntries] = useState([]);
    const [disabled,setDisabled] = useState(false);
    const [update,setUpdate] = useState(false);
    function updateBalance(entries) {
        let amount = 0;
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].type === 'incoming') {
                entries[i].value = +entries[i].value;
                amount += entries[i].value;
            }
            else {
                entries[i].value = +entries[i].value;
                amount -= entries[i].value;
            }
        }
        setBalance(amount);
    }

    function logout() {
        if (window.confirm("Você deseja deslogar?") === true) {
            setDisabled(true);
            const config = {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            };
            axios.post(`${BASE_URL}/logout`, user, config)
                .then(res => {
                    localStorage.clear();
                    navigate('/');
                })
                .catch(err => {
                    alert(err.response.data)
                    localStorage.clear();
                    navigate('/')
                })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const config = {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            };
            axios.get(`${BASE_URL}/main`, config)
                .then(res => {
                    const { name, email, _entries, userId } = res.data;
                    const newUser = {
                        _id: userId,
                        name,
                        email
                    }
                    setUser(newUser);
                    setEntries(_entries);
                    updateBalance(_entries);
                    setShowPage(true);
                })
                .catch(err => {
                    alert(err.response.data);
                    setDisabled(false);
                    localStorage.clear();
                    navigate('/')
                })
        } else {
            navigate('/')
        }
    }, [update])

    if (!showPage) {
        return (
            <>
                <LoadingScreen />
            </>
        )
    }
    else {
        if (entries?.length === 0) {
            return (
                <>
                    <CenteredContainer>
                        <CenteredDiv>
                            <TopContainer disabled={disabled}>
                                <h1>Olá {user.name}</h1>
                                <img src={exitImage} alt="exit-" onClick={logout} ></img>
                            </TopContainer>
                            <MainContainer>
                                <h2>
                                    Não há registros de
                                    entrada ou saída
                                </h2>
                            </MainContainer>
                            <ButtonsContainer>
                            <Link to={'/main/incoming'}>
                                    <InputButton disabled={disabled}>
                                        <img src={entryImage} alt="incoming-"></img>
                                        <span>Nova Entrada</span>
                                    </InputButton>
                                </Link>
                                <Link to={'/main/expense'}>
                                    <InputButton disabled={disabled}>
                                        <img src={expenseImage} alt="expense-"></img>
                                        <span>Nova Saída</span>
                                    </InputButton>
                                </Link>
                            </ButtonsContainer>
                        </CenteredDiv>
                    </CenteredContainer>
                </>
            );
        }
        else {
            //has entries
            return (
                <>
                    <CenteredContainer disabled={disabled}>
                        <CenteredDiv>
                            <TopContainer disabled={disabled}>
                                <h1>Olá {user.name}</h1>
                                <img src={exitImage} alt="exit-" onClick={logout} ></img>
                            </TopContainer>
                            <MainContainerWithEntries>
                                <StyledEntries>
                                    {entries.map((e, i) =>
                                        <Entry
                                            key={e._id}
                                            id={e._id}
                                            type={e.type}
                                            date={e.date}
                                            description={e.description}
                                            value={e.value}
                                            update={update}
                                            setUpdate={setUpdate}
                                        />)}
                                </StyledEntries>
                                <StyledBalance color={balance}>
                                    <h1>SALDO</h1>
                                    <h2>{balance.toFixed(2).toString().replaceAll('.', ',')}</h2>
                                </StyledBalance>
                            </MainContainerWithEntries>
                            <ButtonsContainer>
                                <Link to={'/main/incoming'}>
                                    <InputButton disabled={disabled}>
                                        <img src={entryImage} alt="incoming-"></img>
                                        <span>Nova Entrada</span>
                                    </InputButton>
                                </Link>
                                <Link to={'/main/expense'}>
                                    <InputButton disabled={disabled}>
                                        <img src={expenseImage} alt="expense-"></img>
                                        <span>Nova Saída</span>
                                    </InputButton>
                                </Link>
                            </ButtonsContainer>
                        </CenteredDiv>
                    </CenteredContainer>
                </>
            );
        }
    }
}


const StyledEntries = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content:flex-start;
    overflow: auto;  
    height: 95%;
`
const ButtonsContainer = styled.div`
    margin-top: 13px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        text-decoration: none;
    }
    `

const InputButton = styled.button`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    border: none;
    width: 156px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    img{
        width: 22px;
    }
    span{
        display: inline-block;
        text-align: left;
        width: 64px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`

const MainContainerWithEntries = styled.div`
    position: relative;
    box-sizing: border-box;
    padding:10px;
    border-radius: 5px;
    width: 326px;
    height: 446px;
    background-color: #fff;  
`
const StyledBalance = styled.div`
    position: absolute;
    bottom:10px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
h1{
    font-family: Raleway;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 10px;

}
h2{
    font-family: Raleway;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: right;
    color:${props => props.color > 0 ? "#03AC00" : "#C70000"} ;
    margin-right: 10px;
}
`
const MainContainer = styled.div`
    border-radius: 5px;
    width: 326px;
    height: 446px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        width: 180px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
`

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;

    color: #FFFFFF;
    }
    img{
        width: 32px;
        pointer-events:${props => props.disabled === true ? "none" : ""};
    }
    margin-bottom: 26px;
`

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

const CenteredDiv = styled.div`

    `;
