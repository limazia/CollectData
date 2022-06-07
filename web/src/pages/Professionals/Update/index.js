import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { toast } from "react-toastify";

import WebRepository from "~/services/WebRepository";
import api from "~/services/api";
import { maskCPF, maskRG, maskPhone, maskDate } from "~/utils/mask";

import { Head, Navbar, Loading, Spinner } from "~/components";

function ProfessionalUpdate() {
  const { professionalId } = useParams();
  const [professional, setProfessional] = useState([]);
  const [professionalData, setProfessionalData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    birth_date: "",
    identity_type: "cpf",
    identity_card: "",
  });

  const {
    name,
    surname,
    email,
    telephone,
    birth_date,
    identity_type,
    identity_card,
    area_activity } = professionalData;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    getProfessional(professionalId);
    setProfessionalData({
      name: professional.name,
      surname: professional.surname,
      email: professional.email,
      telephone: professional.telephone,
      birth_date: professional.birth_date,
      identity_type: professional.identity_type,
      identity_card: professional.identity_card,
      area_activity: professional.area_activity,
    });

    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  }, [pageLoading]);

  if (pageLoading) {
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

  const handleData = (e) => {
    const { name, value } = e.target;

    setProfessionalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit() {
    if (name,
      surname,
      email,
      telephone,
      birth_date,
      identity_type,
      identity_card) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/professionals/update/${professionalId}`, { professionalData });
        const { error, message } = data;

        if (message) {
          toast.success(message);
        } else {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos");
    }
  }

  return (
    <>
      <Head title={`Editando ${professional.name} ${professional.surname}`} />
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card card-step">
              <div className="card-body">
                <Form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label htmlFor="name" className="text-muted">
                              *Nome
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control step"
                              placeholder="John"
                              value={professionalData.name}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label htmlFor="surname" className="text-muted">
                              *Sobrenome
                            </label>
                            <input
                              type="text"
                              name="surname"
                              id="surname"
                              className="form-control step"
                              placeholder="Doe"
                              value={professional.surname}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="form-group mb-4">
                            <label htmlFor="email" className="text-muted">
                              *Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              className="form-control step"
                              placeholder="johndoe@exemple.com"
                              value={professionalData.email}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-4">
                            <label htmlFor="telephone" className="text-muted">
                              *Telefone
                            </label>
                            <input
                              type="text"
                              name="telephone"
                              id="telephone"
                              className="form-control step"
                              placeholder="(00) 00000-0000"
                              value={maskPhone(professionalData.telephone || "")}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group mb-4">
                            <label htmlFor="area_activity" className="text-muted">
                              Área de atuação
                            </label>
                            <input
                              type="text"
                              name="area_activity"
                              id="area_activity"
                              className="form-control step"
                              placeholder="Tatuador"
                              value={professionalData.area_activity}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group mb-4">
                            <label htmlFor="birth_date">
                              *Data de aniversário
                            </label>
                            <input
                              type="text"
                              name="birth_date"
                              id="birth_date"
                              className="form-control step"
                              placeholder="00/00/0000"
                              value={maskDate(professionalData.birth_date || "")}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group mb-4">
                            <label
                              htmlFor="identity_card"
                              className="text-muted"
                            >
                              *Documento
                            </label>
                            <input
                              type="text"
                              name="identity_card"
                              id="identity_card"
                              className="form-control step"
                              maxLength={
                                professionalData.identity_type === "cpf" ? 14 : 12
                              }
                              placeholder={
                                professionalData.identity_type === "cpf"
                                  ? "000.000.000-00"
                                  : "00.000.000-0"
                              }
                              value={
                                professionalData.identity_type === "cpf"
                                  ? maskCPF(professionalData.identity_card || "")
                                  : maskRG(professionalData.identity_card || "")
                              }
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-4 select-wrapper">
                            <label htmlFor="identity_type">
                              *Tipo de documento
                            </label>
                            <select
                              name="identity_type"
                              id="identity_type"
                              className="form-control step"
                              value={professionalData.identity_type}
                              onChange={handleData}
                            >
                              <option value="cpf">CPF</option>
                              <option value="rg">RG</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between">
                          <span className="text-muted">
                            * Campo de preenchimento obrigatorio
                          </span>
                          <button type="submit" className="btn btn-step finish">
                            {loading ? <Spinner type="grow" /> : "Salvar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfessionalUpdate;
