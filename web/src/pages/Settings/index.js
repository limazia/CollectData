import React, { useState, useEffect } from "react";

import {
  Head,
  Navbar,
  Loading,
  NameModal,
  EmailModal,
  TelephoneModal,
  PasswordModal,
} from "~/components";

import useAuth from "~/hooks/useAuth";

import { maskCPF, maskRG, maskCNPJ } from "~/utils/mask";

function Settings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(true);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Conta" />
      <Navbar />
      <NameModal />
      <EmailModal />
      <TelephoneModal />
      <PasswordModal />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-xs-12 col-md-6">
            <div className="card card-setting-info mb-5">
              <div className="card-body">
                <h5 className="card-title">Informações da Conta</h5>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Nome</span>
                      <p>
                        {user.name} {user.surname}
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#nameModal"
                        >
                          Editar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Email</span>
                      <p>
                        {user.email}
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#emailModal"
                        >
                          Editar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Documento</span>
                      {user.identity_card ? (
                        <>
                          {user.identity_type === "cpf" && (
                            <p>{maskCPF(user.identity_card)}</p>
                          )}
                          {user.identity_type === "rg" && (
                            <p>{maskRG(user.identity_card)}</p>
                          )}
                          {user.identity_type === "cnpj" && (
                            <p>{maskCNPJ(user.identity_card)}</p>
                          )}
                        </>
                      ) : (
                        <p  className="mt-1">Nenhum documento registrado</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Telefone</span>
                      <p>
                        {user.telephone
                          ? user.telephone
                          : "Nenhum telefone registrado"}
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#telephoneModal"
                        >
                          Editar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-editable">
                      <span>Senha</span>
                      <p>
                        ***********
                        <button
                          className="btn btn-link"
                          data-toggle="modal"
                          data-target="#passwordModal"
                        >
                          Alterar
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <small className="text-muted">
                      Registrado em: {user.created_at}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
