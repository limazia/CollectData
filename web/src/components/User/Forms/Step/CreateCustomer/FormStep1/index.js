import React from "react";
import { toast } from "react-toastify";

import useForm from "~/hooks/useForm";

import { maskCPF, maskRG, maskPhone, maskDate } from "~/utils/mask";

function FormStep1() {
  const { customerData, setCustomerData, setCurrentStep } = useForm();
  const {
    name,
    surname,
    email,
    telephone,
    birth_date,
    identity_type,
    identity_card,
  } = customerData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telephone") {
      setCustomerData((prevState) => ({
        ...prevState,
        telephone: maskPhone(value),
      }));
    } else if (name === "identity_type") {
      setCustomerData((prevState) => ({
        ...prevState,
        identity_type: value,
      }));

      if (identity_card) {
        setCustomerData((prevState) => ({
          ...prevState,
          identity_card: "",
        }));
      }
    } else if (name === "birth_date") {
      setCustomerData((prevState) => ({
        ...prevState,
        birth_date: maskDate(value),
      }));
    } else if (name === "identity_card") {
      if (identity_type === "cpf") {
        setCustomerData((prevState) => ({
          ...prevState,
          identity_card: maskCPF(value),
        }));
      } else {
        setCustomerData((prevState) => ({
          ...prevState,
          identity_card: maskRG(value),
        }));
      }
    } else {
      setCustomerData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNextStep = () => {
    //if (name && surname && email && telephone && birth_date && identity_type && identity_card) {
    if (name) {
      setCurrentStep(1);
    } else {
      toast.error("Preencha todos os campos.");
    }
  };

  return (
    <div className="card card-step">
      <div className="card-body">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <label htmlFor="name">*Nome</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control step"
                    placeholder="John"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-4">
                  <label htmlFor="surname">*Sobrenome</label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    className="form-control step"
                    placeholder="Doe"
                    value={surname}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group mb-4">
                  <label htmlFor="email">*Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control step"
                    placeholder="johndoe@exemple.com"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-4">
                  <label htmlFor="telephone">*Telefone</label>
                  <input
                    type="text"
                    name="telephone"
                    id="telephone"
                    className="form-control step"
                    placeholder="(00) 00000-0000"
                    value={telephone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="form-group mb-4">
                  <label htmlFor="birth_date">*Data de aniversário</label>
                  <input
                    type="text"
                    name="birth_date"
                    id="birth_date"
                    className="form-control step"
                    placeholder="00/00/0000"
                    maxLength={10}
                    value={birth_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-4">
                  <label htmlFor="identity_card">*Documento</label>
                  <input
                    type="text"
                    name="identity_card"
                    id="identity_card"
                    className="form-control step"
                    maxLength={identity_type === "cpf" ? 14 : 12}
                    placeholder={
                      identity_type === "cpf"
                        ? "000.000.000-00"
                        : "00.000.000-0"
                    }
                    value={identity_card}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-4 select-wrapper">
                  <label htmlFor="identity_type">*Tipo de documento</label>
                  <select
                    name="identity_type"
                    id="identity_type"
                    className="form-control step"
                    value={identity_type}
                    onChange={handleChange}
                  >
                    <option value="cpf">CPF</option>
                    <option value="rg">RG</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 step-options">
            <span>* Campo de preenchimento obrigatorio</span>
            <button className="btn btn-step" onClick={handleNextStep}>
              Próxima Etapa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormStep1;
