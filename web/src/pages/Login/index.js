import React from "react";
import { useNavigate } from "react-router-dom";
import { Head } from "~/components";
import "./styles.css";



function Login() {
    const navigate = useNavigate();

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
                </div>
            </div>
        </>
    );
}

export default Login;
