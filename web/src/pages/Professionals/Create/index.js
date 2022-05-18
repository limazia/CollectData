import React from "react";

import { Head, Navbar } from "~/components";

function ProfessionalCreate() {
  return (
    <>
      <Head title="Cadastrar profisisional" />
      <Navbar />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="leo">
            <div className="container">
              <div className="header">
                <h2>Cadastrar Profissional</h2>
              </div>

              <form id="form" className="form">
                <div className="form-control2 ">
                  <input type="text" id="nome" placeholder="Nome:" />{" "}
                </div>

                <div className="form-control2 ">
                  <input type="text" id="sobrenome" placeholder="Sobrenome:" />
                </div>

                <div className="form-control2">
                  <input type="text" id="telefone" placeholder="Telefone:" />
                </div>

                <div className="form-control2">
                  <input type="text" id="endereço" placeholder="Endereço:" />
                </div>

                <div className="form-control2">
                  <input type="text" id="cep" placeholder="CEP:" />
                </div>

                <div className="form-control2">
                  <input
                    type="text"
                    id="rsocial"
                    placeholder="Razão Social:(nome da empresa):"
                  />
                </div>

                <div className="form-control2">
                  <input type="text" id="cnpj" placeholder="CNPJ:" />
                </div>

                <div className="form-control2">
                  <input type="text" id="email" placeholder="Email.." />
                </div>

                <div className="form-control2">
                  <input
                    type="text"
                    id="complemento"
                    placeholder="Complemento:"
                  />
                </div>

                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalCreate;
