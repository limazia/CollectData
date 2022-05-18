import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

import { Head, Navbar, Loading, DeleteCustomer } from "~/components";

import WebRepository from "~/services/WebRepository";

import { maskCPF, maskRG, maskCNPJ } from "~/utils/mask";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty.svg";

function Customers() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedConsumer, setSelectedConsumer] = useState([]);
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
    const data = await WebRepository.getCustomers(page, limite);

    if (data) {
      setCustomers(data);
    }
  }

  function paginationList() {
    let pageNumbers = [];
    for (let i = 1; i <= customers.pages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number) => {
      let classes =
        customers.page === number ? "page-item active" : "page-item";
      return (
        <li key={number} className={classes}>
          <button className="page-link" onClick={() => getCustomers(number)}>
            {number}
          </button>
        </li>
      );
    });
  }

  function firstPage() {
    const pageNumber = 1;
    getCustomers(pageNumber);
  }

  function lastPage() {
    const pageNumber = customers.pages;
    getCustomers(pageNumber);
  }

  function handleSelect(e) {
    const { value } = e.target;

    const permissionsToArray = value
        .split(",")
        .map((values) => values.trim());

    setSelectedConsumer(permissionsToArray);
  }

  const goCreate = () => navigate("/customer/create");
  const refreshCustomers = debounce((e) => {
    getCustomers();
  }, 1000);

  return (
    <>
      <Head title="Clientes" />
      <Navbar />
      <DeleteCustomer data={selectedConsumer || null} />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5 mb-5">
            <div className="card card-customers">
              <div className="card-body">
                {customers.results.length > 0 && (
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      className="btn btn-refresh mr-3"
                      onClick={refreshCustomers}
                    >
                      <i className="far fa-sync"></i>
                    </button>
                    <button
                      className="btn btn-create add-customer"
                      onClick={goCreate}
                    >
                      <i className="far fa-plus mr-1"></i> Novo cliente
                    </button>
                  </div>
                )}
                {customers.results.length > 0 ? (
                  <table className="table-customers">
                    <thead>
                      <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Documento</th>
                        <th>Data de cadastro</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.results.map((cm) => (
                        <tr key={cm.id}>
                          <td>
                            <Link
                              className="link-profile"
                              to={`/customer/${cm.id}`}
                            >
                              {cm.name} {cm.surname}
                            </Link>
                            <br />
                            <span>{cm.email}</span>
                          </td>
                          <td>{cm.telephone ? cm.telephone : <>&mdash;</>}</td>
                          <td>
                            <span
                              data-toggle="tooltip"
                              data-placement="top"
                              title={cm.identity_type?.toUpperCase()}
                            >
                              {cm.identity_card ? (
                                <>
                                  {cm.identity_type === "cpf" &&
                                    maskCPF(cm.identity_card)}
                                  {cm.identity_type === "rg" &&
                                    maskRG(cm.identity_card)}
                                  {cm.identity_type === "cnpj" &&
                                    maskCNPJ(cm.identity_card)}
                                </>
                              ) : (
                                <>&mdash;</>
                              )}
                            </span>
                          </td>
                          <td>{cm.createdAt}</td>
                          <td>
                            <div className="dropdown">
                              <i
                                className="far fa-ellipsis-v mr-3"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></i>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <Link
                                  className="dropdown-item"
                                  to={`/tatto/create/${cm.id}`}
                                >
                                  <i className="fas fa-kiwi-bird mr-2 "></i>
                                  Adicionar tatuagem
                                </Link>
                                <Link
                                  className="dropdown-item"
                                  to={`/customer/edit/${cm.id}`}
                                >
                                  <i className="fas fa-pencil-alt mr-2"></i>
                                  Editar
                                </Link>
                                <button
                                  className="dropdown-item"
                                  data-toggle="modal"
                                  data-target="#deleteCostumer"
                                  value={[cm.id, `${cm.name} ${cm.surname}`]}
                                  onClick={(e) => handleSelect(e, "value")}
                                >
                                  <i className="fas fa-trash-alt mr-2"></i>
                                  Remover
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                {customers.results.length > 0 && (
                  <div className="mt-5">
                    <nav>
                      <ul className="pagination justify-content-end">
                        <li className="page-item">
                          <button
                            className="page-link"
                            disabled={customers.page === 1}
                            onClick={firstPage}
                          >
                            <span>&laquo;</span>
                            <span className="sr-only">Anterior</span>
                          </button>
                        </li>
                        {paginationList()}
                        <li className="page-item">
                          <button
                            className="page-link"
                            disabled={customers.page === customers.pages}
                            onClick={lastPage}
                          >
                            <span>&raquo;</span>
                            <span className="sr-only">Próximo</span>
                          </button>
                        </li>
                      </ul>
                    </nav>
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
