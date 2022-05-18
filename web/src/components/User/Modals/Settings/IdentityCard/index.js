import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "@rocketseat/unform";

import api from "~/services/api";
import useAuth from "~/hooks/useAuth";

import { Spinner } from "~/components";
import { maskCPF, maskRG } from "~/utils/mask";

function IdentityCard() {
  const { user } = useAuth();

  const [identityType, setIdentityType] = useState("cpf");
  const [identityNumber, setIdentityNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const changeType = (value) => {
    setIdentityType(value);

    if (identityNumber) {
      setIdentityNumber("");
    }
  };

  const handleChange = ({ target: { value } }) => {
    if (identityType === "cpf") {
      setIdentityNumber(maskCPF(value));
    } else {
      setIdentityNumber(maskRG(value));
    }
  };

  async function handleSubmit() {
    if (identityNumber) {
      try {
        setLoading(true);

        const identity_type = identityType;
        const identity_card = identityNumber;

        const { data } = await api.put(`/api/me/update/identity_card/${user.id}`, { identity_type, identity_card });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setIdentityType("cpf");
          setIdentityNumber("");
          window.$("#identityModal").modal("hide");
        } else {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Digite um número de documento para continuar!");
    }
  }

  window.$("#identityModal").on("hide.bs.modal", function (event) {
    setIdentityType("cpf");
    setIdentityNumber("");
  });

  return (
    <div className="modal fade" id="identityModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content modal-settings">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12 text-center">
                  <h5 className="edit-option">Editar documento</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <select
                      className="form-control"
                      onChange={(e) => changeType(e.target.value)}
                      value={identityType}
                      defaultValue="cpf"
                    >
                      <option value="cpf" selected>CPF</option>
                      <option value="rg">RG</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      name="identity_card"
                      className="form-control"
                      placeholder={`Número do ${identityType.toUpperCase()}`}
                      value={identityNumber}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    disabled={
                      !identityNumber || identityNumber.length <= 4
                        ? true
                        : false
                    }
                    className="btn btn-modal-edit btn-block"
                  >
                    {loading ? <Spinner type="grow" /> : "Salvar"}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdentityCard;
