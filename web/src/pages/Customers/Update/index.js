import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from "@rocketseat/unform";
import { toast } from "react-toastify";

import WebRepository from "~/services/WebRepository";
import api from "~/services/api";
import ibge from "~/services/ibge";
import { maskCPF, maskRG, maskPhone, maskCEP, maskDate } from "~/utils/mask";

import { Head, Navbar, Loading, Spinner } from "~/components";

function CustomerUpdate() {
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
    city: "0",
    state: "0",
  });
  const [medicalRecord, setMedicalRecord] = useState({
    pressure: false,
    diabetic: false,
    hemophiliac: false,
    healing: false,
    eplsepsis: false,
    fainting: false,
    allergy_medication: "",
    hepatitis: "",
  });

  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const { identity_type, identity_card } = customerData;

  const { zipcode, address, district, city, state } =customerAddress;

  useEffect(() => {
    getCustomer(customerId);
    setCustomerData({
      name: customer.name,
      surname: customer.surname,
      email: customer.email,
      telephone: customer.telephone,
      birth_date: customer.birth_date,
      identity_type: customer.identity_type,
      identity_card: customer.identity_card,
    });

    setCustomerAddress({
      zipcode: customer.zipcode,
      address: customer.address,
      district: customer.district,
      complement: customer.complement,
      city: customer.city,
      state: customer.state,
    });

    setMedicalRecord({
      pressure: customer.pressure,
      diabetic: customer.diabetic,
      hemophiliac: customer.hemophiliac,
      healing: customer.healing,
      eplsepsis: customer.eplsepsis,
      fainting: customer.fainting,
      allergy_medication: customer.allergy_medication,
      hepatitis: customer.hepatitis,
    });

    setTimeout(() => {
      setPageLoading(false);
    }, 2000);
  }, [pageLoading]);

  // Load UFs
  useEffect(() => {
    async function loadUfs() {
      const response = await ibge.get("localidades/estados?orderBy=nome");

      const ufInitials = response.data.map((uf) => {
        return {
          sigla: uf.sigla,
          nome: uf.nome,
        };
      });

      setUfs(ufInitials);
    }

    loadUfs();
  }, []);

  // Load Cities
  useEffect(() => {
    async function loadCities() {
      if (state === "0") return;

      const response = await ibge.get(
        `localidades/estados/${state}/municipios`
      );

      const cityNames = response.data.map((city) => {
        return { nome: city.nome };
      });

      setCities(cityNames);
    }

    loadCities();
  }, [state]);

  if (pageLoading) {
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

  const handleData = (e) => {
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

  const handleAddress = (e) => {
    const { name, value } = e.target;

    if (name === "zipcode") {
      setCustomerAddress((prevState) => ({
        ...prevState,
        zipcode: maskCEP(value),
      }));
    } else {
      setCustomerAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMedical = (e) => {
    const { name, value } = e.target;

    setMedicalRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOption = (e) => {
    const { name, checked } = e.target;

    setMedicalRecord((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  async function handleSubmitData() {
    if (customerData) {
      try {
        setLoading(true);

        const { data } = await api.put(
          `/api/customers/customerData/${customerId}`,
          { customerData }
        );
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

  async function handleSubmitAddrress() {
    if (zipcode && address && district && city && state) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/customers/customerAddress/${customerId}`, { customerAddress });
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

  async function handleSubmitMedical() {
    try {
      setLoading(true);

      const { data } = await api.put(`/api/customers/medicalRecord/${customerId}`, { medicalRecord });
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
  }

  return (
    <>
      <Head title={`Editando ${customer.name} ${customer.surname}`} />
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card card-step">
              <div className="card-body">
                <Form onSubmit={handleSubmitData}>
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
                              value={customerData.name}
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
                              value={customer.surname}
                              onChange={handleData}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
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
                              value={customerData.email}
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
                              value={maskPhone(customerData.telephone || "")}
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
                              value={maskDate(customerData.birth_date || "")}
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
                                customerData.identity_type === "cpf" ? 14 : 12
                              }
                              placeholder={
                                customerData.identity_type === "cpf"
                                  ? "000.000.000-00"
                                  : "00.000.000-0"
                              }
                              value={
                                customerData.identity_type === "cpf"
                                  ? maskCPF(customerData.identity_card || "")
                                  : maskRG(customerData.identity_card || "")
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
                              value={customerData.identity_type}
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
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card card-step">
              <div className="card-body">
                <Form onSubmit={handleSubmitAddrress}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group mb-4">
                            <label htmlFor="zipcode" className="text-muted">
                              *CEP
                            </label>
                            <input
                              type="text"
                              name="zipcode"
                              id="zipcode"
                              maxLength={9}
                              className="form-control step"
                              placeholder="00000-00"
                              value={maskCEP(customerAddress.zipcode || "")}
                              onChange={handleAddress}
                            />
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group mb-4">
                            <label htmlFor="address" className="text-muted">
                              *Endereço
                            </label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              className="form-control step"
                              placeholder="Rua Oscar Freire"
                              value={customerAddress.address}
                              onChange={handleAddress}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="form-group mb-4">
                            <label htmlFor="district" className="text-muted">
                              *Bairro
                            </label>
                            <input
                              type="text"
                              name="district"
                              id="district"
                              className="form-control step"
                              placeholder="Jardins"
                              value={customerAddress.district}
                              onChange={handleAddress}
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
                              value={customerAddress.complement}
                              onChange={handleAddress}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-7">
                          <div className="form-group mb-4">
                            <label htmlFor="city">*Cidade</label>
                            <select
                              name="city"
                              id="city"
                              className="form-control step"
                              onChange={handleAddress}
                            >
                              <option value="0">Selecione uma cidade</option>
                              {cities.map((city) => (
                                <option
                                  key={city.nome}
                                  value={city.nome}
                                  selected={
                                    city.nome === customerAddress.city
                                      ? true
                                      : false
                                  }
                                >
                                  {city.nome}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="form-group mb-4 select-wrapper">
                            <label htmlFor="state">*Estado</label>
                            <select
                              name="state"
                              id="state"
                              className="form-control step"
                              onChange={handleAddress}
                            >
                              <option value="0">Selecione uma estado</option>
                              {ufs?.map((uf) => (
                                <option
                                  key={uf.nome}
                                  value={uf.sigla}
                                  selected={
                                    uf.sigla === customerAddress.state
                                      ? true
                                      : false
                                  }
                                >
                                  {uf.sigla}
                                </option>
                              ))}
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
        <div className="row mt-5">
          <div className="col-md-12 mb-5">
            <div className="card card-step">
              <div className="card-body">
                <Form onSubmit={handleSubmitMedical}>
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
                              checked={medicalRecord.pressure}
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
                              checked={medicalRecord.diabetic}
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
                              checked={medicalRecord.hemophiliac}
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
                              checked={medicalRecord.healing}
                              onChange={handleOption}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="healing"
                            >
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
                              checked={medicalRecord.eplsepsis}
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
                              checked={medicalRecord.fainting}
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
                              value={medicalRecord.allergy_medication}
                              onChange={handleMedical}
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
                              value={medicalRecord.hepatitis}
                              onChange={handleMedical}
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
                      <span className="text-muted">
                        * Campo de preenchimento obrigatorio
                      </span>
                      <button type="submit" className="btn btn-step finish">
                        {loading ? <Spinner type="grow" /> : "Salvar"}
                      </button>
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

export default CustomerUpdate;
