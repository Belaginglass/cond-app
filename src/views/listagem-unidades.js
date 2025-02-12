import React from 'react';

import Card from '../components/card';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/unidades`;

function ListagemUnidades() {

    const navigate = useNavigate();

    const cadastrar = () => {
        navigate(`/cadastro-unidade`);
    };

    const editar = (id) => {
        navigate(`/cadastro-unidade/${id}`);
    };
    
    const [dados, setDados] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
          setDados(response.data);
        });
      }, []);
    
      if (!dados) return null;
    
    
    return (
        <div className='container'>
        <Card title='Listagem de Unidades'>
            <div className='row'>
            <div className='col-lg-12'>
                <div className='bs-component'>
                { <button
                    type='button'
                    class='btn btn-warning'
                    onClick={() => cadastrar()}
                >
                    Nova Unidade
                </button> }
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th scope='col'>Condominio</th>
                        <th scope='col'>Bloco</th>
                        <th scope='col'>Rua</th>
                        <th scope='col'>Número</th>
                        <th scope='col'>Pet Friendly</th>
                        <th scope='col'>Quantidade de Vagas</th>
                        <th scope='col'>Ações</th>
                    </tr>
                    </thead>
                    {<tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                        <td>{dado.idCondominio}</td>
                        <td>{dado.bloco}</td>
                        <td>{dado.rua}</td>
                        <td>{dado.numero}</td>
                        <td>{dado.petFriendly}</td>
                        <td>{dado.quantidadeVagas}</td>
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
                                //onClick={() => excluir(dado.id)}
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
export default ListagemUnidades;