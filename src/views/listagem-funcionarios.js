import React from 'react';

import Card from '../components/card';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemUsuarios() {
    const [dados, setDados] = React.useState(null);

   
    
    return (
        <div className='container'>
        <Card title='Listagem de Funcionário'>
            <div className='row'>
            <div className='col-lg-12'>
                <div className='bs-component'>
                { <button
                    type='button'
                    class='btn btn-warning'
                    // onClick={() => cadastrar()}
                >
                    Novo Funcionário
                </button>}
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th scope='col'>Email</th>
                        <th scope='col'>CPF</th>
                        <th scope='col'>Senha</th>
                        <th scope='col'>Ações</th>
                    </tr>
                    </thead>
                    {/* <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.cpf}</td>
                        <td>{dado.empresa}</td>
                        <td>{dado.celularPessoal}</td>
                        <td>{dado.celularComercial}</td>
                        <td>{dado.email}</td>
                        <td>{dado.senha}</td>
                        <td>
                            {/<Stack spacing={1} padding={0} direction='row'>
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
                            </Stack>}
                        </td>
                        </tr>
                    ))}
                    </tbody> */}
                </table>{' '}
                </div>
            </div>
            </div>
        </Card>
        </div>
    );
}
export default ListagemUsuarios;