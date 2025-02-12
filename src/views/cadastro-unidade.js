import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

//import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';


function CadastroUnidade() {
    const { idParam } = useParams();

    const navigate = useNavigate();
  
    const baseURL = `${BASE_URL}/unidades`;
    
    const [id, setId] = useState('');
    const [idCondominio, setIdCondominio] = useState('');
    const [numero, setNumero] = useState('');
    const [bloco, setBloco] = useState('');
    const [rua, setRua] = useState('');
    const [petFriendly, setPetFriendly] = useState('Não');
    const [quantidadeVagas, setQuantidadeVagas] = useState(0);
    
    const [dados, setDados] = React.useState([]);

    
  function inicializar() {
    if (idParam == null) {
      setId('');
      setIdCondominio('');
      setNumero('');
      setBloco('');
      setRua('');
      setPetFriendly('Não');
      setQuantidadeVagas(0);
    } else {
        setId(dados.id);
        setIdCondominio(dados.idCondominio);
        setNumero(dados.numero);
        setBloco(dados.bloco);
        setRua(dados.rua);
        setPetFriendly(dados.petFriendly);
        setQuantidadeVagas(dados.quantidadeVagas);
    }
  }

  async function salvar() {
    let data = { id, idCondominio, numero, bloco , rua , petFriendly , quantidadeVagas};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Unidade ${numero} cadastrado com sucesso!`);
          navigate(`/listagem-unidades`);
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
          mensagemSucesso(`Unidade ${numero}  alterado com sucesso!`);
          navigate(`/listagem-unidades`);
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
        setIdCondominio(dados.idCondominio);
        setNumero(dados.numero);
        setBloco(dados.bloco);
        setRua(dados.rua);
        setPetFriendly(dados.petFriendly);
        setQuantidadeVagas(dados.quantidadeVagas);
    }
  }

  const [dadosCondominios, setDadosCondominios] = React.useState(null);
    
    useEffect(() => {
        axios.get(`${BASE_URL}/condominios`).then((response) => {
          setDadosCondominios(response.data);
        });
      }, []);

  useEffect(() => {
      buscar(); 
    }, [id]);
  
    if (!dados) return null;
    if(!dadosCondominios) return null;

    return (
        <div className="container">
          <Card title="Cadastro de Unidade">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                    <FormGroup label='Condominio:' htmlFor='selectCondominio'>
                        <select
                            className='form-select'
                            id='selectCondominio'
                            name='idCondominio'
                            value={idCondominio}
                            onChange={(e) => setIdCondominio(e.target.value)}
                        >
                            <option key='0' value='0'>
                            {' '}
                            </option>
                            {dadosCondominios.map((dado) => (
                            <option key={dado.id} value={dado.id}>
                                {dado.nome}
                            </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup label="Bloco: *" htmlFor="inputBloco">
                        <input
                        type="text"
                        id="inputBloco"
                        value={bloco}
                        className="form-control"
                        name="bloco"
                        onChange={(e) => setBloco(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Rua: *" htmlFor="inputRua">
                        <input
                        type="text"
                        id="inputRua"
                        value={rua}
                        className="form-control"
                        name="rua"
                        onChange={(e) => setRua(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Número: *" htmlFor="inputNumero">
                        <input
                        type="text"
                        id="inputNumero"
                        value={numero}
                        className="form-control"
                        name="numero"
                        onChange={(e) => setNumero(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup label="PetFriendly: *" htmlFor="inputPetFriendly">
                        <input
                        type="text"
                        id="inputPetFriendly"
                        value={petFriendly}
                        className="form-control"
                        name="petFriendly"
                        onChange={(e) => setPetFriendly(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup label="Quantidade de Vagas: *" htmlFor="inputQuantidadeVagas">
                        <input
                        type="text"
                        id="inputQuantidadeVagas"
                        value={quantidadeVagas}
                        className="form-control"
                        name="quantidadeVagas"
                        onChange={(e) => setQuantidadeVagas(e.target.value)}
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

export default CadastroUnidade;