import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroPrestadoresServico() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/prestadores_servico`;

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [celularComercial, setCelularComercial] = useState("");
  const [celularPessoal, setCelularPessoal] = useState("");
  const [email, setEmail] = useState("");
  const [destino, setDestino] = useState("");

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNome("");
      setCpf("");
      setEmpresa("");
      setCelularComercial("");
      setCelularPessoal("");
      setEmail("");
      setDestino("");
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setEmpresa(dados.empresa);
      setCelularComercial(dados.celular_comercial);
      setCelularPessoal(dados.celular_pessoal);
      setEmail(dados.email);
      setDestino(dados.destino);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      cpf,
      empresa,
      celular_comercial: celularComercial,
      celular_pessoal: celularPessoal,
      email,
      destino,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(
            `Prestador de serviço ${nome} cadastrado com sucesso!`
          );
          navigate(`/listagem-prestadores_servico`);
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
          mensagemSucesso(`Prestador de serviço ${nome} alterado com sucesso!`);
          navigate(`/listagem-prestadores_servico`);
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
      setNome(dados.nome);
      setCpf(dados.cpf);
      setEmpresa(dados.empresa);
      setCelularComercial(dados.celular_comercial);
      setCelularPessoal(dados.celular_pessoal);
      setEmail(dados.email);
      setDestino(dados.destino);
    }
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Prestadores de Serviço">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  id="inputCpf"
                  value={cpf}
                  className="form-control"
                  name="cpf"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Empresa: *" htmlFor="inputEmpresa">
                <input
                  type="text"
                  id="inputEmpresa"
                  value={empresa}
                  className="form-control"
                  name="empresa"
                  onChange={(e) => setEmpresa(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Celular Comercial: *"
                htmlFor="inputCelularComercial"
              >
                <input
                  type="text"
                  id="inputCelularComercial"
                  value={celularComercial}
                  className="form-control"
                  name="celular_comercial"
                  onChange={(e) => setCelularComercial(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Celular Pessoal: *"
                htmlFor="inputCelularPessoal"
              >
                <input
                  type="text"
                  id="inputCelularPessoal"
                  value={celularPessoal}
                  className="form-control"
                  name="celular_pessoal"
                  onChange={(e) => setCelularPessoal(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="E-mail: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  value={email}
                  className="form-control"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Destino: *" htmlFor="inputDestino">
                <input
                  type="select"
                  id="inputDestino"
                  value={destino}
                  className="form-control"
                  name="destino"
                  onChange={(e) => setDestino(e.target.value)}
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

export default CadastroPrestadoresServico;
