import React from 'react';

import Card from '../components/card';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ListagemCondominio() {
    const [dados, setDados] = React.useState(null);

    
    return (
        <div className='container'>
        <Card title='Listagem de Condominio'>
            <div className='row'>
            <div className='col-lg-12'>
                <div className='bs-component'>
                { <button
                    type='button'
                    class='btn btn-warning'
                    // onClick={() => cadastrar()}
                >
                    Novo Condominio
                </button> }
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Tipo de Condominio</th>
                        <th scope='col'>Exige Indentificacao</th>
                        <th scope='col'>Chave de Acesso</th>
                    </tr>
                    </thead>
                    {/* <tbody>
                    {dados.map((dado) => (
                        <tr key={dado.id}>
                        <td>{dado.nome}</td>
                        <td>{dado.tipoCondominio}</td>
                        <td>{dado.quantidadePortarias}</td>
                        <td>{dado.quantidadeUnidades}</td>
                        <td>{dado.quantidadeBlocos}</td>
                        <td>{dado.exigeIndentificacao}</td>
                        <td>{dado.chaveAcesso}</td>
                        <td>
                            {<Stack spacing={1} padding={0} direction='row'>
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
export default ListagemCondominio;