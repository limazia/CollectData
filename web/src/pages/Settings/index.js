import React, { useLayoutEffect, useState } from "react";
import { Form } from "@rocketseat/unform";

import { Head, Navbar } from "~/components";

import useProfile from "~/hooks/useProfile";

function Settings() {
  const { user } = useProfile();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editPassword, setEditPassword] = useState(false);

  useLayoutEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [])

  const handleClick = () => setEditPassword(!editPassword);
  return (
    <>
      <Head title="Conta" />
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-xs-12 col-md-8">
            <div className="card card-setting-info">
              <div className="card-body">
                <h5 className="card-title">Informações da Conta</h5>
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label for="label-name">Nome</label>
                        <input
                          type="text"
                          className="form-control"
                          id="label-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group mb-2">
                        <label for="label-email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="label-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="form-check mb-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          onClick={handleClick}
                          checked={editPassword}
                          id="defaultCheck1"
                        />
                        <label class="form-check-label" for="defaultCheck1">
                          Alterar a senha
                        </label>
                      </div>
                    </div>
                  </div>
                  {editPassword && (
                    <>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group mb-2">
                            <label for="label-name">Senha atual</label>
                            <input
                              type="text"
                              className="form-control"
                              id="label-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label for="label-email">Nova senha</label>
                            <input
                              type="email"
                              className="form-control"
                              id="label-email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-2">
                            <label for="label-email">Confirmar senha</label>
                            <input
                              type="email"
                              className="form-control"
                              id="label-email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <div className={`row ${editPassword && "mt-1"}`}>
                    <div className="col-md-12">
                      <button type="submit" className="btn btn-login btn-block">
                        Salvar
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
