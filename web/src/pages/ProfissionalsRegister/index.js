import { Head, Navbar } from "~/components";

import useProfile from "~/hooks/useProfile";

function ProfissionalsRegister() {
  const { user } = useProfile();

  return (
    <>
      <Head title="Marcar tatuagem" />
      <Navbar />
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-12">
            <div className="card card-new-tatto">
              <div className="card-header">
                <h5>Cadastrar Profissional</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="card-title">Informações</h5>
                    <form>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-user left"></i>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              placeholder="Nome completo"
                              readOnly
                              value={user.name}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-envelope left"></i>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              readOnly
                              value={user.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-envelope left"></i>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              placeholder="Senha"
                              readOnly
                              value={user.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-envelope left"></i>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              placeholder="Confirmar senha"
                              readOnly
                              value={user.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-envelope left"></i>
                            <input
                              type="tel"
                              name="phone"
                              className="form-control"
                              placeholder="Telefone"
                              readOnly
                              value={user.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3 wicon">
                            <i className="fas fa-envelope left"></i>
                            <input
                              type="text"
                              name="cpf"
                              className="form-control"
                              placeholder="CPF"
                              readOnly
                              value={user.email}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn btn-login btn-block mt-3"
                    >
                      Finalizar
                    </button>
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

export default ProfissionalsRegister;
