import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "@rocketseat/unform";

import api from "~/services/api";
import useAuth from "~/hooks/useAuth";

import { Spinner } from "~/components";

function NameModal() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (name) {
      try {
        setLoading(true);

        const { data } = await api.put(`/api/me/update/name/${user.id}`, { name });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setName("");
          window.$("#nameModal").modal("hide");
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
      toast.error("Digite um nome para continuar!");
    }
  }

  window.$("#nameModal").on("hide.bs.modal", function (event) {
    setName("");
  });

  return (
    <div className="modal fade" id="nameModal" tabIndex="-1" role="dialog">
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
                  <h5 className="edit-option">Editar nome</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group mb-4">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    disabled={!name || name.length <= 5 ? true : false}
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

export default NameModal;
