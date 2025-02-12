import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import SubCard from '../components/sub-card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

//import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';



function CaastroFuncionario(){
    const { idParam } = useParams();
    const navigate = useNavigate();
      
    const baseURL = `${BASE_URL}/funcionarios`;

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [CPF, setCPF] = useState('');
    const [idCondominio, setIdCondominio] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [celularPessoal, setCelularPessoal] = useState('');
    const [celularComercial, setCelularComercial] = useState('');
    const [email, setEmail] = useState('');

    const [dados, setDados] = React.useState([]);

    function inicializar() {
        if (idParam == null) {
          setId('');
          setNome('');
          setCPF('');
          setIdCondominio('');
          setEmpresa('');
          setCelularPessoal('');
          setCelularComercial('');
          setEmail('');
        } else {
          setId(dados.id);
          setNome(dados.nome);
          setCPF(dados.CPF);
          setIdCondominio(dados.idCondominio);
          setEmpresa(dados.empresa);
          setCelularPessoal(dados.celularPessoal);
          setCelularComercial(dados.celularComercial);
          setEmail(dados.email);
        }
    }
    
    async function salvar() {
        let data = { id, nome, CPF, idCondominio, empresa, celularPessoal, celularComercial, email};
        data = JSON.stringify(data);
        if (idParam == null) {
          await axios
            .post(baseURL, data, {
              headers: { "Content-Type": "application/json" },
            })
            .then(function (response) {
              mensagemSucesso(`Funcionário ${nome} cadastrado com sucesso!`);
              navigate(`/listagem-funcionarios`);
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
              mensagemSucesso(`Funcionário ${nome} alterado com sucesso!`);
              navigate(`/listagem-funcionarios`);
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
            setCPF(dados.CPF);
            setIdCondominio(dados.idCondominio);
            setEmpresa(dados.empresa);
            setCelularPessoal(dados.celularPessoal);
            setCelularComercial(dados.celularComercial);
            setEmail(dados.email);
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

    return(
    <div className='container'>
      <Card title='Cadastro de Morador'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
                <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                    type='text'
                    id='inputNome'
                    value={nome}
                    className='form-control'
                    name='nome'
                    onChange={(e) => setNome(e.target.value)}
                />
                </FormGroup>
                <FormGroup label="CPF: *" htmlFor="inputCPF">
                    <input
                        type="text"
                        id="inputCPF"
                        value={CPF}
                        className="form-control"
                        name="CPF"
                        onChange={(e) => setCPF(e.target.value)}
                    />
                </FormGroup>
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
                <FormGroup label="Empresa: *" htmlFor="inputEmpresa">
                    <input
                        type="text"
                        id="inputEmpresa"
                        value={empresa}
                        className="form-control"
                        name="empresa"
                        onChange={(e) => setEmpresa(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Celular Pessoal: *" htmlFor="inputCelularPessoal">
                    <input
                        type="text"
                        id="inputCelularPessoal"
                        value={celularPessoal}
                        className="form-control"
                        name="CelularPessoal"
                        onChange={(e) => setCelularPessoal(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Celular Comercial: *" htmlFor="inputCelularComercial">
                    <input
                        type="text"
                        id="inputCelularComercial"
                        value={celularComercial}
                        className="form-control"
                        name="CelularComercial"
                        onChange={(e) => setCelularComercial(e.target.value)}
                    />
                </FormGroup>
                <FormGroup label="Email: *" htmlFor="inputEmail">
                    <input
                      type="email"
                      id="inputEmail"
                      value={email}
                      className="form-control"
                      name="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <Stack spacing={1} padding={1} direction='row'>
                <button
                    onClick={salvar}
                    type='button'
                    className='btn btn-success'
                >
                    Salvar
                </button>
                <button
                    onClick={inicializar}
                    type='button'
                    className='btn btn-danger'
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

export default CaastroFuncionario;