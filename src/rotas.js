import React from 'react';

import ListagemUsuarios from './views/listagem-usuarios';
import ListagemCondominios from './views/listagem-condominios';
import ListagemUnidades from './views/listagem-unidades';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemMoradores from './views/listagem-moradores';
import ListagemVeiculos from './views/listagem-veiculos';
import ListagemPrestadoresServico from './views/listagem-prestadores_servico';
import ListagemEncomenda from './views/listagem-encomenda';
import ListagemAreasComum from './views/listagem_areas_comum';
import ListagemRealizacaoObra from './views/listagem-realizacao_obras';

import CadastroUsuario from './views/cadastro-usuario';
import CadastroCondominio from './views/cadastro-condominio';
import CadastroUnidade from './views/cadastro-unidade';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroMorador from './views/cadastro-morador';
import CadastroVeiculos from './views/cadastro-veiculos';
import CadastroPrestadorServico from './views/cadastro-prestadores_servico';
import CadastroEncomenda from './views/cadastro-encomenda';
import CadastroAreasComum from './views/cadastro-areas_comum';
import CadastroRealizacaoObra from './views/cadastro-realizacao_obras';

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
            <Route
            path='/cadastro-veiculos/:idParam?'
            element={<CadastroVeiculos />}
            />
            <Route
            path='/cadastro-prestadores_servico/:idParam?'
            element={<CadastroPrestadorServico />}
            />
            <Route
            path='/cadastro-encomenda/:idParam?'
            element={<CadastroEncomenda />}
            />
            <Route
            path='/cadastro-areas_comum/:idParam?'
            element={<CadastroAreasComum />}
            />
            <Route
            path='/cadastro-realizacao_obras/:idParam?'
            element={<CadastroRealizacaoObra />}
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
            <Route path='/listagem-veiculos' element={<ListagemVeiculos />} 
            />
            <Route path='/listagem-prestadores_servico' element={<ListagemPrestadoresServico />} 
            />
            <Route path='/listagem-encomenda' element={<ListagemEncomenda />} 
            />
            <Route path='/listagem-areas-comum' element={<ListagemAreasComum />} 
            />
            <Route path='/listagem-realizacao-obra' element={<ListagemRealizacaoObra />} 
            />
        </Routes>
        </BrowserRouter>
    );
}
  
export default Rotas;