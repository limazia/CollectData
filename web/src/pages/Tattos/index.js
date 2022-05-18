import React from "react";
import { Link } from "react-router-dom";

import { Head, Navbar } from "~/components";

function Customers() {
  const image =
    "https://i.pinimg.com/736x/08/2a/47/082a47db370200a54b7bf632879f8c13.jpg";

  return (
    <>
      <Head title="Galeria de tatuagens" />
      <Navbar />
      <div className="container mt-5 pb-5">
        <div className="row">
          <div className="col-md-4 mt-sm-4">
            <div className="card card-gallery-tatto">
              <div>
                <span className="badge-remove">
                  <i className="fas fa-trash-alt"></i>
                </span>
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/736x/08/2a/47/082a47db370200a54b7bf632879f8c13.jpg"
                  alt
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Flor simples</h5>
                <p className="card-text text-muted">
                  <i className="far fa-chair-office mr-1"></i>{" "}
                  <Link to="#">Acácio de Lima</Link>
                  <br />
                  <i className="far fa-user mr-1"></i>{" "}
                  <Link to="#">Clara Souza</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-sm-4">
            <div className="card card-gallery-tatto">
              <div>
                <span className="badge-remove">
                  <i className="fas fa-trash-alt"></i>
                </span>
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/originals/45/bf/70/45bf70f0cfcb5ca9cb1d55fc9b4a73c5.jpg"
                  alt
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Flor simples</h5>
                <p className="card-text text-muted">
                  <i className="far fa-chair-office mr-1"></i>{" "}
                  <Link to="#">Acácio de Lima</Link>
                  <br />
                  <i className="far fa-user mr-1"></i>{" "}
                  <Link to="#">Clara Souza</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-sm-4">
            <div className="card card-gallery-tatto">
              <div>
                <span className="badge-remove">
                  <i className="fas fa-trash-alt"></i>
                </span>
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/originals/f7/83/c5/f783c5f028eb5d2daa29a47aa45cb72b.jpg"
                  alt
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Flor simples</h5>
                <p className="card-text text-muted">
                  <i className="far fa-chair-office mr-1"></i>{" "}
                  <Link to="#">Acácio de Lima</Link>
                  <br />
                  <i className="far fa-user mr-1"></i>{" "}
                  <Link to="#">Clara Souza</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-sm-4">
            <div className="card card-gallery-tatto">
              <div>
                <span className="badge-remove">
                  <i className="fas fa-trash-alt"></i>
                </span>
                <img
                  className="card-img-top"
                  src="https://img.freepik.com/vetores-gratis/espada-com-rosas-desenho-de-tatuagem-mao-ilustracoes-desenhadas-isolado-no-fundo-branco_183342-9.jpg"
                  alt
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Flor simples</h5>
                <p className="card-text text-muted">
                  <i className="far fa-chair-office mr-1"></i>{" "}
                  <Link to="#">Acácio de Lima</Link>
                  <br />
                  <i className="far fa-user mr-1"></i>{" "}
                  <Link to="#">Clara Souza</Link>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-sm-4">
            <div className="card card-gallery-tatto">
              <div>
                <span className="badge-remove">
                  <i className="fas fa-trash-alt"></i>
                </span>
                <img
                  className="card-img-top"
                  src="https://i.pinimg.com/564x/d5/b5/4f/d5b54f3422bc0fd00f9a61ff7627ac53.jpg"
                  alt
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">Flor simples</h5>
                <p className="card-text text-muted">
                  <i className="far fa-chair-office mr-1"></i>{" "}
                  <Link to="#">Acácio de Lima</Link>
                  <br />
                  <i className="far fa-user mr-1"></i>{" "}
                  <Link to="#">Clara Souza</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Customers;
