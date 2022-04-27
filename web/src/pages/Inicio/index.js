import React from "react";
import { useNavigate } from "react-router-dom";

import { Head } from "~/components";

import "./styles.css";

function Inicio() {
  const navigate = useNavigate();

  const goAgenda = () => navigate("/agenda");
  const logout = () => navigate("/");

  return (
    <>
      <Head title="Inicio" />
      <div>
        <h1> Menu Inicial </h1>
        <div>
          <button className="bt" onClick={goAgenda}>
            Agenda
          </button>
        </div>
        <p></p>
        <div>
          <button className="bt" type="button">
            Cliente
          </button>
        </div>
        <p></p>
        <div>
          <button className="bt" type="button">
            Profissional
          </button>
        </div>
        <p></p>
        <div>
          <button className="bt" type="button">
            Formulario | Contrato
          </button>
        </div>
        <p></p>
        <div>
          <button className="desconectar" onClick={logout}>
            Desconectar
          </button>
        </div>
      </div>
    </>
  );
}

export default Inicio;
