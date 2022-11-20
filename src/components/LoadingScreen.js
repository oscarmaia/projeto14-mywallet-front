import { Puff } from "react-loader-spinner";
import styled from "styled-components"

export default function LoadingScreen() {
    return (
        <>
            <EntirePage>
                <Puff
                    height="80"
                    width="80"
                    radisu={1}
                    color="#FFF"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
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
`

