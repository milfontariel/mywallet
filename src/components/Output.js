import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contexts from "../Contexts";
import {mask, unMask} from 'remask';

export default function Output(){

    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { token } = useContext(Contexts);
    async function handlerPut(e){
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/output', {
                value,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setValue('');
            setDescription('');
            setTimeout(() => {
                navigate('/home');
            }, 500);
        } catch (error) {
            if(error.response.status === 401){
                navigate('/');
            }
            console.log(error.response);
        }
    }

    function handleChange(e) {
        let originalValue = unMask(e.target.value);
        const maskedValue = mask(originalValue, [
            "9,9","9,99","99,99", "999,99", "9.999,99",
            "99.999,99", "999.999,99", "9.999.999,99",
            "99.999.999,99", "999.999.999,99", "9.999.999.999,99"
        ]);
        setValue(maskedValue);
    }

    return (
        <Container>
            <Header>
                <Title>Nova saída</Title>
            </Header>
            <Resume>
                <Form onSubmit={handlerPut}>
                    <Input type="text" placeholder="Valor" value={value} onChange={e => handleChange(e)}></Input>
                    <Input type="text" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></Input>
                    <Button>SALVAR SAÍDA</Button>
                    <Link to={'/home'}><p>Cancelar</p></Link>
                </Form>
            </Resume>
        </Container>
    )
}

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
    font-family: 'Lato', sans-serif;
    &::placeholder {
        color: #404040;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
    }
`

const Form = styled.form`
    width: 90%;
    padding: 1rem 0;
    transition: all 250ms ease;
    margin-top: 1rem;
    & p {
        text-decoration: none;
        color: #222;
        font-weight: normal;
        font-size: 1rem;
        text-align: center;
        cursor: pointer;
    }
    & a {
        text-decoration: none;
    }
    & a:hover {
        text-decoration: underline;
    }
`

const Resume = styled.div`
    width: 100%;
    max-width: 500px;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;
    gap: 1rem;
    overflow: hidden;
`

const Title = styled.h1`
    font-size: 1.6rem;
    font-weight: bold;
    color: #fff;
    margin: .8rem 0;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Container = styled.div`
    width: 100%;
    max-width: calc(500px + 2rem);
    height: 100vh;
    margin: 0 auto;
    padding: .8rem 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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