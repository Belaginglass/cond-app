import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/moradores`;

function ListagemMoradores() {

    const navigate = useNavigate();

    const cadastrar = () => {
        navigate(`/cadastro-morador`);
    };

    const editar = (id) => {
        navigate(`/cadastro-morador/${id}`);
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
            mensagemSucesso(`Morador excluído com sucesso!`);
            setDados(
              dados.filter((dado) => {
                return dado.id !== id;
              })
            );
          })
          .catch(function (error) {
            mensagemErro(`Erro ao excluir o Morador`);
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
        <div className='container'>
        <Card title='Listagem de Moradores'>
            <div className='row'>
            <div className='col-lg-12'>
                <div className='bs-component'>
                { <button
                    type='button'
                    className='btn btn-warning'
                     onClick={() => cadastrar()}
                >
                    Novo Morador
                </button> }
                <table className='table table-hover'>
                    <thead>
                    <tr>
                    <th scope='col'>Nome</th>
                        <th scope='col'>CPF</th>
                        <th scope='col'>Condominio</th>
                        <th scope='col'>Unidade</th>
                        <th scope='col'>Celular Pessoal</th>
                        <th scope='col'>Celular Comercial</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Status de Proprietario</th>
                        <th scope='col'>Ações</th>
                    </tr>
                    </thead>
                    { <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.CPF}</td>
                        <td>{dado.idCondominio}</td>
                        <td>{dado.idUnidade}</td>
                        <td>{dado.celularPessoal}</td>
                        <td>{dado.celularComercial}</td>
                        <td>{dado.email}</td>
                        <td>{dado.statusProprietario}</td>
                        <td>
                            { <Stack spacing={1} padding={0} direction='row'>
                            <IconButton
                                aria-label='edit'
                                onClick={() => editar(dado.id)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label='delete'
                                onClick={() => excluir(dado.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            </Stack> }
                        </td>
                        </tr>
                    ))}
                    </tbody> }
                </table>{' '}
                </div>
            </div>
            </div>
        </Card>
        </div>
    );
}
export default ListagemMoradores;