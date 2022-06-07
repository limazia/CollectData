import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useForm from "~/hooks/useForm";
import ibge from "~/services/ibge";

import { maskCEP } from "~/utils/mask";

function FormStep2() {
  const { customerAddress, setCustomerAddress, setCurrentStep } = useForm();
  const { zipcode, address, district, complement, state } = customerAddress;

  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

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

  const handleChange = (e) => {
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

  const handlePreviousStep = () => {
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    //if (zipcode && address && district && complement && city) {
    if (zipcode) {
      setCurrentStep(2);
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
              <div className="col-md-3">
                <div className="form-group mb-4">
                  <label htmlFor="zipcode">*CEP</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    maxLength={9}
                    className="form-control step"
                    placeholder="00000-00"
                    value={zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="form-group mb-4">
                  <label htmlFor="address">*Endereço</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="form-control step"
                    placeholder="Rua Oscar Freire"
                    value={address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="form-group mb-4">
                  <label htmlFor="district">*Bairro</label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    className="form-control step"
                    placeholder="Jardins"
                    value={district}
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
                    value={complement}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-7">
                <div className="form-group mb-4 select-wrapper">
                  <label htmlFor="city">*Cidade</label>
                  <select
                    name="city"
                    id="city"
                    className="form-control step"
                    onChange={handleChange}
                  >
                    <option value="0">Selecione uma cidade</option>
                    {cities.map((city) => (
                      <option key={city.nome} value={city.nome}>
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
                    onChange={handleChange}
                  >
                    <option value="0">Selecione uma estado</option>
                    {ufs?.map((uf) => (
                      <option key={uf.nome} value={uf.sigla}>
                        {uf.sigla}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 step-options">
            <span>* Campo de preenchimento obrigatorio</span>
            <div>
              <button className="btn btn-link" onClick={handlePreviousStep}>
                Etapa Anterior
              </button>
              <button className="btn btn-step" onClick={handleNextStep}>
                Próxima Etapa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormStep2;
