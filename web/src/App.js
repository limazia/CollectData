import React from "react";

import GlobalStyle from "./styles/global";
import Routes from "./routes";
import { Toastify } from "./components";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Routes />
      <Toastify autoClose={5000} />
    </React.Fragment>
  );
}

export default App;
