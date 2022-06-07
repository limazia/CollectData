import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Head, Navbar, Loading, TableProfessionals } from "~/components";

import WebRepository from "~/services/WebRepository";

import { ReactComponent as EmptyBackground } from "~/assets/images/empty3.svg";

function Professionals() {
  const navigate = useNavigate();

  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfessionals();

    window.addEventListener("refresh-professionals", () => {
      getProfessionals();
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  async function getProfessionals() {
    const { results } = await WebRepository.getProfessionals();

    if (results) {
      setProfessionals(results);
    }
  }

  const goCreate = () => navigate("/professional/create");

  const columns = [
    {
      Header: "Profissional",
      accessor: "name",
    },
    {
      Header: "Área de atuação",
      accessor: "area_activity",
    },
    {
      Header: "Data de cadastro",
      accessor: "createdAt",
    },
  ];

  return (
    <>
      <Head title="Profissionais" />
      <Navbar />
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-professionals">
              <div className="card-body">
                {professionals.length > 0 ? (
                  <TableProfessionals columns={columns} data={professionals} />
                ) : (
                  <div className="col-sm-12 empty-tatto text-center">
                    <div className="empty-tatto-image pb-3">
                      <EmptyBackground className="img-fluid" />
                    </div>
                    <span className="empty-tatto-title">
                      Nenhum profissional foi encontrado
                    </span>
                    <small className="empty-tatto-description mt-3 pb-4">
                      Começe cadastrando agora mesmo
                    </small>
                    <button className="btn btn-create" onClick={goCreate}>
                      <i className="far fa-plus mr-1"></i> Cadastrar
                      profissional
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

export default Professionals;