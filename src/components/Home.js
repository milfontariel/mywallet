import styled from "styled-components";
import In from '../assets/in.svg';
import Out from '../assets/out.svg';
import LogoutImg from '../assets/logout.svg';
import { Link } from "react-router-dom";
import Summary from "./Summary";
import Contexts from "../Contexts";
import { useContext } from "react";

export default function Home() {
    const { name, summaryItems } = useContext(Contexts);
    let balance = 0;

    for (const item of summaryItems) {
        let aux = item.value.replace(',', '.');
        if (item.type === 'input') {
            balance += parseFloat(aux);
        } else {
            balance -= parseFloat(aux);
        }
    }

    return (
        <Container>
            <Header>
                <Welcome>Olá, {name}</Welcome>
                <Logout>
                    <Link to={'/'}><img src={LogoutImg} alt="Sair"></img></Link>
                </Logout>
            </Header>
            <Resume>
                <History>
                    <Summary></Summary>
                </History>
                <Balance value={balance.toFixed(2)}>
                    <h1>SALDO</h1>
                    <p>{balance.toFixed(2)}</p>
                </Balance>
            </Resume>
            <Buttons>
                <Link to={'/input'}>
                    <Button>
                        <img src={In} alt="Entrada"></img>
                        <p>Nova <br /> entrada</p>
                    </Button>
                </Link>
                <Link to={'/output'}>
                    <Button>
                        <img src={Out} alt="Saída"></img>
                        <p>Nova <br /> saída</p>
                    </Button>
                </Link>
            </Buttons>
        </Container>
    )
}

const History = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        background: none;
        width: 3px;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #A328D6;
        border-radius: 10px;
    }
    scrollbar-width: thin;
    scrollbar-color: #a328d6 #ffffff;
    ::-webkit-scrollbar {
        width: 3px;
    }
    ::-webkit-scrollbar-track {
        background: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #a328d6;
        border-radius: 10px;
        border: 0px solid #ffffff;
        }
    & p {
        margin-top: 0;
    }
    `
const Balance = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & p {
        font-family: 'Lato', sans-serif;
        margin: 0;
        color: ${props => props.value < 0 ? '#C70000' : '#03AC00'};
    }
    & h1 {
        font-size: 1rem;
        margin: 0;
        font-weight: bold;
    }
`

const Resume = styled.div`
    width: 100%;
    height: calc(100% - 11em);
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem .5rem 1rem 1rem;
    box-sizing: border-box;
    gap: 1rem;
    overflow: hidden;
`
const Buttons = styled.div`
    display: flex;
    gap: 1rem;
    & a {
        text-decoration: none;
        width: 100%;
    }
`
const Button = styled.button`
    width: 100%;
    height: 7rem;
    border-radius: 5px;
    border: none;
    background-color: #A328D6;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    & p {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        text-align: left;
    }
    &:hover {
        background-color: #9A27CC;
    }
`

const Welcome = styled.h1`
    font-size: 1.6rem;
    font-weight: bold;
    color: #fff;
    margin: .8rem 0;
`

const Logout = styled.button`
    width: 24px;
    height: 24px;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    & img {
        width: 100%;
        height: 100%;
    }
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Container = styled.div`
    background-color: #8c11be;
    background-image: linear-gradient(330deg, #8c11be 0%, #a111be 100%);
    width: 100%;
    max-width: 500px;
    height: 100vh;
    margin:0 auto;
    padding: .8rem 1.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`
