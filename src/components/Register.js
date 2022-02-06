import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    async function handlerRegister(e) {
        e.preventDefault();
        try {
            const upperName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            const registerData = {
                name: upperName,
                email,
                password,
                repeatPassword
            };
            await axios.post('http://localhost:5000/register', registerData);
            navigate('/');

        } catch (error) {
            if(error.response.status === 409){
                console.log("E-mail já cadastrado");
            }
        }
    }

    return (
        <Container>
            <Logo>MyWallet</Logo>
            <FormBox>
                <Info>Crie sua conta</Info>
                <Form onSubmit={handlerRegister}>
                    <Input required type='text' placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)}></Input>
                    <Input required type='email' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input required type='password' placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    <Input required type='password' placeholder='Confirme a senha' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}></Input>
                    <Button type='submit'>CRIAR CONTA</Button>
                    <Link to={'/'}><p>Já tem uma conta? Entre agora!</p></Link>
                </Form>
            </FormBox>
        </Container>
    )
}
const Container = styled.div`
    background-color: #8C11BE;
    background-image: linear-gradient(330deg, #8c11be 0%, #a111be 100%);
    width: 100%;
    height: 100vh;
    max-width: 500px;
    margin:0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Info = styled.div`
    font-size: 1.5rem;
    color: #222;
    font-weight: bold;
    text-align: center;
    margin: 2rem 0 3rem 0;
    `
const Logo = styled.div`
    text-align: center;
    left: 0;
    right: 0;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-top: 2rem;
    font-family: 'Lato', sans-serif;
`

const Form = styled.form`
    padding: 1rem 3rem 0;
    transition: all 250ms ease;
    & p {
        text-decoration: none;
        color: #8C11BE;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        padding-top: 1rem;
        cursor: pointer;
        &:hover {
            color: #222;
        }
    }
    & a {
        text-decoration: none;
    }
    `

const FormBox = styled.div`
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 10px;
    align-items: center;
    padding: 2rem 0 ;
    margin: 2rem auto 2rem;
    position: relative;
`

const Input = styled.input`
    width: 100%;
    border-style: none;
    border-width: 0 0 1px;
    border-bottom-style: dotted;
    margin-bottom: 20px;
    outline: 0;
    box-shadow: none;
    color: #404040;
    padding: 0.5rem 0.1rem;
    font-size: 20px;
    box-sizing: border-box;
    &::placeholder {
        color: #404040;
        font-size: 20px;
    }
`

const Button = styled.button`
    width: 100%;
    line-height: 2rem;
    padding: 15px 10px;
    font-size: 0.8rem;
    background-color: ${props => props.status ? '#A328D6' : '#FFFFFF'};
    border-width: 1px;
    border-color: #8C11BE;
    border-radius: 4px;
    color: #8C11BE;
    font-weight: bold;
    transition: all .25s ease-out;
    margin-top: 1rem;
    &:hover{
        cursor: pointer;
        background-color: #8C11BE;
        color: #fff;
    }
    & div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & div svg {
        width: 30px;
        height: 23px;
    }
`