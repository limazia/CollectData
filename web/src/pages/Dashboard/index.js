import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "~/hooks/useAuth";

import { Head, Navbar, Loading } from "~/components";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user !== null) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(true);
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const goSchedule = () => navigate("/schedule");
  const goTattos = () => navigate("/tattos");
  const goCustomers = () => navigate("/customers");
  const goProfessionals = () => navigate("/professionals");

  return (
    <>
      <Head title="Dashboard" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card card-options">
              <div className="card-header">
                <h5>Opções do sistema</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-option btn-block mt-3"
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
                  className="btn btn-option btn-block mt-4"
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
                  className="btn btn-option btn-block mt-4"
                  onClick={goProfessionals}
                >
                  <div className="d-flex align-items-center">
                    <div className="icon-box">
                      <i className="far fa-chair-office"></i>
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
