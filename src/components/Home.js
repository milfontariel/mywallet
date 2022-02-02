import styled from "styled-components";
import In from '../assets/in.svg';
import Out from '../assets/out.svg';
import LogoutImg from '../assets/logout.svg';

export default function Home() {
    return (
        <Container>
            <Header>
                <Welcome>Olá, Fulano</Welcome>
                <Logout>
                    <img src={LogoutImg} alt="Sair"></img>
                </Logout>
            </Header>
            <Resume>
                <p>Não há registros de
                    entrada ou saída</p>
            </Resume>
            <Buttons>
                <Button>
                    <img src={In} alt="Entrada"></img>
                    <p>Nova <br /> entrada</p>
                </Button>
                <Button>
                    <img src={Out} alt="Saída"></img>
                    <p>Nova <br /> saída</p>
                </Button>
            </Buttons>
        </Container>
    )
}
const Resume = styled.div`
    width: 100%;
    height: calc(100% - 11rem);
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
`
const Buttons = styled.div`
    display: flex;
    gap: 1rem;
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
    & p {
        margin: 0;
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        text-align: left;
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
    width: 100%;
    max-width: 400px;
    height: 100vh;
    /* border: 1px solid #fff; */
    margin:0 auto;
    padding: .8rem 1.5rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
