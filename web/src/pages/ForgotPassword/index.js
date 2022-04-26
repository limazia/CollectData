import React from "react";

import { Head } from "~/components";

function ForgotPassword() {
  return (
    <>
      <Head title="Recuperar senha" />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Página de recuperação de senha</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;