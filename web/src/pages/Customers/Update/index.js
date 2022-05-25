import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import WebRepository from "~/services/WebRepository";
import { maskCPF, maskRG, maskCNPJ, maskPhone, maskCEP } from "~/utils/mask";

import { Head, Navbar, Loading, Spinner } from "~/components";

function EditCustomer() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: "",
    surname: "",
    email: "",
    telephone: "",
    birth_date: "",
    identity_type: "cpf",
    identity_card: "",
  });
  const [customerAddress, setCustomerAddress] = useState({
    zipcode: "",
    address: "",
    district: "",
    complement: "",
    city: "",
    state: "",
  });
  const [medicalRecord, setMedicalRecord] = useState({
    pressure: "",
    diabetic: "",
    hemophiliac: "",
    healing: "",
    eplsepsis: "",
    fainting: "",
    allergy_medication: "",
    hepatitis: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const {
    name,
    surname,
    email,
    telephone,
    birth_date,
    identity_type,
    identity_card,
  } = customerData;

  const { zipcode, address, district, complement, city, state } =
    customerAddress;

  const {
    pressure,
    diabetic,
    hemophiliac,
    healing,
    eplsepsis,
    fainting,
    allergy_medication,
    hepatitis,
  } = medicalRecord;

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

  const handleOption = (e) => {
    const { name, value } = e.target;

    setMedicalRecord((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  return (
    <>
      <Head title={`Editando ${customer.name} ${customer.surname}`} />
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card card-step">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label htmlFor="name" className="text-muted">*Nome</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control step"
                            placeholder="John"
                            value={customer.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4">
                          <label htmlFor="surname" className="text-muted">*Sobrenome</label>
                          <input
                            type="text"
                            name="surname"
                            id="surname"
                            className="form-control step"
                            placeholder="Doe"
                            value={customer.surname}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group mb-4">
                          <label htmlFor="email" className="text-muted">*Email</label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control step"
                            placeholder="johndoe@exemple.com"
                            value={customer.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label htmlFor="telephone" className="text-muted">*Telefone</label>
                          <input
                            type="text"
                            name="telephone"
                            id="telephone"
                            className="form-control step"
                            placeholder="(00) 00000-0000"
                            value={customer.telephone}
                            onChange={handleChange}
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
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            className="form-control step"
                            placeholder="00/00/0000"
                            value={customer.birth_date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mb-4">
                          <label htmlFor="identity_card" className="text-muted">*Documento</label>
                          <input
                            type="text"
                            name="identity_card"
                            id="identity_card"
                            className="form-control step"
                            maxLength={
                              customer.identity_type === "cpf" ? 14 : 12
                            }
                            placeholder={
                              customer.identity_type === "cpf"
                                ? "000.000.000-00"
                                : "00.000.000-0"
                            }
                            value={customer.identity_card}
                            onChange={handleChange}
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
                            value={customer.identity_type}
                            onChange={handleChange}
                          >
                            <option value="cpf">CPF</option>
                            <option value="rg">RG</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 d-flex align-items-center justify-content-between">
                        <span className="text-muted">* Campo de preenchimento obrigatorio</span>
                        <button type="submit" className="btn btn-step finish">
                          {true ? <Spinner type="grow" /> : "Salvar"}
                        </button>
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
            <div className="card card-step">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group mb-4">
                          <label htmlFor="zipcode" className="text-muted">*CEP</label>
                          <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            maxLength={9}
                            className="form-control step"
                            placeholder="00000-00"
                            value={customer.zipcode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-group mb-4">
                          <label htmlFor="address" className="text-muted">*Endereço</label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            className="form-control step"
                            placeholder="Rua Oscar Freire"
                            value={customer.address}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="form-group mb-4">
                          <label htmlFor="district" className="text-muted">*Bairro</label>
                          <input
                            type="text"
                            name="district"
                            id="district"
                            className="form-control step"
                            placeholder="Jardins"
                            value={customer.district}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-4">
                          <label htmlFor="complement">Complemento</label>
                          <input
                            type="text"
                            name="complement"
                            id="complement"
                            className="form-control step"
                            placeholder="Apartamento 42"
                            value={customer.complement}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-7">
                        <div className="form-group mb-4">
                          <label htmlFor="city" className="text-muted">*Cidade</label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            className="form-control step"
                            placeholder="São Paulo"
                            value={customer.city}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mb-4 select-wrapper">
                          <label htmlFor="state" className="text-muted">*Estado</label>
                          <select
                            name="state"
                            id="state"
                            className="form-control step"
                            value={customer.state}
                            onChange={handleChange}
                          >
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12 d-flex align-items-center justify-content-between">
                        <span className="text-muted">* Campo de preenchimento obrigatorio</span>
                        <button type="submit" className="btn btn-step finish">
                          {true ? <Spinner type="grow" /> : "Salvar"}
                        </button>
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
            <div className="card card-step">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            name="pressure"
                            id="pressure"
                            className="form-check-input"
                            value={customer.pressure}
                            onChange={handleOption}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="pressure"
                          >
                            Pressão Normal
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            name="diabetic"
                            id="diabetic"
                            className="form-check-input"
                            value={customer.diabetic}
                            onChange={handleOption}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="diabetic"
                          >
                            Diábetico
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check mb-2">
                          <input
                            type="checkbox"
                            name="hemophiliac"
                            id="hemophiliac"
                            className="form-check-input"
                            value={customer.hemophiliac}
                            onChange={handleOption}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="hemophiliac"
                          >
                            Hemofílico
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            name="healing"
                            id="healing"
                            className="form-check-input"
                            value={customer.healing}
                            onChange={handleOption}
                          />
                          <label className="form-check-label" htmlFor="healing">
                            Cicatrização lenta
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            name="eplsepsis"
                            id="eplsepsis"
                            className="form-check-input"
                            value={customer.eplsepsis}
                            onChange={handleOption}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="eplsepsis"
                          >
                            Epilepsia
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check mb-4">
                          <input
                            type="checkbox"
                            name="fainting"
                            id="fainting"
                            className="form-check-input"
                            value={customer.fainting}
                            onChange={handleOption}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="fainting"
                          >
                            Desmaio
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-4 select-wrapper">
                          <label htmlFor="allergy_medication">
                            Alergia a medicamento?
                          </label>
                          <select
                            name="allergy_medication"
                            id="allergy_medication"
                            className="form-control step"
                            value={customer.allergy_medication}
                            onChange={handleChange}
                          >
                            <option>Qual medicamento?</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-4 select-wrapper">
                          <label htmlFor="hepatitis">Hepatite?</label>
                          <select
                            name="hepatitis"
                            id="hepatitis"
                            className="form-control step"
                            value={customer.hepatitis}
                            onChange={handleChange}
                          >
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
                </div>
                <div className="row mt-3">
                  <div className="col-md-12 d-flex align-items-center justify-content-between">
                    <span className="text-muted">* Campo de preenchimento obrigatorio</span>
                    <button type="submit" className="btn btn-step finish">
                      {true ? <Spinner type="grow" /> : "Salvar"}
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

export default EditCustomer;
