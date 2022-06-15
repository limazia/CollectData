import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import WebRepository from "~/services/WebRepository";
import { maskCPF, maskRG, maskCNPJ, maskPhone } from "~/utils/mask";

import { Head, Navbar, Loading } from "~/components";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty4.svg";

function ProfessionalView() {
  const { professionalId } = useParams();
  const [professional, setProfessional] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfessional(professionalId);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  async function getProfessional(id) {
    const { results, error } = await WebRepository.getProfessionalById(id);

    if (error) {
      window.location.replace("/professionals");
    } else {
      setProfessional(results);
    }
  }

  return (
    <>
      <Head title={`${professional.name} ${professional.surname}`} />
      <Navbar />
      <div className="container mt-5 pb-5">
        <div className="row mt-5">
          <div className="col-md-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-navigation">
                <li className="breadcrumb-item">
                  <Link to="/">Inicio</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/professionals">Profissionais</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/professional/${professionalId}`}>{professional.name} {professional.surname}</Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-12 mt-3">
            <div className="card p-3">
              <div className="card-body">
                <h4 className="card-title pb-3">Dados do professional</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Nome</label>
                          <p>
                            {professional.name ? (
                              professional.name
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Sobrenome</label>
                          <p>
                            {professional.surname ? (
                              professional.surname
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Email</label>
                          <p>
                            {professional.email ? (
                              professional.email
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Telefone</label>
                          <p>
                            {professional.telephone ? (
                              maskPhone(professional.telephone)
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Data de aniversário</label>
                          <p>
                            {professional.birth_date ? (
                              professional.birth_date
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Documento</label>
                          <p>
                            {professional.identity_type?.toUpperCase()} (
                            {professional.identity_card ? (
                              <>
                                {professional.identity_type === "cpf" &&
                                  maskCPF(professional.identity_card)}
                                {professional.identity_type === "rg" &&
                                  maskRG(professional.identity_card)}
                                {professional.identity_type === "cnpj" &&
                                  maskCNPJ(professional.identity_card)}
                              </>
                            ) : (
                              <>&mdash;</>
                            )}
                            )
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Área de atuação</label>
                          <p>
                            {professional.area_activity ? (
                              <>{professional.area_activity}</>
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card card-professionals p-3">
              <div className="card-body">
                <h4 className="card-title pb-3">Contratos</h4>
                <div className="row">
                  <div className="col-sm-12 empty-tatto text-center">
                    <div className="empty-tatto-image pb-3">
                      <EmptyBackground className="img-fluid" />
                    </div>
                    <span className="empty-tatto-title">
                      Nenhum contrato foi encontrado
                    </span>
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

export default ProfessionalView;
