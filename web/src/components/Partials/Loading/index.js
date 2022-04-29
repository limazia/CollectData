import React from "react";

import { ReactComponent as LogoIcon } from "~/assets/images/logo-icon.svg";

function Loading({ logo = true }) {
  return (
    <div className="container-fluid container-loading">
      <div className="row h-100 justify-content-center align-items-center box-loading">
        {logo ? (
          <LogoIcon className="img-fluid" />
        ): (
          <h1>{process.env.REACT_APP_NAME || "Carregando..."}</h1>
        )}
      </div>
    </div>
  );
}

export default Loading;