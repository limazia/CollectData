import React from "react";

import Routes from "./routes";
import GlobalStyle from "./styles/global";
import { Toastify } from "./components";

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
      <Toastify autoClose={5000} />
    </>
  );
}

export default App;
