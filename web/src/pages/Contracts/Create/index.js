import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { toast } from "react-toastify";

import api from "~/services/api";
import WebRepository from "~/services/WebRepository";
import { maskCPF, maskRG, maskCNPJ, maskPhone, maskCEP } from "~/utils/mask";

import { Head, Navbar, Dropzone, Spinner, Loading } from "~/components";

function ContractCreate() {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const { results, error } = await WebRepository.getCustomerById(id);

    if (error) {
      window.location.replace("/customers");
    } else {
      setCustomer(results);
    }
  }

  const handleSubmit = async () => {
    if (title) {
      try {
        setLoading(true);

        const data = new FormData();

        data.append("id", customerId);
        data.append("title", title);

        if (selectedFile) {
          data.append("image", selectedFile);
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await api.post("/api/contracts/create", data, config);
        const { message, error } = response.data;

        if (message) {
          toast.success(message);
          navigate(`../customer/${customerId}#contracts`);
        } else {
          toast.error(error);
        }
      } catch (err) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head
        title={`Criar contrato para ${customer.name} ${customer.surname}`}
      />
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
                  <Link to="/customers">Clientes</Link>
                </li>
                <li className="breadcrumb-item">
                  <span>Contrato</span>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {customer.name} {customer.surname}
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-md-12 mt-3">
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
          <div className="col-md-12">
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
        <div className="row mt-5">
          <div className="col-md-12">
            <Form onSubmit={handleSubmit}>
              <div className="card card-professionals p-3">
                <div className="card-body">
                  <h4 className="card-title pb-3">Tatuagem</h4>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group mb-4">
                            <label htmlFor="title">*Título</label>
                            <input
                              type="text"
                              name="title"
                              id="title"
                              className="form-control step"
                              placeholder="Tatuagem de Dragão"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <Dropzone onFileUploaded={setSelectedFile} />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between">
                          <span className="text-muted">
                            * Campo de preenchimento obrigatorio
                          </span>
                          <button
                            type="submit"
                            disabled={
                              !selectedFile || !title || title.length <= 5
                                ? true
                                : false
                            }
                            className="btn btn-step finish"
                          >
                            {loading ? (
                              <Spinner type="grow" />
                            ) : (
                              "Adicionar contrato"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractCreate;
