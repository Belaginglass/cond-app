import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroEncomenda() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL2}/encomenda`;

    const [id, setId] = useState("");
    const [destinatario, setDestinatario] = useState("");
    const [data_hora, setDataHora] = useState("");
    const [recebedor, setRecebedor] = useState("");

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId("");
            setDestinatario("");
            setDataHora("");
            setRecebedor("");
        } else {
            setId(dados.id);
            setDestinatario(dados.destinatario);
            setDataHora(dados.data_hora);
            setRecebedor(dados.recebedor);
        }
    }

    async function salvar() {
        let data = {
            id,
            destinatario,
            data_hora,
            recebedor,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then(function (response) {
                    mensagemSucesso(`Encomenda para ${destinatario} cadastrada com sucesso!`);
                    navigate(`/listagem-encomenda`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        } else {
            await axios
                .put(`${baseURL}/${idParam}`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then(function (response) {
                    mensagemSucesso(`Encomenda para ${destinatario} alterada com sucesso!`);
                    navigate(`/listagem-encomendas`);
                })
                .catch(function (error) {
                    mensagemErro(error.response.data);
                });
        }
    }

    async function buscar() {
        if (idParam != null) {
            await axios.get(`${baseURL}/${idParam}`).then((response) => {
                setDados(response.data);
            });
            setId(dados.id);
            setDestinatario(dados.destinatario);
            setDataHora(dados.data_hora);
            setRecebedor(dados.recebedor);
        }
    }

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;

    return (
        <div className="container">
            <Card title="Cadastro de Encomendas">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Destinatário: *" htmlFor="inputDestinatario">
                                <input
                                    type="text"
                                    id="inputDestinatario"
                                    value={destinatario}
                                    className="form-control"
                                    name="destinatario"
                                    onChange={(e) => setDestinatario(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Data e Hora: *" htmlFor="inputDataHora">
                                <input
                                    type="datetime-local"
                                    id="inputDataHora"
                                    value={data_hora}
                                    className="form-control"
                                    name="data_hora"
                                    onChange={(e) => setDataHora(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Recebedor: *" htmlFor="inputRecebedor">
                                <input
                                    type="text"
                                    id="inputRecebedor"
                                    value={recebedor}
                                    className="form-control"
                                    name="recebedor"
                                    onChange={(e) => setRecebedor(e.target.value)}
                                />
                            </FormGroup>
                            <Stack spacing={1} padding={1} direction="row">
                                <button
                                    onClick={salvar}
                                    type="button"
                                    className="btn btn-success"
                                >
                                    Salvar
                                </button>
                                <button
                                    onClick={inicializar}
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Cancelar
                                </button>
                            </Stack>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CadastroEncomenda;
