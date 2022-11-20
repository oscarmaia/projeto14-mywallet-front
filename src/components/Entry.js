import styled from "styled-components"
export default function Entry() {

    const entry = {
        description: 'Presente de Dante',
        value: 238.00,
        type: 'expense',
        date: "19/11"
    }
    const entry2 = {
        description: 'Conta fortnite',
        value: 500.00,
        type: "incoming",
        date: "17/11"
    }
    const entry3 = {
        description: 'Gasolina',
        value: 70.00,
        type: 'expense',
        date: "22/11"
    }

    const entries = [entry, entry2, entry3]

    return (
        <>
            <StyledEntry changeColor={entry2.type}>
                <StyledDateWithDescription>
                    <h2>
                        {entry.date}
                    </h2>
                    <h1>
                        {entry.description}
                    </h1>
                </StyledDateWithDescription>
                <h3 >
                    {entry2.value.toFixed(2).toString().replaceAll('.', ',')}
                </h3>
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
const StyledDateWithDescription = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    `