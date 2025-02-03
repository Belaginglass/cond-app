import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

//import '../custom.css';

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroAreasComum() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/areas_comum`;

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState(false);
  const [capacidade_max, setCapacidadeMax] = useState(0);
  const [horario_utilizacao, setHorarioUtilizacao] = useState(0);
  const [restricoes, setRestricoes] = useState(0);

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNome("");
      setDescricao("");
      setCapacidadeMax("");
      setHorarioUtilizacao("");
      setRestricoes("");
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDescricao(dados.descricao);
      setCapacidadeMax(dados.capacidade_max);
      setHorarioUtilizacao(dados.horario_utilizacao);
      setRestricoes(dados.restricoes);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      descricao,
      capacidade_max,
      horario_utilizacao,
      restricoes,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Área Comum ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-areas_comum`);
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
          mensagemSucesso(`Área Comum ${nome} alterado com sucesso!`);
          navigate(`/listagem-areas_comum`);
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
      setDescricao(dados.descricao);
      setCapacidadeMax(dados.capacidade_max);
      setHorarioUtilizacao(dados.horario_utilizacao);
      setRestricoes(dados.restricoes);
    }
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Áreas Comum">
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
              <FormGroup
                label="Capacidade Máxima: *"
                htmlFor="inputCapacidadeMax"
              >
                <input
                  type="text"
                  id="inputCapacidadeMax"
                  value={capacidade_max}
                  className="form-control"
                  name="capacidade_max"
                  onChange={(e) => setCapacidadeMax(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="HorarioUtilizacao: *"
                htmlFor="inputHorarioUtilizacao"
              >
                <input
                  type="text"
                  id="inputHorarioUtilizacao"
                  value={horario_utilizacao}
                  className="form-control"
                  name="HorarioUtilizacao"
                  onChange={(e) => setHorarioUtilizacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Restricoes: *" htmlFor="inputRestricoes">
                <input
                  type="text"
                  id="inputRestricoes"
                  value={restricoes}
                  className="form-control"
                  name="Restricoes"
                  onChange={(e) => setRestricoes(e.target.value)}
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

export default CadastroAreasComum;
