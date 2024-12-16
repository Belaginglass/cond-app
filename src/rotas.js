import React from 'react';

import ListagemUsuarios from './views/listagem-usuarios';
import ListagemCondominios from './views/listagem-condominios';
import ListagemUnidades from './views/listagem-unidades';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemMoradores from './views/listagem-moradores';

import CadastroUsuario from './views/cadastro-usuario';
import CadastroCondominio from './views/cadastro-condominio';
import CadastroUnidade from './views/cadastro-unidade';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroMorador from './views/cadastro-morador';

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
            <Route
            path='/cadastro-morador/:idParam?'
            element={<CadastroMorador />}
            />
            
            <Route path='/listagem-usuarios' element={<ListagemUsuarios />} 
            />
            <Route path='/listagem-condominios' element={<ListagemCondominios />} 
            />
            <Route path='/listagem-unidades' element={<ListagemUnidades />} 
            />
            <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} 
            />
            <Route path='/listagem-moradores' element={<ListagemMoradores />} 
            />
        </Routes>
        </BrowserRouter>
    );
}
  
export default Rotas;