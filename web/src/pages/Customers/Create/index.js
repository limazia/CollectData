import React from "react";

import useForm from "~/hooks/useForm";

import { Head, Navbar, CreateCustomer1, CreateCustomer2, CreateCustomer3 } from "~/components";

function CustomerCreate() {
  const { currentStep } = useForm();

  function renderForm(currentStep) {
    switch (currentStep) {
      case 0:
        return <CreateCustomer1 />;
      case 1:
        return <CreateCustomer2 />;
      case 2:
        return <CreateCustomer3 />;
      default:
        return <CreateCustomer1 />;
    }
  }

  return (
    <>
      <Head title="Novo cliente" />
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-12">
            <ul className="list-group list-group-horizontal list-step">
              <div className="col-md-4">
                <li className={`list-group-item ${currentStep === 0 && "active"}`}>
                  1. Dados do cliente
                </li>
              </div>
              <div className="col-md-4">
                <li className={`list-group-item ${currentStep === 1 && "active"}`}>
                  2. Endereço
                </li>
              </div>
              <div className="col-md-4">
                <li className={`list-group-item ${currentStep === 2 && "active"}`}>
                  3. Ficha médica
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12 mb-5">{renderForm(currentStep)}</div>
        </div>
      </div>
    </>
  );
}

export default CustomerCreate;
