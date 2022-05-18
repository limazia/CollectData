import React from "react";
import { Form } from "@rocketseat/unform";

import useForm from "~/hooks/useForm";

import { Spinner } from "~/components";

function FormStep3() {
  const {
    handleSubmit,
    medicalRecord,
    setMedicalRecord,
    setCurrentStep,
    loading,
  } = useForm();

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

  const handleOption = (e) => {
    const { name, value } = e.target;

    setMedicalRecord((prevState) => ({
      ...prevState,
      [name]: !value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMedicalRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };
 
  return (
    <div className="card card-step">
      <div className="card-body">
        <Form onSubmit={handleSubmit}>
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
                      value={pressure}
                      onChange={handleOption}
                    />
                    <label className="form-check-label" htmlFor="pressure">
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
                      value={diabetic}
                      onChange={handleOption}
                    />
                    <label className="form-check-label" htmlFor="diabetic">
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
                      value={hemophiliac}
                      onChange={handleOption}
                    />
                    <label className="form-check-label" htmlFor="hemophiliac">
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
                      value={healing}
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
                      value={eplsepsis}
                      onChange={handleOption}
                    />
                    <label className="form-check-label" htmlFor="eplsepsis">
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
                      value={fainting}
                      onChange={handleOption}
                    />
                    <label className="form-check-label" htmlFor="fainting">
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
                      value={allergy_medication}
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
                      value={hepatitis}
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
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label className="invisible"> </label>
                    <input type="text" className="form-control invisible" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4">
                    <label className="invisible"> </label>
                    <input type="text" className="form-control invisible" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12 step-options">
              <div />
              <div>
                <button className="btn btn-link" onClick={handlePreviousStep}>
                  Etapa Anterior
                </button>
                <button type="submit" className="btn btn-step finish">
                  {loading ? <Spinner type="grow" /> : "Finalizar"}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default FormStep3;
