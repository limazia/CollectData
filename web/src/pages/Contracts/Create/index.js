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
          navigate(`../customer/${customerId}`);
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
                <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/customer/${customerId}`}>{customer.name} {customer.surname}</Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Form onSubmit={handleSubmit}>
              <div className="card card-professionals p-3">
                <div className="card-body">
                  <h4 className="card-title pb-3">Adicionar contrato</h4>
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
                              !selectedFile || !title || title.length <= 4
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
