import React from 'react';

import ListagemUsuarios from './views/listagem-usuarios';
import ListagemCondominios from './views/listagem-condominios';
import ListagemUnidades from './views/listagem-unidades';
import ListagemFuncionarios from './views/listagem-funcionarios';

import CadastroUsuario from './views/cadastro-usuario';
import CadastroCondominio from './views/cadastro-condominio';
import CadastroUnidade from './views/cadastro-unidade';
import CadastroFuncionario from './views/cadastro-funcionario';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
    return (
        <BrowserRouter>
        <Routes>
            <Route
            path='/cadastro-usuario/:idParam?'
            element={<CadastroUsuario />}
            />
            <Route
            path='/cadastro-condominio/:idParam?'
            element={<CadastroCondominio />}
            />
            <Route
            path='/cadastro-unidade/:idParam?'
            element={<CadastroUnidade />}
            />
            <Route
            path='/cadastro-funcionario/:idParam?'
            element={<CadastroFuncionario />}
            />
            
            <Route path='/listagem-usuarios' element={<ListagemUsuarios />} 
            />
            <Route path='/listagem-condominios' element={<ListagemCondominios />} 
            />
            <Route path='/listagem-unidades' element={<ListagemUnidades />} 
            />
            <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} 
            />
        </Routes>
        </BrowserRouter>
    );
}
  
export default Rotas;