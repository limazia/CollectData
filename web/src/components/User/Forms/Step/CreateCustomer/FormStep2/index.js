import React from "react";
import { toast } from "react-toastify";

import useForm from "~/hooks/useForm";

import { maskCEP } from "~/utils/mask";

function FormStep2() {
  const { customerAddress, setCustomerAddress, setCurrentStep } = useForm();
  const { zipcode, address, district, complement, city, state } = customerAddress;

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
                <div className="form-group mb-4">
                  <label htmlFor="city">*Cidade</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control step"
                    placeholder="São Paulo"
                    value={city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-4 select-wrapper">
                  <label htmlFor="state">*Estado</label>
                  <select
                    name="state"
                    id="state"
                    className="form-control step"
                    value={state}
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
