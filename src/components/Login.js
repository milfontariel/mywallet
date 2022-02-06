import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contexts from "../Contexts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BASE_URL from "../services/api";

export default function Login() {
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, setName } = useContext(Contexts);

    async function handlerLogin(e) {
        e.preventDefault();
        try {
            const loginData = {
                email,
                password
            };
            const { data } = await axios.post(`${BASE_URL}/`, loginData);
            setToken(data.token);
            setName(data.name);
            navigate('/home');
        } catch (error) {
            const msg = error.response.data;
            await MySwal.fire(
                {
                    title: `${msg}`,
                    icon: 'error',
                    iconColor: '#8C11BE',
                    confirmButtonColor: '#8C11BE',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000
                }
            );
        }
    }


    return (
        <Container>
            <Logo>MyWallet</Logo>
            <FormBox>
                <Info>Faça seu login</Info>
                <Form onSubmit={handlerLogin}>
                    <Input required type='email' placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)}></Input>
                    <Input required type='password' placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}></Input>
                    <Button type='submit'>ENTRAR</Button>
                    <Link to={'/register'}><p>Primeira vez? Cadastre-se!</p></Link>
                </Form>
            </FormBox>
        </Container>
    )
}

const Container = styled.div`
    background-color: #8C11BE;
    background-image: linear-gradient(330deg, #8c11be 0%, #a111be 100%);
    width: 100%;
    max-width: 500px;
    height: 100vh;
    margin:0 auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
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
    margin-bottom: 1rem;
    & p {
        text-decoration: none;
        color: #8C11BE;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
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
    gap: 10px;
    align-items: center;
    padding: 2rem 0 ;
    margin: 2rem auto 2rem;
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
    margin: 2rem 0;
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