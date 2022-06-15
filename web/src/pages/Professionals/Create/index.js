import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { toast } from "react-toastify";

import api from "~/services/api";
import { maskCPF, maskRG, maskPhone, maskDate } from "~/utils/mask";

import { Head, Navbar, Spinner } from "~/components";

function ProfessionalCreate() {
  const [professionalData, setProfessionalData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    birth_date: "",
    identity_type: "cpf",
    identity_card: "",
    area_activity: "",
  });
  const [loading, setLoading] = useState(false);

  const handleData = (e) => {
    const { name, value } = e.target;

    if (name === "telephone") {
      setProfessionalData((prevState) => ({
        ...prevState,
        telephone: maskPhone(value),
      }));
    } else if (name === "identity_type") {
      setProfessionalData((prevState) => ({
        ...prevState,
        identity_type: value,
      }));

      if (professionalData.identity_card) {
        setProfessionalData((prevState) => ({
          ...prevState,
          identity_card: "",
        }));
      }
    } else if (name === "birth_date") {
      setProfessionalData((prevState) => ({
        ...prevState,
        birth_date: maskDate(value),
      }));
    } else if (name === "identity_card") {
      if (professionalData.identity_type === "cpf") {
        setProfessionalData((prevState) => ({
          ...prevState,
          identity_card: maskCPF(value),
        }));
      } else {
        setProfessionalData((prevState) => ({
          ...prevState,
          identity_card: maskRG(value),
        }));
      }
    } else {
      setProfessionalData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  async function handleSubmitData() {
    if (professionalData) {
      try {
        setLoading(true);

        const { data } = await api.post("/api/professionals/create",
          { professionalData }
        );
        const { error, message } = data;

        if (message) {
          //toast.success(message);

          window.location.replace("/professionals");
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
      <Head title="Cadastrar profisisional" />
      <Navbar />
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-step">
              <div className="card-body">
                <Form onSubmit={handleSubmitData}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label htmlFor="name">
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
                            <label htmlFor="surname">
                              *Sobrenome
                            </label>
                            <input
                              type="text"
                              name="surname"
                              id="surname"
                              className="form-control step"
                              placeholder="Doe"
                              value={professionalData.surname}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group mb-4">
                            <label htmlFor="email">
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
                            <label htmlFor="telephone">
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
                        <div className="col-md-4">
                          <div className="form-group mb-4">
                            <label htmlFor="area_activity">
                              *Área de atuação
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
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label htmlFor="password">
                              *Senha
                            </label>
                            <input
                              type="password"
                              name="password"
                              id="password"
                              className="form-control step"
                              value={professionalData.password}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-4">
                            <label htmlFor="confirmPassword">
                              *Confirmar senha
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              className="form-control step"
                              value={professionalData.confirmPassword}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12 d-flex align-items-center justify-content-between">
                          <span className="text-muted">
                            * Campo de preenchimento obrigatorio
                          </span>
                          <button type="submit" className="btn btn-create">
                            {loading ? <Spinner type="grow" /> : "Criar profissional"}
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

export default ProfessionalCreate;
