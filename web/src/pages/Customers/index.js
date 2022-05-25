import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Head, Navbar, Loading, TableCustomers } from "~/components";

import WebRepository from "~/services/WebRepository";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty.svg";

function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomers();

    window.addEventListener("refresh-customers", () => {
      getCustomers();
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  async function getCustomers(page = 1, limite = 10) {
    const { results } = await WebRepository.getCustomers(page, limite);

    if (results) {
      setCustomers(results);
    }
  }

  const goCreate = () => navigate("/customer/create");

  const columns = [
    {
      Header: "Cliente",
      accessor: "name",
    },
    {
      Header: "Documento",
      accessor: "identity_card",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Clientes" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <div className="card card-customers">
              <div className="card-body">
                {customers.length > 0 ? (
                  <TableCustomers columns={columns} data={customers} />
                ) : (
                  <div className="col-sm-12 empty-tatto text-center">
                    <div className="empty-tatto-image pb-3">
                      <EmptyBackground className="img-fluid" />
                    </div>
                    <span className="empty-tatto-title">
                      Nenhum cliente foi encontrado
                    </span>
                    <small className="empty-tatto-description mt-3 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button className="btn btn-create" onClick={goCreate}>
                      <i className="far fa-plus mr-1"></i> Cadastrar cliente
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
