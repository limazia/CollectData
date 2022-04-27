import React from "react";
import { useNavigate } from "react-router-dom";

import { Head } from "~/components";

import "./styles.css";

function Agenda() {
  const navigate = useNavigate();

  const goVolta = () => navigate(-1);

  return (
    <>
      <Head title="Agenda" />
      <div>
        <h1>Agenda</h1>
        <div>
          <label for="data">Data:</label>
          <input type="date" id="data" name="data" />
        </div>
        <div>
          <label for="hora">Hora:</label>
          <input type="time" id="hora" name="hora" />
        </div>
        <div>
          <button class="voltar" onClick={goVolta}>
            Voltar
          </button>
        </div>
      </div>
    </>
  );
}

export default Agenda;
