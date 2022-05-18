import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Head, Navbar, Loading } from "~/components";

import useAuth from "~/hooks/useAuth";
import WebRepository from "~/services/WebRepository";

import { maskCPF, maskRG, maskCNPJ } from "~/utils/mask";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty3.svg";

function Customers() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfessionals();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  async function getProfessionals() {
    const { results } = await WebRepository.getProfessionals();

    if (results) {
      setProfessionals(results);
    }
  }

  const goCreate = () => navigate("/professional/create");

  return (
    <>
      <Head title="Clientes" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="card card-professionals">
              <div className="card-body">
                {professionals.length > 0 ? (
                  <table className="table-professionals">
                    <thead>
                      <tr>
                        <th>Profissional</th>
                        <th>Telefone</th>
                        <th>Documento</th>
                        <th>Área de atuação</th>
                        <th>Data de cadastro</th>
                        {user.primary_user && <th></th>}
                      </tr>
                    </thead>
                    <tbody>
                      {professionals.map((pl) => (
                        <tr key={pl.id}>
                          <td>
                            <span className="text-dark">
                              {pl.name}
                            </span>
                            <br />
                            <span>{pl.email}</span>
                          </td>
                          <td>{pl.telephone ? pl.telephone : <>&mdash;</>}</td>
                          <td>
                            <span
                              data-toggle="tooltip"
                              data-placement="top"
                              title={pl.identity_type?.toUpperCase()}
                            >
                              {pl.identity_card ? (
                                <>
                                  {pl.identity_type === "cpf" &&
                                    maskCPF(pl.identity_card)}
                                  {pl.identity_type === "rg" &&
                                    maskRG(pl.identity_card)}
                                  {pl.identity_type === "cnpj" &&
                                    maskCNPJ(pl.identity_card)}
                                </>
                              ) : (
                                <>&mdash;</>
                              )}
                            </span>
                          </td>
                          <td>
                            {pl.area_activity ? pl.area_activity : <>&mdash;</>}
                          </td>
                          <td>{pl.createdAt}</td>
                          {user.primary_user && (
                            <td>
                              <div className="dropdown">
                                <i
                                  className="far fa-ellipsis-v mr-3"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                ></i>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <Link
                                    className="dropdown-item"
                                    to={`/professional/edit/${pl.id}`}
                                  >
                                    <i className="fas fa-pencil-alt mr-2"></i>{" "}
                                    Editar
                                  </Link>
                                  {user.id !== pl.id && user.primary_user && (
                                    <Link className="dropdown-item" to="#">
                                      <i className="fas fa-trash-alt mr-2"></i>{" "}
                                      Remover
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="col-sm-12 empty-tatto text-center">
                    <div className="empty-tatto-image pb-3">
                      <EmptyBackground className="img-fluid" />
                    </div>
                    <span className="empty-tatto-title">
                      Nenhum profissional foi encontrado
                    </span>
                    <small className="empty-tatto-description mt-3 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button className="btn btn-create" onClick={goCreate}>
                      <i className="far fa-plus mr-1"></i> Cadastrar
                      profissional
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

export default Customers;
