import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroVeiculos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL2}/listagem-veiculos`;

  const [id, setId] = useState("");
  const [morador, setMorador] = useState("");
  const [placa, setPlaca] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [cor, setCor] = useState("");
  const [tipo, setTipo] = useState("");
  const [condominio, setCondominio] = useState("");
  const [unidade, setUnidade] = useState("");

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setMorador("");
      setPlaca("");
      setMarcaModelo("");
      setCor("");
      setTipo("");
      setCondominio("");
      setUnidade("");
    } else {
      setId(dados.id);
      setMorador(dados.morador);
      setPlaca(dados.placa);
      setMarcaModelo(dados.marca_modelo);
      setCor(dados.cor);
      setTipo(dados.tipo);
      setCondominio(dados.condominio);
      setUnidade(dados.unidade);
    }
  }

  async function salvar() {
    let data = {
      id,
      morador,
      placa,
      marca_modelo: marcaModelo,
      cor,
      tipo,
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
          mensagemSucesso(`Veículo cadastrado com sucesso!`);
          navigate(`/listagem-veiculos`);
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
          mensagemSucesso(`Veículo alterado com sucesso!`);
          navigate(`/listagem-veiculos`);
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
      setMorador(dados.morador);
      setPlaca(dados.placa);
      setMarcaModelo(dados.marca_modelo);
      setCor(dados.cor);
      setTipo(dados.tipo);
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
      <Card title="Cadastro de Veículos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Morador: *" htmlFor="inputMorador">
                <input
                  type="select"
                  id="inputMorador"
                  value={morador}
                  className="form-control"
                  name="morador"
                  onChange={(e) => setMorador(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Placa: *" htmlFor="inputPlaca">
                <input
                  type="text"
                  id="inputPlaca"
                  value={placa}
                  className="form-control"
                  name="placa"
                  onChange={(e) => setPlaca(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Marca/Modelo: *" htmlFor="inputMarcaModelo">
                <input
                  type="text"
                  id="inputMarcaModelo"
                  value={marcaModelo}
                  className="form-control"
                  name="marca_modelo"
                  onChange={(e) => setMarcaModelo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Cor: *" htmlFor="inputCor">
                <input
                  type="text"
                  id="inputCor"
                  value={cor}
                  className="form-control"
                  name="cor"
                  onChange={(e) => setCor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Tipo: *" htmlFor="inputTipo">
                <input
                  type="select"
                  id="inputTipo"
                  value={tipo}
                  className="form-control"
                  name="tipo"
                  onChange={(e) => setTipo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Condomínio: *" htmlFor="inputMorador">
                <input
                  type="select"
                  id="inputCondominio"
                  value={morador}
                  className="form-control"
                  name="morador"
                  onChange={(e) => setMorador(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Unidade: *" htmlFor="inputUnidade">
                <input
                  type="select"
                  id="inputUnidade"
                  value={unidade}
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

export default CadastroVeiculos;
