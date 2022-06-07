import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import WebRepository from "~/services/WebRepository";
import { maskCPF, maskRG, maskCNPJ, maskPhone, maskCEP } from "~/utils/mask";

import { Head, Navbar, Loading } from "~/components";

function ContractView() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomer(customerId);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  async function getCustomer(id) {
    const data = await WebRepository.getCustomerById(id);

    if (data) {
      setCustomer(data);
    }
  }

  return (
    <>
      <Head title={`${customer.name} ${customer.surname}`} />
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card p-3">
              <div className="card-body">
                <h4 className="card-title pb-3">Dados do cliente</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Nome</label>
                          <p>{customer.name ? customer.name : <>&mdash;</>}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Sobrenome</label>
                          <p>
                            {customer.surname ? customer.surname : <>&mdash;</>}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Email</label>
                          <p>
                            {customer.email ? customer.email : <>&mdash;</>}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Telefone</label>
                          <p>
                            {customer.telephone ? (
                              maskPhone(customer.telephone)
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
                            {customer.birth_date ? (
                              customer.birth_date
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
                            {customer.identity_type?.toUpperCase()} {"  "}(
                            {customer.identity_card ? (
                              <>
                                {customer.identity_type === "cpf" &&
                                  maskCPF(customer.identity_card)}
                                {customer.identity_type === "rg" &&
                                  maskRG(customer.identity_card)}
                                {customer.identity_type === "cnpj" &&
                                  maskCNPJ(customer.identity_card)}
                              </>
                            ) : (
                              <>&mdash;</>
                            )}
                            )
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
            <div className="card p-3">
              <div className="card-body">
                <h4 className="card-title pb-3">Endereço</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>CEP</label>
                          <p>
                            {customer.zipcode ? (
                              maskCEP(customer.zipcode)
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>Endereço</label>
                          <p>
                            {customer.address ? customer.address : <>&mdash;</>}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Bairro</label>
                          <p>
                            {customer.district ? (
                              customer.district
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
                          <label>Complemento</label>
                          <p>
                            {customer.complement ? (
                              customer.complement
                            ) : (
                              <>&mdash;</>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Cidade</label>
                          <p>{customer.city ? customer.city : <>&mdash;</>}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Estado</label>
                          <p>
                            {customer.state ? customer.state : <>&mdash;</>}
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
          <div className="col-md-12 mb-5">
            <div className="card p-3">
              <div className="card-body">
                <h4 className="card-title pb-3">Ficha médica</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-2">
                          <label>Pressão Normal</label>
                          <p>{customer.pressure ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-2">
                          <label>Diábetico</label>
                          <p>{customer.diabetic ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-2">
                          <label>Hemofílico</label>
                          <p>{customer.hemophiliac ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Cicatrização lenta</label>
                          <p>{customer.healing ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Epilepsia</label>
                          <p>{customer.eplsepsis ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Desmaio</label>
                          <p>{customer.fainting ? "Sim" : "Não"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Alergia a medicamento?</label>
                          <p>
                            {customer.allergy_medication
                              ? customer.allergy_medication
                              : "Não"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label>Hepatite?</label>
                          <p>
                            {customer.hepatitis ? customer.hepatitis : "Não"}
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
      </div>
    </>
  );
}

export default ContractView;
