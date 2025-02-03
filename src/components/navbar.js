import React from "react";
import "bootswatch/dist/litera/bootstrap.css";

import NavbarItem from "./navbarItem";

function Navbar(props) {
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          COND
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-usuarios"
              label="Usuários"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-condominios"
              label="Condomínios"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-unidades"
              label="Unidades"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-Moradores"
              label="Moradores"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-funcionarios"
              label="Funcionários"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-veiculos"
              label="Veículos"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-prestadores_servico"
              label="Prestadores de Serviço"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-encomenda"
              label="Encomenda"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-areas-comum"
              label="Áreas Comum"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem
              render="true"
              href="/listagem-realizacao-obra"
              label="Realização de Obra"
            />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/login" label="Entrar" />
          </ul>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/" label="Sair" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
