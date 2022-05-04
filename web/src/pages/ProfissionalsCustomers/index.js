import React, { useState, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Head, Navbar, Loading } from "~/components";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty.svg";

function ProfissionalCustomers() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const goBrandsProf = () => navigate("/brandsprof");

  const profissionals = {
    name: "Gabriel de Oliveira Marques da Silva",
    email: "limadeacacio@gmail.com",
    createdAt: "27/04/2022",
  };

  return (
    <>
      <Head title="Profissional" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="card card-tattos">
              <div className="card-body">
                {profissionals.length > 0 ? (
                  <>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Email</th>
                          <th>Registrado em</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {profissionals.map((index, user) => (
                            <tr key={index}>
                              <th>{profissionals.name}</th>
                              <td>{profissionals.email}</td>
                              <td>{profissionals.createdAt}</td>
                              <td>
                                <div className="dropdown">
                                  <i
                                    className="far fa-ellipsis-v"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  ></i>
                                  <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                  >
                                    <Link className="dropdown-item" to="#">
                                      <i class="fas fa-history mr-2"></i>{" "}
                                      Históricos
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i class="fas fa-pencil-alt mr-2"></i>{" "}
                                      Editar
                                    </Link>
                                    <Link className="dropdown-item" to="#">
                                      <i class="fas fa-trash-alt mr-2"></i>{" "}
                                      Remover
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="col-sm-12 empty-tatto text-center">
                    <div className="empty-tatto-image pb-3">
                      <EmptyBackground className="img-fluid" />
                    </div>
                    <span className="empty-tatto-title">
                      Nenhum profissional foi encontrado
                    </span>
                    <small className="empty-tatto-description mt-2 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button
                      className="btn btn-create-tatto"
                      onClick={goBrandsProf}
                    >
                      <i className="far fa-plus mr-1"></i> Cadastrar
                      Profissional
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfissionalCustomers;
