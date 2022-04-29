import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Head, Navbar, Loading } from "~/components";

function Dashboard() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const goSchedule = () => navigate("/schedule");
  const goCustomers = () => navigate("/customers");
  const goCompanySetting = () => navigate("/setting/company");

  return (
    <>
      <Navbar />
      <Head title="Dashboard" />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-options">
              <div className="card-header">
                <h5>Opções do sistema</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-tatto-options btn-block mt-3"
                  onClick={goSchedule}
                >
                  <div className="d-flex align-items-center">
                    <div className="icon-box">
                      <i className="far fa-calendar-alt"></i>
                    </div>
                    Agenda
                  </div>
                  <i className="fas fa-angle-right"></i>
                </button>
                <button
                  className="btn btn-tatto-options btn-block mt-4"
                  onClick={goCustomers}
                >
                  <div className="d-flex align-items-center">
                    <div className="icon-box">
                      <i className="far fa-users"></i>
                    </div>
                    Clientes
                  </div>
                  <i className="fas fa-angle-right"></i>
                </button>
                <button
                  className="btn btn-tatto-options btn-block mt-4"
                  onClick={goCompanySetting}
                >
                  <div className="d-flex align-items-center">
                    <div className="icon-box">
                      <i className="fad fa-user-nurse"></i>
                    </div>
                    Profissionais
                  </div>
                  <i className="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
