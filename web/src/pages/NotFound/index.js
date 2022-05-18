import React from "react";
import { Link } from "react-router-dom";

import { Head } from "~/components";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import { ReactComponent as ImageError404 } from "~/assets/images/404.svg";

function NotFound() {
  return (
    <>
      <Head title="Página não encontrada" />
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <Logo width="230" />
            </Link>
          </div>
        </nav>
      </header>
      <div className="error-404">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-7 col-md-6 align-self-center text-center">
              <ImageError404 className="img-fluid" />
            </div>
            <div className="col-lg-5 col-md-6 align-self-center mb-md-0 mb-4">
              <h1>404</h1>
              <h2>UH OH! Você está perdido.</h2>
              <p>
                A página que você está procurando não existe.
                <div className="clearfix" />
                Como você chegou aqui é um mistério. Mas você pode clicar no
                botão abaixo para voltar à página inicial.
              </p>
              <Link to="/" className="btn btn-back">
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;