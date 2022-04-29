import React, { useContext } from "react";
import { Form } from "@rocketseat/unform";
import { useNavigate } from "react-router-dom";

import { ForgotContext } from "~/contexts/ForgotContext";

import { Head, Spinner } from "~/components";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import ForgotBackground from "~/assets/images/bg-forgot.jpg";

function ForgotPassword() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    setEmail,
    userEmail,
    loading,
  } = useContext(ForgotContext);

  const goLogin = () => {
    navigate("/");
    setEmail("");
  };

  return (
    <>
      <Head title="Recuperar senha" />
      <div className="container-fluid login-form">
        <div className="row no-gutter">
          <div
            className="col-md-6 d-none d-md-flex bg-image"
            style={{ backgroundImage: `url(${ForgotBackground})` }}
          ></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <div className="display-4 box-logo">
                      <Logo className="img-fluid mr-2" />
                    </div>
                    <p className="text-muted mt-3 mb-4 text-center">
                      Digite seu email para recuperar sua senha.
                    </p>
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Seu email"
                          value={userEmail}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={
                          !userEmail
                            ? true
                            : false
                        }
                        className="btn btn-send-recovery btn-block"
                      >
                        {loading ? (
                          <Spinner type="grow" />
                        ) : (
                          "Recuperar"
                        )}
                      </button>
                      <div className="link-login">
                        <span onClick={goLogin}>Voltar para o login</span>
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

export default ForgotPassword;
