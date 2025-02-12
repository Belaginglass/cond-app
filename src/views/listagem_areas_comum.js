import React from "react";

import Card from "../components/card";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

const baseURL = `${BASE_URL2}/areas_comum`;

function ListagemAreasComum() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-areas_comum`);
  };

  const editar = (id) => {
    navigate(`/cadastro-areas_comum/${id}`);
  };

  const [dados, setDados] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Listagem de Áreas Comum">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => cadastrar()}
                >
                  Nova Área Comum
                </button>
              }
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Capacidade Máxima de Pessoas: </th>
                    <th scope="col">Horário Ínicio</th>
                    <th scope="col">Horário Fim: </th>
                    <th scope="col">Condomínio: </th>
                    <th scope="col">Unidade: </th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.descricao}</td>
                        <td>{dado.capacidade_max}</td>
                        <td>{dado.horario_inicio}</td>
                        <td>{dado.horario_fim}</td>
                        <td>{dado.condominio}</td>
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
                                //onClick={() => excluir(dado.id)}
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
export default ListagemAreasComum;
