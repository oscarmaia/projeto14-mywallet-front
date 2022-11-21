import styled from "styled-components"

export default function PageNotFound() {
    return (
        <>
            <EntirePage>
                <h1>ERROR 404 <br/><br/> PAGE NOT FOUND</h1>
            </EntirePage>
        </>
    )

}

const EntirePage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        font-size:48px;
        text-align: center;
        color: #FFF;
    }
`

