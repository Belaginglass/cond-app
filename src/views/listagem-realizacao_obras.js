import React from "react";

import Card from "../components/card";
import { mensagemSucesso, mensagemErro } from '../components/toastr';


import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

const baseURL = `${BASE_URL2}/realizacao_obras`;

function ListagemRealizacaoObras() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-realizacao_obras`);
  };

  const editar = (id) => {
    navigate(`/cadastro-realizacao_obras/${id}`);
  };

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Requisição de Obra excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o Requisição de Obra`);
      });
  }

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Requisições de Obras">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => cadastrar()}
                >
                  Nova Requisição de Obra
                </button>
              }
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Condomínio</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">Data de início</th>
                    <th scope="col">Data de término</th>
                    <th scope="col">Empresa prestadora</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Status</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.condominio}</td>
                        <td>{dado.unidade}</td>
                        <td>{dado.data_inicio}</td>
                        <td>{dado.data_termino}</td>
                        <td>{dado.empresa_prestadora}</td>
                        <td>{dado.descricao}</td>
                        <td>{dado.status}</td>
                        <td>
                          {
                            <Stack spacing={1} padding={0} direction="row">
                              <IconButton
                                aria-label="edit"
                                onClick={() => editar(dado.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => excluir(dado.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                }
              </table>{" "}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default ListagemRealizacaoObras;
