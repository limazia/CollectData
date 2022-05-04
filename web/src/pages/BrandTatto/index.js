import React from "react";

import { Head, Navbar } from "~/components";

import useProfile from "~/hooks/useProfile";

function BrandTatto() {
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
                <h5>Nova tatuagem</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5 className="card-title">Suas informações</h5>
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
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <h5 className="card-title">Ficha médica</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option1"
                            value="Pressão Normal"
                          />
                          <label className="form-check-label" htmlFor="option1">
                            Pressão Normal
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option2"
                            value="Diábetico"
                          />
                          <label className="form-check-label" htmlFor="option2">
                            Diábetico
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option3"
                            value="Hemofílico"
                          />
                          <label className="form-check-label" htmlFor="option3">
                            Hemofílico
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option4"
                            value="Cicatrização lenta"
                          />
                          <label className="form-check-label" htmlFor="option4">
                            Cicatrização lenta
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option5"
                            value="Epilepsia"
                          />
                          <label className="form-check-label" htmlFor="option5">
                            Epilepsia
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="health-problems"
                            id="option6"
                            value="Desmaio"
                          />
                          <label className="form-check-label" htmlFor="option6">
                            Desmaio
                          </label>
                        </div>
                      </div>
                      <div className="col-md-12 mt-4">
                        <label htmlFor="exampleFormControlFile1">
                          Alergia a medicamento?
                        </label>
                        <select className="form-control">
                          <option>Qual medicamento?</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                      <div className="col-md-12 mt-2">
                        <label htmlFor="exampleFormControlFile1">
                          Hepatite?
                        </label>
                        <select className="form-control">
                          <option>Que tipo?</option>
                          <option>Hepatite A</option>
                          <option>Hepatite B</option>
                          <option>Hepatite C</option>
                          <option>Hepatite D</option>
                          <option>Hepatite E</option>
                          <option>Hepatite F</option>
                          <option>Hepatite G</option>
                          <option>Hepatite autoimune</option>
                          <option>Hepatite medicamentosa</option>
                          <option>Hepatite crônica</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="card-title">Sobre a tatuagem</h5>
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
                      </div>
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <button type="submit" className="btn btn-login btn-block">
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

export default BrandTatto;
