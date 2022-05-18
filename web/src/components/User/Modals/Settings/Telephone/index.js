import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "@rocketseat/unform";

import api from "~/services/api";
import useAuth from "~/hooks/useAuth";

import { Spinner } from "~/components";
import { maskPhone } from "~/utils/mask";

function TelephoneModal() {
  const { user } = useAuth();

  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { value } }) => {
    setTelephone(maskPhone(value));
  };

  async function handleSubmit() {
    if (telephone) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/me/update/telephone/${user.id}`, { telephone });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setTelephone("");
          window.$("#telephoneModal").modal("hide");
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
      toast.error("Digite um telefone para continuar!");
    }
  }

  window.$("#telephoneModal").on("hide.bs.modal", function (event) {
    setTelephone("");
  });

  return (
    <div className="modal fade" id="telephoneModal" tabIndex="-1" role="dialog">
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
                  <h5 className="edit-option">Editar telefone</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      name="telephone"
                      className="form-control"
                      placeholder="Telefone"
                      value={telephone}
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
                      !telephone ||
                      telephone.length <= 5
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

export default TelephoneModal;