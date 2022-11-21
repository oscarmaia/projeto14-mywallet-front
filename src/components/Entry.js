import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"
import styled from "styled-components"
import delete_image from "../assets/images/delete.svg"
import { BASE_URL } from "../contants/url"
export default function Entry({ type, date, value, description, id,update,setUpdate }) {
    const navigate = useNavigate()
    function deleteEntry() {
        if (window.confirm(`Deseja deletar \"${description}\"?`) === true) {
            axios.delete(`${BASE_URL}/main/entry/${id}`)
            .then(res=>{
                console.log(res.data)
                setUpdate(!update)
            })
            .catch(err=>{
                alert(err.response.data)
                localStorage.clear();
                navigate('/')
            })
        }
    }

    function updateEntry(){
        console.log(id)
    }

    return (
        <>
            <StyledEntry changeColor={type}>
                <StyledDateWithDescription>
                    <h2>
                        {date}
                    </h2>
                    <h1 onClick={updateEntry}>
                        {description}
                    </h1>
                </StyledDateWithDescription>
                <Value>
                    <h3 >
                        {value.toFixed(2).toString().replaceAll('.', ',')}
                    </h3>
                    <img src={delete_image} alt="delete" onClick={deleteEntry}></img>
                </Value>
            </StyledEntry>
        </>
    )
}

const StyledEntry = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    h1{
        font-family: Raleway;
        font-size: 16px;
        font-weight: 400;
        line-height: 19px;
        letter-spacing: 0em;
        text-align: left;
        color:#000;
        margin-left: 10px;
      }
        h2{
            font-family: Raleway;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: left;
            color: #C6C6C6;
        }
        h3{
            font-family: Raleway;
            font-size: 16px;
            font-weight: 400;
            line-height: 19px;
            letter-spacing: 0em;
            text-align: right;
            color:${props => props.changeColor === "incoming" ? "#03AC00" : "#C70000"}
        }

        margin-bottom: 15px;
    `
const Value = styled.div`
    display: flex;
    img{
            margin-left: 3px;
            width: 15px;
        }
`
const StyledDateWithDescription = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`