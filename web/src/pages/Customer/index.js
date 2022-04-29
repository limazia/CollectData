import React from "react";
import { Form } from "@rocketseat/unform";
import { useNavigate } from "react-router-dom";

import useRegister from "~/hooks/useRegister";

import { Head, Spinner } from "~/components";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import RegisterBackground from "~/assets/images/bg-register.jpg";

function NewCustomer() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    setName,
    setEmail,
    setPassword,
    setCPassword,
    userName,
    userEmail,
    userPassword,
    userConfirmPassword,
    loading,
  } = useRegister();

  const goLogin = () => {
    navigate("/");
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
  };

  return (
    <>
      <Head title="Criar conta" />
      <div className="container-fluid register-form">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image" style={{ backgroundImage: `url(${RegisterBackground})` }}></div>
          <div className="col-md-6 bg-light">
            <div className="register d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <div className="display-4 box-logo">
                      <Logo className="img-fluid mr-2" />
                    </div>
                    <p className="text-muted mt-3 mb-4 text-center">
                      Crie uma conta para explorar ao máximo.
                    </p>
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-user left"></i>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Nome Completo"
                          value={userName}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={userEmail}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div id="popover-content" style={{ display: "none" }}>
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-lock left"></i>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Senha"
                          value={userPassword}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-lock left"></i>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirmar senha"
                          value={userConfirmPassword}
                          onChange={(e) => setCPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={
                          !userName ||
                          !userEmail ||
                          !userPassword ||
                          !userConfirmPassword ||
                          userPassword.length <= 3 ||
                          userConfirmPassword.length <= 3
                            ? true
                            : false
                        }
                        className="btn btn-register btn-block"
                      >
                        {loading ? (
                          <Spinner type="grow" />
                        ) : (
                          "Cadastre-se"
                        )}
                      </button>
                      <div className="link-login">
                        <p>Já tem uma conta? <span onClick={goLogin}>Entrar</span></p>
                      </div>
                    </Form>
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

export default NewCustomer;