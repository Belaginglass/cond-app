import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

//import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';


function CadastroCondominio() {
    const { idParam } = useParams();

    const navigate = useNavigate();
  
    const baseURL = `${BASE_URL}/condominios`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [tipoCondominio, setTipoCondominio] = useState(false);
    const [quantidadePortarias, setQuantidadePortarias] = useState(0);
    const [quantidadeUnidades, setQuantidadeUnidades] = useState(0);
    const [quantidadeBlocos, setQuantidadeBlocos] = useState(0);
    const [exigeIndentificacao, setExigeIndentificacao] = useState(false);
    const [chaveAcesso, setChaveAcesso] = useState(0);
    
    const [dados, setDados] = React.useState([]);

    
  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setTipoCondominio('');
      setQuantidadePortarias('');
      setQuantidadeUnidades('');
      setQuantidadeBlocos('');
      setExigeIndentificacao('');
      setChaveAcesso('');
    } else {
        setId(dados.id);
        setNome(dados.nome);
        setTipoCondominio(dados.tipoCondominio);
        setQuantidadePortarias(dados.quantidadePortarias);
        setQuantidadeUnidades(dados.quantidadeUnidades);
        setQuantidadeBlocos(dados.quantidadeBlocos);
        setExigeIndentificacao(dados.exigeIndentificacao);
        setChaveAcesso(dados.chaveAcesso);
    }
  }

  async function salvar() {
    let data = { id, nome, tipoCondominio, quantidadePortarias, quantidadeUnidades, quantidadeBlocos, exigeIndentificacao, chaveAcesso};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Condomínio ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-condominios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Condomínio ${nome}  alterado com sucesso!`);
          navigate(`/listagem-condominios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if(idParam != null){
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
        setId(dados.id);
        setNome(dados.nome);
        setTipoCondominio(dados.tipoCondominio);
        setQuantidadePortarias(dados.quantidadePortarias);
        setQuantidadeUnidades(dados.quantidadeUnidades);
        setQuantidadeBlocos(dados.quantidadeBlocos);
        setExigeIndentificacao(dados.exigeIndentificacao);
        setChaveAcesso(dados.chaveAcesso);
    }
  }

  useEffect(() => {
      buscar(); 
    }, [id]);
  
    if (!dados) return null;

    return (
        <div className="container">
          <Card title="Cadastro de Condomínio">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <FormGroup label="Nome: *" htmlFor="inputNome">
                    <input
                      type="text"
                      id="inputNome"
                      value={nome}
                      className="form-control"
                      name="nome"
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Tipo de Condominio: *" htmlFor="inputTipoCondominio">
                    <input
                      type="text"
                      id="inputTipoCondominio"
                      value={tipoCondominio}
                      className="form-control"
                      name="tipoCondominio"
                      onChange={(e) => setTipoCondominio(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Quantidade de Portarias: *" htmlFor="inputQuantidadePortarias">
                    <input
                      type="text"
                      id="inputQuantidadePortarias"
                      value={quantidadePortarias}
                      className="form-control"
                      name="QuantidadePortarias"
                      onChange={(e) => setQuantidadePortarias(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Quantidade de Unidades: *" htmlFor="inputQuantidadeUnidades">
                    <input
                      type="text"
                      id="inputQuantidadeUnidades"
                      value={quantidadeUnidades}
                      className="form-control"
                      name="QuantidadeUnidades"
                      onChange={(e) => setQuantidadeUnidades(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Quantidade de Blocos: *" htmlFor="inputQuantidadeBlocos">
                    <input
                      type="text"
                      id="inputQuantidadeBlocos"
                      value={quantidadeBlocos}
                      className="form-control"
                      name="QuantidadeBlocos"
                      onChange={(e) => setQuantidadeBlocos(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Exige Indentificação: *" htmlFor="inputExigeIndentificacao">
                    <input
                      type="text"
                      id="inputExigeIndentificacao"
                      value={exigeIndentificacao}
                      className="form-control"
                      name="ExigeIndentificacao"
                      onChange={(e) => setExigeIndentificacao(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Chave de Acesso: *" htmlFor="inputChaveAcesso">
                    <input
                      type="text"
                      id="inputChaveAcesso"
                      value={chaveAcesso}
                      className="form-control"
                      name="ChaveAcesso"
                      onChange={(e) => setChaveAcesso(e.target.value)}
                    />
                  </FormGroup>
                  <Stack spacing={1} padding={1} direction="row">
                    <button
                      onClick={salvar}
                      type="button"
                      className="btn btn-success"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={inicializar}
                      type="button"
                      className="btn btn-danger"
                    >
                      Cancelar
                    </button>
                  </Stack>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
}

export default CadastroCondominio;