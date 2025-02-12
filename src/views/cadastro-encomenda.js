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
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [recebedor, setRecebedor] = useState("");
  const [condominio, setCondominio] = useState("");
  const [unidade, setUnidade] = useState(0);

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setDestinatario("");
      setData("");
      setHora("");
      setRecebedor("");
      setCondominio("");
      setUnidade("");
    } else {
      setId(dados.id);
      setDestinatario(dados.destinatario);
      setData(dados.data);
      setHora(dados.hora);
      setRecebedor(dados.recebedor);
      setCondominio(dados.condominio);
      setUnidade(dados.unidade);
    }
  }

  async function salvar() {
    let data = {
      id,
      destinatario,
      data,
      hora,
      recebedor,
      condominio,
      unidade,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(
            `Encomenda para ${destinatario} cadastrada com sucesso!`
          );
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
          mensagemSucesso(
            `Encomenda para ${destinatario} alterada com sucesso!`
          );
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
      setData(dados.data);
      setHora(dados.hora);
      setRecebedor(dados.recebedor);
      setCondominio(dados.condominio);
      setUnidade(dados.unidade);
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
              <FormGroup label="Data da entrega: *" htmlFor="inputData">
                <input
                  type="date"
                  id="inputData"
                  value={data}
                  className="form-control"
                  name="data"
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Hora da entrega: *" htmlFor="inputHora">
                <input
                  type="time"
                  id="inputHora"
                  value={hora}
                  className="form-control"
                  name="Hora"
                  onChange={(e) => setHora(e.target.value)}
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
              <FormGroup label="Condomínio: *" htmlFor="inputCondominio">
                <select
                  id="inputCondominio"
                  value={condominio}
                  className="form-control"
                  name="condominio"
                  onChange={(e) => setCondominio(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {dados.condominios &&
                    dados.condominios.map((condominio) => (
                      <option key={condominio.id} value={condominio.id}>
                        {condominio.nome}
                      </option>
                    ))}
                </select>
              </FormGroup>
              <FormGroup label="Unidade: *" htmlFor="inputUnidade">
                <input
                  type="number"
                  id="inputUnidade"
                  value={unidade}
                  min={0}
                  className="form-control"
                  name="unidade"
                  onChange={(e) => setUnidade(e.target.value)}
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
