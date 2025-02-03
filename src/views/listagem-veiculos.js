import React from "react";

import Card from "../components/card";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL2 } from "../config/axios";

const baseURL = `${BASE_URL2}/veiculos`;

function ListagemVeiculos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-veiculos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-veiculos/${id}`);
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
      <Card title="Listagem de Veículos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              {
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => cadastrar()}
                >
                  Novo Veículo
                </button>
              }
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Placa</th>
                    <th scope="col">Marca/Modelo</th>
                    <th scope="col">Cor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Unidade</th>
                  </tr>
                </thead>
                {
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.placa}</td>
                        <td>{dado.marca_modelo}</td>
                        <td>{dado.cor}</td>
                        <td>{dado.tipo}</td>
                        <td>{dado.unidade}</td>
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
export default ListagemVeiculos;
