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

const baseURL = `${BASE_URL2}/encomenda`;

function ListagemEncomenda() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-encomenda`);
  };

  const editar = (id) => {
    navigate(`/cadastro-encomenda/${id}`);
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
        mensagemSucesso(`Encomenda excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir Encomenda`);
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
      <Card title="Listagem de Encomendas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => cadastrar()}
                >
                  Nova Encomenda
                </button>
              }
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Destinatário</th>
                    <th scope="col">Data da entrega</th>
                    <th scope="col">Hora da entrega</th>
                    <th scope="col">Recebedor</th>
                    <th scope='col'>Condominio</th>
                    <th scope='col'>Unidade</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.destinatario}</td>
                        <td>{dado.data}</td>
                        <td>{dado.hora}</td>
                        <td>{dado.recebedor}</td>
                        <td>{dado.idCondominio}</td>
                        <td>{dado.idUnidade}</td>
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
export default ListagemEncomenda;
