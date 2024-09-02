import styled from "styled-components"
import React, { useContext, useEffect } from 'react';
import { ContatoContext } from "../Context/ContatosContext";
import DeleteIcon from "../../assets/excluir.png"
import EditIcon from "../../assets/editar.png"

const StyledTable = styled.div`
    margin: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`

const TableHeader = styled.div`
    color: white;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    padding: 10px;
    background-color: #068ED0;
    border-bottom: 2px solid #ddd;
`

const TableCell = styled.div`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    padding: 20px;
    background-color: #fff;
    border-bottom: 2px solid #ddd;
`
const StyledActionButton = styled.button`
    background-color: white;
    border: none;
    scale: 1.2;
    padding: 0 16px 0 16px;
    cursor: pointer;

    :hover{
        transform: translateY(-2px);
    }
`

const DadosCadastrados = () => {

    const { contatos, setContatos, setEditMode, setEditContato } = useContext(ContatoContext);

    const aoDeletar = (id) => {

        setContatos(prevContatos => prevContatos.filter(contato => contato.id !== id))

        var payload = {
            id: id
        };

        fetch("http://127.0.0.1/main/server.php",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(payload)
            })
            .then(function (res) { console.log(res) })
            .then(function (data) { console.log(data) })

    }

    const aoEditar = (contato) => {
        setEditContato(contato);
        setEditMode(true);
    }


    useEffect(() => {

        fetch("http://127.0.0.1/main/server.php", {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {

                if (Array.isArray(data) && data.length > 0) {
                    setContatos(data);
                } else {
                    setContatos([]); 
                }
            })
            .catch(error => console.error('Erro ao carregar contatos:', error));
    }, []);

    
    return (

        <StyledTable>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Data de Nascimento</TableHeader>
            <TableHeader>E-mail</TableHeader>
            <TableHeader>Celular para Contato</TableHeader>
            <TableHeader>Ações</TableHeader>

            {contatos.map((contato, index) => (
                <React.Fragment key={index}>
                    <TableCell>{contato.nome}</TableCell>
                    <TableCell>{contato.dataNascimento}</TableCell>
                    <TableCell>{contato.email}</TableCell>
                    <TableCell>{contato.celular}</TableCell>
                    <TableCell>
                        <StyledActionButton onClick={() => aoEditar(contato)}>
                            <img src={EditIcon} />
                        </StyledActionButton>
                        <StyledActionButton onClick={() => aoDeletar(contato.id)} >
                            <img src={DeleteIcon} />
                        </StyledActionButton>
                    </TableCell>
                </React.Fragment>
            ))}

        </StyledTable>
    )
}

export default DadosCadastrados