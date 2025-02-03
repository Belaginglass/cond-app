import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroRealizacaoObras() {
    const { idParam } = useParams();

    const navigate = useNavigate();

    const baseURL = `${BASE_URL2}/realizacao_obras`;

    const [id, setId] = useState("");
    const [dataInicio, setDataInicio] = useState("");
    const [dataTermino, setDataTermino] = useState("");
    const [empresaPrestadora, setEmpresaPrestadora] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState("");

    const [dados, setDados] = useState([]);

    function inicializar() {
        if (idParam == null) {
            setId("");
            setDataInicio("");
            setDataTermino("");
            setEmpresaPrestadora("");
            setDescricao("");
            setStatus("");
        } else {
            setId(dados.id);
            setDataInicio(dados.data_inicio);
            setDataTermino(dados.data_termino);
            setEmpresaPrestadora(dados.empresa_prestadora);
            setDescricao(dados.descricao);
            setStatus(dados.status);
        }
    }

    async function salvar() {
        let data = {
            id,
            data_inicio: dataInicio,
            data_termino: dataTermino,
            empresa_prestadora: empresaPrestadora,
            descricao,
            status,
        };
        data = JSON.stringify(data);
        if (idParam == null) {
            await axios
                .post(baseURL, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then(function (response) {
                    mensagemSucesso(`Realização de obra cadastrada com sucesso!`);
                    navigate(`/listagem-realizacao_obras`);
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
                    mensagemSucesso(`Realização de obra alterada com sucesso!`);
                    navigate(`/listagem-realizacao_obras`);
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
            setDataInicio(dados.data_inicio);
            setDataTermino(dados.data_termino);
            setEmpresaPrestadora(dados.empresa_prestadora);
            setDescricao(dados.descricao);
            setStatus(dados.status);
        }
    }

    useEffect(() => {
        buscar();
    }, [id]);

    if (!dados) return null;

    return (
        <div className="container">
            <Card title="Cadastro de Realização de Obras">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Data de Início: *" htmlFor="inputDataInicio">
                                <input
                                    type="date"
                                    id="inputDataInicio"
                                    value={dataInicio}
                                    className="form-control"
                                    name="data_inicio"
                                    onChange={(e) => setDataInicio(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Data de Término: *" htmlFor="inputDataTermino">
                                <input
                                    type="date"
                                    id="inputDataTermino"
                                    value={dataTermino}
                                    className="form-control"
                                    name="data_termino"
                                    onChange={(e) => setDataTermino(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Empresa Prestadora: *" htmlFor="inputEmpresaPrestadora">
                                <input
                                    type="text"
                                    id="inputEmpresaPrestadora"
                                    value={empresaPrestadora}
                                    className="form-control"
                                    name="empresa_prestadora"
                                    onChange={(e) => setEmpresaPrestadora(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                                <input
                                    type="text"
                                    id="inputDescricao"
                                    value={descricao}
                                    className="form-control"
                                    name="descricao"
                                    onChange={(e) => setDescricao(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup label="Status: *" htmlFor="inputStatus">
                                <input
                                    type="text"
                                    id="inputStatus"
                                    value={status}
                                    className="form-control"
                                    name="status"
                                    onChange={(e) => setStatus(e.target.value)}
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

export default CadastroRealizacaoObras;
