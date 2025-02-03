import React from "react";

import Card from "../components/card";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/usuarios`;

function ListagemUsuarios() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-usuario`);
  };

  const editar = (id) => {
    navigate(`/cadastro-usuario/${id}`);
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
      <Card title="Listagem de Usuários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => cadastrar()}
                >
                  Novo Usuário
                </button>
              }
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.email}</td>
                        <td>{dado.cpf}</td>
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
                                // onClick={() => excluir(dado.id)}
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
export default ListagemUsuarios;
