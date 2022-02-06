import axios from "axios"
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Contexts from "../Contexts";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Summary() {
    const MySwal = withReactContent(Swal);
    const { token, summaryItems, setSummaryItems } = useContext(Contexts);
    const navigate = useNavigate();
    const config = {
        headers:
        {
            "Authorization": `Bearer ${token}`
        }
    }
    useEffect(() => {
        getSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function deleteItem(id) {
        try {
            MySwal.fire({
                toast: true,
                title: 'Você tem certeza?',
                text: "Você não pode reverter esta ação!",
                icon: 'warning',
                iconColor: '#8C11BE',
                showCancelButton: true,
                confirmButtonText: 'Sim, apagar!',
                confirmButtonColor: '#8C11BE',
                cancelButtonText: 'Não, cancelar!',
                cancelButtonColor: '#a6a6a6',
                reverseButtons: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:5000/summary-history/${id}`, config);
                    getSummary();
                    MySwal.fire(
                        {
                            title: 'Apagado!',
                            text: 'Seu registro foi apagado.',
                            icon: 'success',
                            iconColor: '#8C11BE',
                            confirmButtonColor: '#8C11BE',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000
                        }
                    );
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    MySwal.fire(
                        {
                            title: 'Cancelado',
                            text: 'Seu registro continua salvo.',
                            icon: 'error',
                            iconColor: '#8C11BE',
                            confirmButtonColor: '#8C11BE',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000
                        }
                    )
                }
            })
        } catch (error) {
            console.log("DEU MERDA");
        }
    }

    async function getSummary() {
        if (!token) {
            navigate('/');
            return
        }
        try {
            const promise = await axios.get('http://localhost:5000/summary-history', config);
            setSummaryItems(promise.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ul>
            {summaryItems.reverse().map((item) => {
                return (
                    <Item key={item._id}>
                        <div>
                            <Date>{item.date}</Date>
                            <Desc>{item.description}</Desc>
                        </div>
                        <div>
                            <Value type={item.type}>{item.value}</Value>
                            <DeleteButton onClick={() => deleteItem(item._id)}>x</DeleteButton>
                        </div>
                    </Item>
                )
            })}
        </ul>
    )
}

export default Summary;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: #c6c6c6;
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
        color: #222;
    }
`

const Value = styled.span`
    color: ${props => (props.type === 'input') ? "#03AC00" : "#C70000"};
    text-align: right;
    padding-right: .5rem;
`
const Desc = styled.p`
    margin: 0;
`

const Item = styled.li`
    padding: .5rem .2rem;
    display: flex;
    justify-content: space-between;
    transition: all .2s ease-out;
    &:hover{
        background: #fbfbfb;
        cursor: pointer;
        border-radius: 5px;
    }
    & div {
        display: flex;
        gap: 1rem;
    }
`

const Date = styled.span`
    font-size: 1rem;
    font-weight: normal;
    color: #c6c6c6;
    text-align: left;
`