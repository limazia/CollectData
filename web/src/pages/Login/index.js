import { Form } from "@rocketseat/unform";

import useAuth from "~/hooks/useAuth";
import { Head, Spinner } from "~/components";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import LoginBackground from "~/assets/images/bg-login.jpg";

function Login() {
  const { handleSubmit, email, password, setEmail, setPassword, loading } = useAuth();

  return (
    <>
      <Head title="Iniciar sessão" />
      <div className="container-fluid login-form">
        <div className="row no-gutter">
          <div
            className="col-md-6 d-none d-md-flex bg-image"
            style={{ backgroundImage: `url(${LoginBackground})` }}
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
                      Inicie uma sessão para continuar.
                    </p>
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-lock left"></i>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={
                          !email || !password || password.length <= 3
                            ? true
                            : false
                        }
                        className="btn btn-login btn-block"
                      >
                        {loading ? <Spinner type="grow" /> : "Entrar"}
                      </button>
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

export default Login;
