import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContatoContext } from '../Context/ContatosContext';
import { v4 as uuidv4 } from 'uuid';

const StyledForm = styled.form`
    padding: 40px;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 120px;
    align-items: center;
`;

const StyledLabel = styled.label`
    color: #696969;
    font-weight: 600;
    font-size: 24px;
`;

const StyledTextInput = styled.input`
    width: auto;
    border: none;
    border-bottom: 2px solid #696969;
    padding-bottom: 4px;
    font-size: 24px;
    width: 400px;
    background-color: white;
`;

const StyledTextInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    height: 60px;
`;

const HiddenCheckbox = styled.input`
    display: none;
`;

const StyledCheckboxLabel = styled.label`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #696969;
    border-radius: 4px;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    transition: background-color 0.6s;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background-color: transparent;
        transition: background-color 0.6s, color 0.6s;
    }

    input:checked + &::after {
        content: '✔';
        display: block;
        color: #fff;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        background-color: #068ED0;
    }
`;

const StyledCheckboxInputBox = styled.div`
    padding: 48px;
    display: flex;
    align-items: center;
    gap: 24px;
`;

const StyledSubmitButton = styled.button`
    padding: 16px 24px;
    width: 360px;
    margin-left: 190px;
    height: 80px;
    font-size: 28px;
    color: #fff;
    background-color: #56B2DF;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;


const Formulario = () => {


    const { contatos,  setContatos, editMode, setEditMode, editContato, setEditContato } = useContext(ContatoContext);
    const [novoContato, setNovoContato] = useState({
        id: '',
        nome: '',
        dataNascimento: '',
        telefone: '',
        profissao: '',
        email: '',
        celular: '',
        whatsapp: false,
        notificacoesEmail: false,
        notificacoesSms: false
    });

    useEffect(() => {
        if (editContato) {
            setNovoContato(editContato);
        }
    }, [editContato]);

    const aoAlterado = (event) => {
        const { name, value, type, checked } = event.target;
        setNovoContato(prevContato => ({
            ...prevContato,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const aoSalvar = (evento) => {
        evento.preventDefault();


        if (editMode) {
            setContatos(prevContatos => prevContatos.map(contato =>
                contato.id === editContato.id ? novoContato : contato
            ))

            var payload = {
                id: novoContato.id,
                nome: novoContato.nome,
                dataNascimento: novoContato.dataNascimento,
                telefone: novoContato.telefone,
                profissao: novoContato.profissao,
                email: novoContato.email,
                celular: novoContato.celular,
                whatsapp: novoContato.whatsapp ? "true" : "false",
                notificacoesEmail: novoContato.notificacoesEmail ? "true" : "false",
                notificacoesSms: novoContato.notificacoesSms ? "true" : "false",
            };
            // console.log("Payload enviado edit:", JSON.stringify(payload, null, 2))


            fetch("http://127.0.0.1/main/server.php",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json" // Adiciona o cabeçalho Content-Type
                    },
                    body: JSON.stringify(payload)
                })
                .then(function (res) { console.log(res) })
                .then(function (data) { console.log(data) })

                ;
        } else {

            novoContato.id = uuidv4();

            var payload = {
                id: novoContato.id,
                nome: novoContato.nome,
                dataNascimento: novoContato.dataNascimento,
                telefone: novoContato.telefone,
                profissao: novoContato.profissao,
                email: novoContato.email,
                celular: novoContato.celular,
                whatsapp: novoContato.whatsapp ? "true" : "false",
                notificacoesEmail: novoContato.notificacoesEmail ? "true" : "false",
                notificacoesSms: novoContato.notificacoesSms ? "true" : "false",
            };

            // console.log("Payload enviado create:", JSON.stringify(payload, null, 2))

            // console.log("novo contato:", JSON.stringify(novoContato, null, 2));

            setContatos(prevContatos => [...prevContatos, novoContato]);

            // console.log("contato apos set", JSON.stringify(contatos, null, 2));

            

            fetch("http://127.0.0.1/main/server.php",
                {
                    method: "POST",
                    body: JSON.stringify(payload)
                })
                .then(function (res) { console.log(res) })
                .then(function (data) { console.log(data) })

        }


        setNovoContato({
            nome: '',
            dataNascimento: '',
            telefone: '',
            profissao: '',
            email: '',
            celular: '',
            whatsapp: false,
            notificacoesEmail: false,
            notificacoesSms: false
        });

        setEditMode(false);
        setEditContato(null);

    };


    return (
        <StyledForm onSubmit={aoSalvar}>
            <StyledTextInputBox>
                <StyledLabel> Nome completo </StyledLabel>
                <StyledTextInput
                    type="text"
                    name="nome"
                    value={novoContato.nome}
                    onChange={aoAlterado}
                    placeholder="Ex.: Leticia Pacheco dos Santos"
                required
                />
            </StyledTextInputBox>
            <StyledTextInputBox>
                <StyledLabel> Data de Nascimento </StyledLabel>
                <StyledTextInput
                    type="text"
                    name="dataNascimento"
                    value={novoContato.dataNascimento}
                    onChange={aoAlterado}
                    placeholder="Ex.: 03/10/2003"
                required
                />
            </StyledTextInputBox>
            <StyledTextInputBox>
                <StyledLabel> E-mail </StyledLabel>
                <StyledTextInput
                    type="email"
                    name="email"
                    value={novoContato.email}
                    onChange={aoAlterado}
                    placeholder="Ex.: leticia@gmail.com"
                required
                />
            </StyledTextInputBox>
            <StyledTextInputBox>
                <StyledLabel> Profissão </StyledLabel>
                <StyledTextInput
                    type="text"
                    name="profissao"
                    value={novoContato.profissao}
                    onChange={aoAlterado}
                    placeholder="Ex.: Desenvolvedora Web"
                required
                />
            </StyledTextInputBox>
            <StyledTextInputBox>
                <StyledLabel> Telefone para contato </StyledLabel>
                <StyledTextInput
                    type="text"
                    name="telefone"
                    value={novoContato.telefone}
                    onChange={aoAlterado}
                    placeholder="Ex.: (11) 4033-2019"
                required
                />
            </StyledTextInputBox>
            <StyledTextInputBox>
                <StyledLabel> Celular para contato </StyledLabel>
                <StyledTextInput
                    type="text"
                    name="celular"
                    value={novoContato.celular}
                    onChange={aoAlterado}
                    placeholder="(11) 98493-2039"
                required
                />
            </StyledTextInputBox>
            <StyledCheckboxInputBox>
                <HiddenCheckbox
                    type="checkbox"
                    id="whatsapp"
                    name="whatsapp"
                    checked={novoContato.whatsapp}
                    onChange={aoAlterado}
                />
                <StyledCheckboxLabel htmlFor="whatsapp" />
                <StyledLabel htmlFor="whatsapp"> Número de celular possui Whatsapp </StyledLabel>
            </StyledCheckboxInputBox>
            <StyledCheckboxInputBox>
                <HiddenCheckbox
                    type="checkbox"
                    id="notificacoesEmail"
                    name="notificacoesEmail"
                    checked={novoContato.notificacoesEmail}
                    onChange={aoAlterado}
                />
                <StyledCheckboxLabel htmlFor="notificacoesEmail" />
                <StyledLabel htmlFor="notificacoesEmail"> Receber notificações por e-mail </StyledLabel>
            </StyledCheckboxInputBox>
            <StyledCheckboxInputBox>
                <HiddenCheckbox
                    type="checkbox"
                    id="notificacoesSms"
                    name="notificacoesSms"
                    checked={novoContato.notificacoesSms}
                    onChange={aoAlterado}
                />
                <StyledCheckboxLabel htmlFor="notificacoesSms" />
                <StyledLabel htmlFor="notificacoesSms"> Receber notificações por SMS </StyledLabel>
            </StyledCheckboxInputBox>
            <StyledSubmitButton type="submit">{editMode ? 'Atualizar Contato' : 'Cadastrar Contato'}</StyledSubmitButton>
        </StyledForm>
    );
};

export default Formulario;
