import React from "react";
import { useNavigate } from "react-router-dom";
import { Head } from "~/components";
import "./styles.css";



function Login() {
<<<<<<< Updated upstream
    const navigate = useNavigate();
=======
  const navigate = useNavigate();
  const {
    handleSubmit,
    email,
    password,
    setEmail,
    setPassword,
    loading,
  } = useAuth();
>>>>>>> Stashed changes

    const goInicio = () => navigate("/inicio");

    return (
        <>
            <Head title="Iniciar sessão" />
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-md-12 text-center">
                        <div className="col-md-4">
                            <h3 className="mb-4">Collect Data</h3>
                            <form>
                                <div className="mb-4">
                                    <span>Login</span>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Usuário"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Senha"
                                    />
                                </div>
                                <button onClick={goInicio} className="btn btn-success">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
<<<<<<< Updated upstream
=======
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
                          !email ||
                          !password ||
                          password.length <= 3
                            ? true
                            : false
                        }
                        className="btn btn-login btn-block"
                      >
                        {loading ? (
                          <Spinner type="grow" />
                        ) : (
                          "Entrar"
                        )}
                      </button>
                      <div className="link-forgot-password">
                        <span onClick={goForgot}>Esqueceu a senha?</span>
                      </div>
                    </Form>
                  </div>
>>>>>>> Stashed changes
                </div>
            </div>
        </>
    );
}

export default Login;
